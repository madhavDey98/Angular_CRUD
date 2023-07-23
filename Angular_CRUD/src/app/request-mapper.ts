import { HttpHeaders } from '@angular/common/http';

export class RequestMapper {
  // Angular Routes

  public static readonly HOME: string = '';
  public static readonly LOGIN: string = '';
  public static readonly SIGNUP: string = 'signup';
  public static readonly LOGOUT: string = 'logout';
  public static readonly DASHBOARD_: string = 'dashboard';
  public static readonly NOT_FOUND_URL: string = '404';

  static signup: any;

  constructor() {}

  // API Urls

  public static readonly BASE_API_URL: string = 'https://reqres.in/api/';
  public static readonly API_LOGIN: string = 'login';
  public static readonly API_CREATE_USER: string = 'users';
  public static readonly API_USER_LIST: string = 'users?page=2';
  public static readonly API_EMP_LIST: string = 'employees';
}
