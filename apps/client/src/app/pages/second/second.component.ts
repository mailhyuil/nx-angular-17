import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import FileUploadComponent from '../../components/file-upload/file-upload.component';

@Component({
  selector: 'app-second',
  templateUrl: './second.component.html',
  styleUrls: ['./second.component.scss'],
  standalone: true,
  imports: [
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadComponent,
  ],
})
export default class SecondComponent {
  formGroup = new FormGroup({
    file: new FormControl<string>('', [Validators.required]),
  });
  @ViewChild(FileUploadComponent) fileUploadComponent!: FileUploadComponent;
  constructor(private readonly httpClient: HttpClient) {}

  submit() {
    this.fileUploadComponent.upload();
    const body = this.formGroup.value;
    console.log(body);
    this.httpClient.post('http://localhost:3000/api/v1/file', body).subscribe({
      next: (value) => {
        console.log(value);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
