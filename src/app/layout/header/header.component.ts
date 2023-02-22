import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { menu } from 'src/app/config/menu';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router) {}
  menu = menu;
  role: string = '';
  user: any;

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '');
    this.user = user;
    this.role = user ? user?.role : '';
  }

  handleClickLogout() {
    localStorage.clear();
    this.router.navigate(['/auth/login']);
  }
}
