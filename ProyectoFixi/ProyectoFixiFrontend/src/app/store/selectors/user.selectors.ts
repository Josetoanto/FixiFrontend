import { createSelector, createFeatureSelector } from '@ngrx/store';

export const selectUserState = (state: any) => state.users;


export const selectAllUsers = createSelector(
  selectUserState,
  (state) => state.users
);

export const selectLoading = createSelector(
  selectUserState,
  (state) => state.loading
);

export const selectError = createSelector(
  selectUserState,
  (state) => state.error
);
