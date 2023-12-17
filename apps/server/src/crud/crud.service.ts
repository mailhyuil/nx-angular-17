import { Injectable } from '@nestjs/common';
import { CrudTypeMap } from './crud.type';
import { Delegate } from './delegate';

@Injectable()
export abstract class CrudService<D extends Delegate, T extends CrudTypeMap> {
  constructor(protected delegate: D) {}

  public getDelegate(): D {
    return this.delegate;
  }

  public async aggregate(data: T['aggregate']) {
    const result = await this.delegate.aggregate(data);
    return result;
  }

  public async count(data: T['count']) {
    const result = await this.delegate.count(data);
    return result;
  }

  public async findAll(data: T['findMany']) {
    const result = await this.delegate.findMany(data);
    return result;
  }

  public async findById(data: T['findUnique']) {
    const result = await this.delegate.findUnique(data);
    return result;
  }

  public async create(data: T['create']) {
    const result = await this.delegate.create(data);
    return result;
  }

  public async update(data: T['update']) {
    const result = await this.delegate.update(data);
    return result;
  }

  public async delete(data: T['delete']) {
    const result = await this.delegate.delete(data);
    return result;
  }
}
