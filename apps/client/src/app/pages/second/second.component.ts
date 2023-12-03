import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-second',
  templateUrl: './second.component.html',
  styleUrls: ['./second.component.scss'],
  standalone: true,
  imports: [RouterModule, FormsModule, ReactiveFormsModule],
})
export default class SecondComponent implements OnInit {
  formGroup = new FormGroup({
    file: new FormControl(new FormData(), []),
  });
  formData = new FormData();
  constructor(private readonly httpClient: HttpClient) {}
  ngOnInit() {}
  onFilePicked(event: any) {
    if (!event.target) return;
    const file = event.target.files[0];
    if (!file) return;
    this.formGroup.patchValue({ file });
    this.formData.append('file', file);
  }
  submit() {
    const body = this.formGroup.value;
    console.log(body);
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
