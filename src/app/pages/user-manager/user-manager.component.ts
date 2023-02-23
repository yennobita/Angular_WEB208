import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { PageService } from '../services/pages.service';

@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.scss'],
})
export class UserManagerComponent implements OnInit {
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  dataList$: BehaviorSubject<any> = new BehaviorSubject([]);

  totalGetList: number = 0;
  lowValue: number = 0;
  highValue: number = 10;
  page = 1;
  pageSize = 5;

  constructor(
    private pageService: PageService,
    private ngModal: NgbModal,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getList();
  }

  onPageChange(event: PageEvent): PageEvent {
    this.page = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.lowValue = event.pageIndex * event.pageSize;
    this.highValue = this.lowValue + event.pageSize;
    return event;
  }

  getList() {
    this.pageService
      .getUser()
      .pipe(finalize(() => this.isLoading$.next(false)))
      .subscribe((res) => {
        this.dataList$.next(res);
        this.totalGetList = res.length;
      });
  }
}
