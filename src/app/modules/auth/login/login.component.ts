import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { finalize } from 'rxjs/operators';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { LocalStorageService } from 'ngx-webstorage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});
  isLoadingLogin$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  constructor(
    private fb: FormBuilder,
    public loginService: LoginService,
    private localStorage: LocalStorageService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (!this.loginForm.valid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    const data = {
      username: this.loginForm.value?.email || '',
      password: this.loginForm.value?.password || '',
    };
    this.isLoadingLogin$.next(true);
    localStorage.setItem('token', JSON.stringify('123131'));
    this.router.navigate(['/']);
    // this.loginService
    //   .login(data)
    //   .pipe(finalize(() => this.isLoadingLogin$.next(false)))
    //   .subscribe((res) => {
    //     if (res) {
    //       localStorage.setItem('token', JSON.stringify(res));
    //       this.router.navigate(['/']);
    //     }
    //   });
  }
}
