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

export interface Label {
  id: string;
  name: string;
  color: string;
}
export interface createLabel extends Label {
  board: string;
  card: string;
}

export interface Task {
  id: string;
  description: string;
  completed: boolean;
}

export interface Card {
  id: string;
  title: string;
  description: string;
  order: number;
  labels: Label[];
  tasks: Task[];
  column: string;
  total_tasks: number;
  completed_tasks: number;
}

export interface UpdateCardLabelRequest {
  id: string;
  labelId: string;
}

export interface Column {
  id: string;
  background: string;
  title: string;
  board: string;
  order: number;
  cards: string[];
}

export interface Board {
  id: string;
  title: string;
  is_favorite: boolean;
}

export interface FullBoard extends Board {
  columns: Column[];
  labels: Label[];
  cards: Card[];
}

export type Entity = 'Board' | 'Column' | 'Card' | 'Label';
export type Action = 'Create' | 'Edit' | 'Delete' | null;
