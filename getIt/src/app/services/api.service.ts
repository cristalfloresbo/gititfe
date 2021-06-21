import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { objectToQueryString } from "src/app/helpers/queryParams";
import { environment } from "src/environments/environment";
import { CONNECT_PARAMS, SEARCH } from "../helpers/constants";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  constructor(private http: HttpClient) {}

  public post<T>(dir: string, model: object): Observable<T> {
    return this.http.post<T>(`${environment.api_url}/${dir}`, model);
  }

  public getAll<T>(dir: string, model?: object): Observable<T> {
    return this.http.get<T>(`${environment.api_url}/${dir}`, model);
  }

  public getByParams<T>(dir: string, params: object): Observable<T> {
    return this.http.get<T>(
      `${
        environment.api_url
      }/${dir}/${SEARCH}${CONNECT_PARAMS}${objectToQueryString(params)}`
    );
  }

  public getById<T>(dir: string, id: any): Observable<T> {
    return this.http.get<T>(`${environment.api_url}/${dir}/${id}`);
  }

  public put<T>(dir: string, id: any, model: object): Observable<T> {
    return this.http.put<T>(`${environment.api_url}/${dir}/${id}`, model);
  }

  public updateList(dir: string, model: object): Observable<any> {
    return this.http.put<any>(`${environment.api_url}/${dir}`, model);
  }

  public sendEmail(dir: string, model: object): Observable<any> {
    return this.http.post<any>(dir, model);
  }
}
