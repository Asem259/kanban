import { Action, DragItem, Entity } from './index.ts';

export interface UserState {
  accessToken: string;
  refreshToken: string;
  isAuthenticated: boolean;
  id: string;
  email: string;
}

export interface NotificationState {
  isActive: boolean;
  type: 'error' | 'success' | undefined;
  msg: string;
}

export interface BoardState {
  currentBoard: string;
  action: Action;
  id: string;
  title: string;
  entity: Entity | null;
  draggedItem: DragItem | null;
}
