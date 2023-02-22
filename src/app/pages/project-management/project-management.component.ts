import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { PageService } from '../services/pages.service';
import { PopupComponentComponent } from './popup-component/popup-component.component';

@Component({
  selector: 'app-project-management',
  templateUrl: './project-management.component.html',
  styleUrls: ['./project-management.component.scss'],
})
export class ProjectManagementComponent implements OnInit {
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  dataList$: BehaviorSubject<any> = new BehaviorSubject<any>([]);

  totalGetList: number = 0;
  lowValue: number = 0;
  highValue: number = 10;
  page = 1;
  pageSize = 10;

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
      .getProject()
      .pipe(finalize(() => this.isLoading$.next(false)))
      .subscribe((res) => {
        console.log('res', res);
        this.dataList$.next(res);
      });
  }

  createData(content?: any) {
    const modalPending = this.ngModal.open(PopupComponentComponent, {
      backdrop: 'static',
      keyboard: false,
      size: 'lg',
    });

    modalPending.componentInstance.title = 'Tạo mới danh sách tiền tố';

    modalPending.result.then((res) => {
      if (res) {
        this.getList();
      }
    });
  }
}
