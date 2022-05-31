export interface UserState {
  accessToken: string;
  refreshToken: string;
  isAuthenticated: boolean;
}

export interface NotificationState {
  isActive: boolean;
  type: 'error' | 'success' | undefined;
  msg: string;
}
