import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { VariableConstants } from '../varibale-constants';
import { RequestMapper } from '../request-mapper';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  constructor(private http: HttpClient, private router: Router) {}

  public callApi(
    data: object,
    method: string,
    url: string,
    type: string
  ): Observable<any> {
    var response;

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    if (type == VariableConstants.ACCESS_PRIVATE) {
      headers = new HttpHeaders({
        'Content-Type': 'application/json',
      }).set('api_key', `${localStorage.getItem('token')}`);
    }

    let queryParams = new HttpParams();

    Object.entries(data).forEach(([key, value]) => {
      queryParams = queryParams.append(key, value);
    });

    if (method == VariableConstants.METHOD_GET) {
      response = this.http.get(RequestMapper.BASE_API_URL + url, {
        headers,
        params: queryParams,
      });
    } else if (method == VariableConstants.METHOD_POST) {
      response = this.http.post(RequestMapper.BASE_API_URL + url, data, {
        headers,
        observe: 'response',
      });
    } else if (method == VariableConstants.METHOD_PUT) {
      response = this.http.put(RequestMapper.BASE_API_URL + url, data, {
        headers,
        observe: 'response',
      });
    } else {
      response = this.http.delete(RequestMapper.BASE_API_URL + url, {
        headers,
      });
    }

    return response;
  }
}
