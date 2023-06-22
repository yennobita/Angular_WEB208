import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { PopupConfirmComponent } from 'src/app/share/popup-confirm/popup-confirm.component';
import { PageService } from '../services/pages.service';
import { PopupTaskComponent } from './popup-task/popup-task.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-task-manager',
  templateUrl: './task-manager.component.html',
  styleUrls: ['./task-manager.component.scss'],
})
export class TaskManagerComponent implements OnInit {
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
    private fb: FormBuilder,
    private toastr: ToastrService
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
      .getTask()
      .pipe(finalize(() => this.isLoading$.next(false)))
      .subscribe((res) => {
        this.dataList$.next(res);
        this.totalGetList = res.length;
      });
  }

  createData(content?: any) {
    const modalPending = this.ngModal.open(PopupTaskComponent, {
      backdrop: 'static',
      keyboard: false,
      size: 'lg',
    });

    modalPending.componentInstance.content = content;

    modalPending.result.then((res) => {
      if (res) {
        this.getList();
      }
    });
  }

  deleteData(data: any) {
    const modalPending = this.ngModal.open(PopupConfirmComponent, {
      backdrop: 'static',
      keyboard: false,
      size: 'lg',
    });

    modalPending.result.then((res) => {
      if (res) {
        this.pageService
          .deleteTask(data.id)
          .pipe(finalize(() => this.isLoading$.next(false)))
          .subscribe((res) => {
            this.toastr.success('Delete Succsessful!');

            this.getList();
          });
      }
    });
  }
}
