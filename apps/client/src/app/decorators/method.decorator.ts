import AppComponent from '../app.component';

export function MethodDecorator() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;
    const httpClient = AppComponent.getHttpClient();
    descriptor.value = function (...args: any[]) {
      // this는 클래스의 인스턴스를 가리킨다. ex) 사용 예 this.httpService
      if (httpClient) {
        console.log('httpClient', httpClient);
        httpClient.get('http://localhost:3000/api/v1').subscribe();
      }
      const result = originalMethod.apply(this, args);
      return result;
    };
    return descriptor;
  };
}
