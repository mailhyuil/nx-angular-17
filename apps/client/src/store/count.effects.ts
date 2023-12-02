import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { HomeService } from '../app/pages/home/home.service';
@Injectable()
export class CountEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly homeService: HomeService
  ) {}
  loadCount$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Count] Load Count'),
      exhaustMap(() =>
        this.homeService.getCount().pipe(
          map((count) => ({
            type: '[Count] Count Loaded Success',
            payload: count,
          })),
          catchError((err) => {
            console.error(err);
            return of({
              type: '[Count] Count Loaded Failure',
            });
          })
        )
      )
    )
  );
}
