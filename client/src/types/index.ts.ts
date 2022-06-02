export interface Token {
  access: string;
  refresh: string;
}

export interface Credentials {
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  last_login: string;
  date_joined: string;
}

export type UserShort = Pick<User, 'id' | 'email'>;

export interface Column {
  id: string;
  background: string;
  title: string;
  board: string;
  order: number;
}

export interface Board {
  id: string;
  title: string;
  is_favorite: boolean;
}

export interface FullBoard extends Board {
  columns: Column[];
}

export type Entity = 'Board' | 'Column' | 'Card';
export type Mode = 'Create' | 'Edit' | '';
