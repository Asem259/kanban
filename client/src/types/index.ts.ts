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

export interface Board {
  id: string;
  title: string;
  is_favorite: boolean;
}

export type Entity = 'Board' | 'Column' | 'Card';
export type Mode = 'Create' | 'Edit' | '';
