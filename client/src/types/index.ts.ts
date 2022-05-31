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
