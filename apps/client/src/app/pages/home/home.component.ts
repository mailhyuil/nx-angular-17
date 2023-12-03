import { Component, OnInit, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Store } from '@ngrx/store';

import { ActivatedRoute } from '@angular/router';
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
  imports: [FormsModule, ReactiveFormsModule],
})
export default class HomeComponent implements OnInit {
  store = inject(Store);
  count$ = this.store.select(countSelector);
  count = toSignal(this.count$);
  formGroup = new FormGroup({
    name: new FormControl('', []),
  });
  route = inject(ActivatedRoute);
  spinnerService = inject(SpinnerService);
  ngOnInit(): void {
    this.route.data.subscribe(({ data }) => {
      console.log(data);
    });
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
    console.log(this.formGroup.getRawValue());
  }
  load() {
    this.spinnerService.show();
  }
}
