import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  constructor() {}
  upload(formData: FormData) {
    return 'some url';
  }
}
