import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {map} from 'rxjs/operators';

type EntityResponseType<T> = HttpResponse<T>;

@Injectable({
    providedIn: 'root',
})
export class AuthHTTPService {
    constructor(private http: HttpClient) {
    }

    callFeApiPostMethod<R>(bodyReqest: any, url: string): Observable<any> {
        return this.http.post<R>(url, bodyReqest, {observe: 'response'})
            .pipe(map(res => res.body));
    }

    callFeApiPutMethod<R>(bodyReqest: any, url: string): Observable<any> {
        return this.http.put<R>(url, bodyReqest, {observe: 'response'})
            .pipe(map(res => res.body));
    }

    callFeApiGetMethod<R>(url: string): Observable<any> {
        return this.http.get<R>(url, {observe: 'response'})
            .pipe(map(res => res.body));
    }

    callFeApiDeleteMethod<R>(url: string): Observable<any> {
        return this.http.delete<R>(url, {observe: 'response'})
            .pipe(map(res => res.body));
    }
}
