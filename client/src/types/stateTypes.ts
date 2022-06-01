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
