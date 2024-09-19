export interface Toast {
  message: string;
  type: 'success' | 'error';
  className?: string;
  icon?: string;
}