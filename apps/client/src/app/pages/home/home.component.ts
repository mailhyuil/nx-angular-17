import {
  afterNextRender,
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { HttpClient } from '@angular/common/http';
import FileUploadComponent from '../../components/file-upload/file-upload.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, FileUploadComponent],
})
export default class HomeComponent implements AfterViewInit {
  fb = inject(FormBuilder);
  file = this.fb.control<File | null>(null, [Validators.required]);
  http = inject(HttpClient);
  chunkSize = 1000 * 1000 * 5; // 5MB
  start = 0;
  end = this.start + this.chunkSize - 1;
  mediaSource: MediaSource;
  mimeCodec = 'video/mp4; codecs="avc1.64000a, mp4a.40.2"';
  @ViewChild('videoRef') videoRef: ElementRef<HTMLVideoElement>;
  fetchArrayBuffer$ = () => {
    return this.http.get('http://localhost:3000/api/v1', {
      responseType: 'arraybuffer',
      headers: {
        Range: `bytes=${this.start}-${this.end}`,
      },
    });
  };
  constructor() {
    afterNextRender(() => {});
  }
  ngAfterViewInit(): void {
    if (MediaSource.isTypeSupported(this.mimeCodec)) {
      this.mediaSource = new MediaSource();
      const video = this.videoRef.nativeElement;
      video.src = URL.createObjectURL(this.mediaSource);
      if (!video) return;
      video.addEventListener('progress', () => {
        console.log('progress');
      });
      video.addEventListener('seeking', () => {
        console.log('seeking');
      });
      this.mediaSource.addEventListener('sourceclose', () => {
        console.log('sourceclose');
      });
      this.mediaSource.addEventListener('sourceopen', () => {
        const sourceBuffer = this.mediaSource.addSourceBuffer(this.mimeCodec);
        this.fetchArrayBuffer$().subscribe(async (arrayBuffer) => {
          sourceBuffer.addEventListener('updateend', () => {
            console.log(sourceBuffer);
            video.load();
          });
          sourceBuffer.appendBuffer(arrayBuffer);
        });
      });
    } else {
      console.error('Unsupported MIME type');
    }
  }

  upload() {
    const formData = new FormData();
    const file = this.file.value;
    if (!file) return;
    formData.append('file', file);
    this.http.post('http://localhost:3000/api/v1', formData).subscribe(() => {
      console.log('file uploaded');
    });
  }
}
