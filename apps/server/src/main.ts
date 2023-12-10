import {
  BadRequestException,
  Logger,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import { writeFile } from 'fs';
import helmet from 'helmet';
import $RefParser from 'json-schema-ref-parser';
import morgan from 'morgan';
import { NgOpenApiGen } from 'ng-openapi-gen';
import { join } from 'path';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(cookieParser());
  app.use(compression());
  app.use(helmet());
  app.use(morgan('dev'));
  app.enableCors();
  app.useStaticAssets(join(__dirname, './public'));

  /** Global Prefix */
  app.setGlobalPrefix('api/v1');
  /** Global Interceptors */
  // app.useGlobalInterceptors(new EtagInterceptor());
  /** Global Validation Pipe */
  app.useGlobalPipes(
    new ValidationPipe({
      transformOptions: { enableImplicitConversion: true },
      transform: true,
      whitelist: true,
      enableDebugMessages: true,
      exceptionFactory: (errors: ValidationError[]) => {
        if (errors?.length > 0) {
          const children = errors[0].children;

          if (children?.length > 0) {
            const error = children[0].constraints;
            const keys = Object.keys(error);
            const type = keys[keys.length - 1];
            const message = error[type];
            return new BadRequestException(message);
          }

          const error = errors[0].constraints;
          const keys = Object.keys(error);
          const type = keys[keys.length - 1];
          const message = error[type];
          return new BadRequestException(message);
        }
      },
    })
  );
  /** Port */
  const port = process.env.SERVER_PORT || 3000;

  /** OpenAPI */
  const swaggerConfig = new DocumentBuilder()
    .setTitle('API')
    .addServer(`http://localhost:${port}`)
    .addCookieAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/v1/document', app, document);

  const openApiPath = join(__dirname, './assets/openapi.json');
  writeFile(openApiPath, JSON.stringify(document), () => {
    Logger.log(`✅ openapi.json 파일을 생성했습니다.`);
  });

  const openApiOptions = {
    input: openApiPath,
    output: 'api/src/lib',
    indexFile: true,
  };

  const RefParser = new $RefParser.default();
  const openApi = await RefParser.bundle(openApiOptions.input, {
    dereference: { circular: false },
  });

  const ngOpenGen = new NgOpenApiGen(openApi, openApiOptions);
  ngOpenGen.generate();

  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}`);
}

bootstrap();
