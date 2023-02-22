import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { finalize, map, catchError } from 'rxjs/operators';
import * as moment from 'moment';
import { AuthHTTPService } from 'src/app/modules/services/auth-http.service';

@Injectable({
  providedIn: 'root',
})
export class PageService {
  constructor(
    private localStorage: LocalStorageService,
    private authHttpService: AuthHTTPService
  ) {}

  getProject() {
    let url = `${environment.feApiUrl}/project-manager`;
    return this.authHttpService.callFeApiGetMethod<any>(url).pipe(
      map((res) => {
        return res;
      }),
      catchError((body) => {
        return of(body.error);
      })
    );
  }
}
