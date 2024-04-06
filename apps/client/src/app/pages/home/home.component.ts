import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import FileUploadComponent from '../../components/file-upload/file-upload.component';
import { VideoComponent } from '../../components/video/video.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    VideoComponent,
    FileUploadComponent,
  ],
})
export default class HomeComponent implements OnInit {
  fb = inject(FormBuilder);
  file = this.fb.control<File | null>(null, [Validators.required]);
  http = inject(HttpClient);

  constructor() {
    this.http
      .get('http://localhost:3000/api/v1', {
        responseType: 'blob',
        observe: 'events',
        reportProgress: true,
      })
      .subscribe((event) => {
        if (event.type === HttpEventType.DownloadProgress) {
          // 진행률
          const progress = Math.round((100 * event.loaded) / event.total!);
          console.log(`File is ${progress}% loaded.`);
        } else if (event instanceof HttpResponse) {
          // 완료
          console.log('File is completely loaded!');
        }
      });
  }

  ngOnInit(): void {}
  submit() {
    const formData = new FormData();
    const file = this.file.value;
    if (!file) return;
    formData.append('file', file);
    this.http.post('http://localhost:3000/api/v1', formData).subscribe(() => {
      console.log('file uploaded');
    });
  }
}
