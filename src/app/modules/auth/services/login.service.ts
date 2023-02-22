import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { finalize, map, catchError } from 'rxjs/operators';
import * as moment from 'moment';
import { AuthHTTPService } from '../../services/auth-http.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(
    private localStorage: LocalStorageService,
    private authHttpService: AuthHTTPService
  ) {}

  login(data: any) {
    let url = `${environment.feApiUrl}/login`;
    return this.authHttpService.callFeApiPostMethod<any>(data, url).pipe(
      map((res) => {
        if (!res?.token) return res;
        return res.token;
      }),
      catchError((body) => {
        return of(body.error);
      })
    );
  }
}
