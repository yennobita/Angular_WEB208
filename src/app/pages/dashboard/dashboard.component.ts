import { Component, OnInit } from '@angular/core';
import { PageService } from '../services/pages.service';
import { BehaviorSubject } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  totalTask$: any;
  totalProject$: any;
  totalUser$: any;
  total$: any;
  users: any[] = [];

  constructor(private pageService: PageService) {}

  ngOnInit(): void {
    this.getList();
  }

  getList() {
    this.pageService
      .getTask()
      .pipe(finalize(() => this.isLoading$.next(false)))
      .subscribe((res) => {
        this.totalTask$ = res.length;
      });
    this.pageService
      .getProject()
      .pipe(finalize(() => this.isLoading$.next(false)))
      .subscribe((res) => {
        const sumWithInitial = res.reduce(
          (accumulator: any, currentValue: any) =>
            Number(accumulator) + Number(currentValue.pice),
          0
        );
        this.total$ = sumWithInitial;
        this.totalProject$ = res.length;
      });
    this.pageService
      .getUser()
      .pipe(finalize(() => this.isLoading$.next(false)))
      .subscribe((res) => {
        this.totalUser$ = res.length;
      });
    this.pageService
      .getUser()
      .pipe(finalize(() => this.isLoading$.next(false)))
      .subscribe((res) => {
        this.users = res;
      });
  }
}
