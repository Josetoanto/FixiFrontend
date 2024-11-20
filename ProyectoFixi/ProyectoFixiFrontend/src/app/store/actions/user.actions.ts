import { createAction, props } from '@ngrx/store';

// Acción para cargar usuarios
export const loadUsers = createAction('[User] Load Users');

// Acción para cargar usuarios exitosamente
export const loadUsersSuccess = createAction(
  '[User] Load Users Success',
  props<{ users: any[] }>() // Cambia 'any' por tu modelo de usuario
);

// Acción para manejar errores al cargar usuarios
export const loadUsersFailure = createAction(
  '[User] Load Users Failure',
  props<{ error: any }>()
);
