import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { objectToQueryString } from "src/app/helpers/queryParams";
import { environment } from "src/environments/environment";
import { CONNECT_PARAMS, SEARCH } from "../helpers/constants";
import { StorageService } from "../services/storage.service";

@Injectable({
  providedIn: "root",
})

export class ApiService {

  constructor(private http: HttpClient, private storageService: StorageService) {}

  public httpHeaders = new HttpHeaders({
    'content-type': 'application/json',
	'Authorization': `Bearer ${this.storageService.getCurrentObject()}`
  });

  public post<T>(dir: string, model: object): Observable<T> {
    return this.http.post<T>(`${environment.api_url}/${dir}`, model, {headers: this.httpHeaders});
  }

  public getAll<T>(dir: string): Observable<T> {
    return this.http.get<T>(`${environment.api_url}/${dir}`, {headers: this.httpHeaders});
  }

  public getByParams<T>(dir: string, params: object): Observable<T> {
    return this.http.get<T>(
      `${
        environment.api_url
      }/${dir}/${SEARCH}${CONNECT_PARAMS}${objectToQueryString(params)}`, 
	  {headers: this.httpHeaders}
    );
  }

  public getById<T>(dir: string, id: number): Observable<T> {
    return this.http.get<T>(`${environment.api_url}/${dir}/${id}`, {headers: this.httpHeaders});
  }

  public put<T>(dir: string, id: string, model: object): Observable<T> {
    return this.http.put<T>(`${environment.api_url}/${dir}/${id}`, model, {headers: this.httpHeaders});
  }

  public updateList(dir: string, model: object): Observable<any> {
    return this.http.put<any>(`${environment.api_url}/${dir}`, model);
  }

  public postWithoutHeaders(dir: string, model: object): Observable<any> {
    return this.http.post<any>(dir, model);
  }
}
