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
import { SegmentOptionComponent } from '../../components/segment/segment-option/segment-option.component';
import { SegmentComponent } from '../../components/segment/segment.component';

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
    SegmentComponent,
    SegmentOptionComponent,
  ],
})
export default class SecondComponent {
  formGroup = new FormGroup({
    file: new FormControl<string>('', [Validators.required]),
    type: new FormControl<string>('ga', [Validators.required]),
  });
  formData = new FormData();
  @ViewChild(FileUploadComponent) fileUploadComponent!: FileUploadComponent;
  constructor(private readonly httpClient: HttpClient) {}
  onFileChange(e: Event) {
    const target = e.target as HTMLInputElement;
    const file = target.files?.[0];
    console.log(file);
    if (file) {
      this.formData.set('file', file);
    }
  }
  submit() {
    console.log(this.formData);
    this.httpClient
      .post('http://localhost:3000/api/v1/file', this.formData)
      .subscribe({
        next: (value) => {
          console.log(value);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }
}
