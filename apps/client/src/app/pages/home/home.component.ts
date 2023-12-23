import {
  ChangeDetectorRef,
  Component,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Store } from '@ngrx/store';

import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { UserDto } from '@hyuil/libs';
import { VideoComponent } from '../../components/video/video.component';
import { SpinnerService } from '../../services/spinner.service';
import {
  countSelector,
  decrementAction,
  incrementAction,
  loadCountAction,
} from '../../store/count.feature';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, VideoComponent],
})
export default class HomeComponent implements OnInit {
  store = inject(Store);
  count$ = this.store.select(countSelector);
  count = toSignal(this.count$);
  formGroup = new FormGroup({
    username: new FormControl('', []),
    password: new FormControl('', []),
  });
  route = inject(ActivatedRoute);
  spinnerService = inject(SpinnerService);
  hi = 'hi';
  constructor(
    private readonly httpClient: HttpClient,
    private readonly cdr: ChangeDetectorRef
  ) {
    console.log(this.hi);
  }
  users: UserDto[] = [];
  ngOnInit(): void {
    this.route.data.subscribe(({ data }) => {
      console.log(data);
    });
    this.httpClient
      .get<UserDto[]>('http://localhost:3000/api/v1/users')
      .subscribe((res) => (this.users = res));
  }
  increment() {
    this.store.dispatch(incrementAction());
  }
  decrement() {
    this.store.dispatch(decrementAction());
  }
  loadCount() {
    this.store.dispatch(loadCountAction());
  }
  submit() {
    this.httpClient
      .post('http://localhost:3000/api/v1/users', this.formGroup.value)
      .subscribe((res) => {
        console.log(res);
      });
  }
  load() {
    this.spinnerService.show();
  }
  url = signal<string>('');

  // big size mp4 video url over 1gb
  bigSizeVideoUrl = 'https';

  getStreamString() {
    this.httpClient
      .get('http://localhost:3000/api/v1/stream', {
        responseType: 'blob',
      })
      .subscribe({
        next: (blob) => {
          console.log(blob.size);
          const url = URL.createObjectURL(blob);
          this.url.set(url);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
