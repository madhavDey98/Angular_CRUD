import { HttpHeaders } from '@angular/common/http';

export class VariableConstants {
  constructor() {}

  public static readonly IS_LOCAL: boolean = false;

  public static readonly METHOD_GET: string = 'GET';
  public static readonly METHOD_POST: string = 'POST';
  public static readonly METHOD_PUT: string = 'PUT';
  public static readonly METHOD_DELETE: string = 'DELETE';

  public static readonly ACCESS_PUBLIC: string = 'PUBLIC';
  public static readonly ACCESS_PRIVATE: string = 'PRIVATE';
  public static readonly header = new HttpHeaders({
    'Content-Type': 'application/json',
  }).set('api_key', `${localStorage.getItem('token')}`);
}
