import { HttpHeaders } from '@angular/common/http';

export class RequestMapper {
  // Angular Routes

  public static readonly HOME: string = '';
  public static readonly LOGIN: string = '';
  public static readonly SIGNUP: string = 'signup';
  public static readonly LOGOUT: string = 'logout';
  public static readonly DASHBOARD: string = '';
  public static readonly DASHBOARD_: string = 'dashboard';
  public static readonly NOT_FOUND_URL: string = '404';
  public static readonly PORTAL: string = 'portal';
  public static readonly TEACHERS_PORTAL: string = 'teachers';

  static signup: any;

  constructor() {}

  // API Urls

  public static readonly BASE_API_URL: string = 'https://reqres.in/api/';
  public static readonly API_LOGIN: string = 'login';
  public static readonly API_USER_TYPE_GET_ALL: string =
    'user/user_type_get_all';
  public static readonly API_PRONOUN_TYPE: string = 'user/user_pronoun_get_all';
  public static readonly API_CLASS_RESCHEDULE: string =
    'class_reschedule_request/get_all';
  public static readonly API_CLASS_SCHEDULE_GET_ALL: string =
    'scheduled_class/get_all';
  public static readonly API_REGISTRATION: string = 'user/register';
  public static readonly API_COURSE: string = 'course/get_all';
  public static readonly COURSE_LEVEL: string = 'course_level/get_all';
}
