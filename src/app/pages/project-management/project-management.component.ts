import { Component, OnInit } from '@angular/core';
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
  constructor(private pageService: PageService, private ngModal: NgbModal) {}

  ngOnInit(): void {
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
  }
}
