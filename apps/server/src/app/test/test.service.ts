import { Injectable } from '@nestjs/common';

export interface ICrudService<T = any> {
  get(id: number): Promise<T>;
  list(): Promise<T[]>;
  create(data: T): Promise<T>;
  update(id: number, data: T): Promise<T>;
  delete(id: number): Promise<T>;
}

@Injectable()
export class TestService implements ICrudService<any> {
  get(id: number): Promise<any> {
    return new Promise((res) => res(''));
  }
  list(): Promise<any[]> {
    return new Promise((res) => res(['']));
  }
  create(data: any): Promise<any> {
    return new Promise((res) => res(''));
  }
  update(id: number, data: any): Promise<any> {
    return new Promise((res) => res(''));
  }
  delete(id: number): Promise<any> {
    return new Promise((res) => res(''));
  }
}
