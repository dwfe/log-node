export interface ILog {
  type: 'error' | 'warning' | 'success' | 'action';
  title?: string;
  message?: string[] | any;
  asLine?: boolean;
}
