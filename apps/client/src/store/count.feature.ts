import {
  createAction,
  createFeature,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';

export type CountState = {
  count: number;
};

const initialState: CountState = {
  count: 0,
};

export const incrementAction = createAction('[Count] Increment');
export const decrementAction = createAction('[Count] Decrement');
// effects
export const loadCountAction = createAction('[Count] Load Count');
export const countLoadedSuccessAction = createAction(
  '[Count] Count Loaded Success',
  // ajax response
  (count: number) => ({ payload: count })
);
export const countLoadedFailureAction = createAction(
  '[Count] Count Loaded Failure'
);

export interface AppState {
  count: CountState;
}

export const countReducer = createReducer(
  initialState,
  on(incrementAction, (state) => ({ count: state.count + 1 })),
  on(decrementAction, (state) => ({ count: state.count - 1 })),
  // effects
  on(loadCountAction, (state) => ({ count: state.count })),
  on(countLoadedSuccessAction, (state, { payload }) => ({
    count: state.count + payload,
  })),
  on(countLoadedFailureAction, (_) => ({ count: 0 }))
);

export const selectCount = (state: AppState) => state.count;
export const countSelector = createSelector(
  selectCount,
  (selectedCount: CountState) => selectedCount.count
);
export const countFeatureKey = 'count';
export const countFeature = createFeature({
  name: countFeatureKey,
  reducer: countReducer,
});
