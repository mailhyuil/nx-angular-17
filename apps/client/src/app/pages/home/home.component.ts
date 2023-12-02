import { Component, OnInit } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import {
  AppState,
  countSelector,
  decrementAction,
  incrementAction,
  loadCountAction,
} from 'apps/client/src/store/count.feature';
import { ControlValueAccessorDirective } from '../../directives/value-accessor.directive';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, ControlValueAccessorDirective],
})
export default class HomeComponent implements OnInit {
  formGroup = new FormGroup({
    name: new FormControl('', []),
  });
  submit() {
    console.log(this.formGroup.getRawValue());
  }
  count$ = this.store.select(countSelector);
  count = toSignal(this.count$);
  constructor(private readonly store: Store<AppState>) {}
  async ngOnInit() {}
  increment() {
    this.store.dispatch(incrementAction());
  }
  decrement() {
    this.store.dispatch(decrementAction());
  }
  loadCount() {
    this.store.dispatch(loadCountAction());
  }
}
