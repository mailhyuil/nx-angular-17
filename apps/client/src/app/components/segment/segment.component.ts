import {
  AfterViewInit,
  Component,
  ContentChildren,
  Input,
  OnInit,
  QueryList,
} from '@angular/core';
import { map } from 'rxjs';
import { ValueAccessorDirective } from '../../directives/value-accessor.directive';
import { SegmentOptionComponent } from './segment-option/segment-option.component';

@Component({
  selector: 'app-segment',
  templateUrl: './segment.component.html',
  styleUrls: ['./segment.component.scss'],
  standalone: true,
  imports: [SegmentOptionComponent],
  hostDirectives: [ValueAccessorDirective],
})
export class SegmentComponent implements AfterViewInit, OnInit {
  @Input() type: 'block' | 'line' = 'block';
  @ContentChildren(SegmentOptionComponent)
  segments!: QueryList<SegmentOptionComponent>;
  value?: string;
  constructor(public valueAccessor: ValueAccessorDirective<string>) {
    valueAccessor.value.subscribe((v) => (this.value = v));
  }
  ngOnInit(): void {}
  ngAfterViewInit(): void {
    this._init();
    this.segments.forEach((segment) => {
      segment.type = this.type;
      segment.select
        .pipe(
          map((v) => {
            this.segments.forEach((s) => {
              s.selectedValue$.next(v);
            });
            return v;
          })
        )
        .subscribe((v) => {
          this.select(v);
        });
    });
  }
  _init() {
    if (!this.value) return;
    this.select(this.value);
    this.segments.forEach((segment) => {
      segment.type = this.type;
      this.segments.forEach((s) => {
        if (!this.value) return;
        s.selectedValue$.next(this.value);
      });
    });
  }
  select(value: string) {
    this.valueAccessor.writeValue(value);
    this.valueAccessor.valueChange(value);
  }
}
