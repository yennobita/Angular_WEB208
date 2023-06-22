import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { PageService } from '../../services/pages.service';
import { BehaviorSubject } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-popup-task',
  templateUrl: './popup-task.component.html',
  styleUrls: ['./popup-task.component.scss'],
})
export class PopupTaskComponent implements OnInit {
  formTaskManager: FormGroup = new FormGroup({});
  isLoadingSubmit$: BehaviorSubject<any> = new BehaviorSubject(false);
  isLoadingdataProject$: BehaviorSubject<any> = new BehaviorSubject(false);
  isLoadingdataUser$: BehaviorSubject<any> = new BehaviorSubject(false);
  dataProject$: BehaviorSubject<any> = new BehaviorSubject([]);
  dataUser$: BehaviorSubject<any> = new BehaviorSubject([]);
  dataStatus$: BehaviorSubject<any> = new BehaviorSubject([
    { value: 'TO DO', label: 'TO DO' },
    { value: 'IN PROGRESS', label: 'IN PROGRESS' },
    { value: 'READY FOR TESTING', label: 'READY FOR TESTING' },
    { value: 'TESTED WITH FEEDBACKS', label: 'TESTED WITH FEEDBACKS' },
    { value: 'DONE', label: 'DONE' },
  ]);
  @Input() content: any;

  get frm() {
    return this.formTaskManager && this.formTaskManager.controls;
  }

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private pageService: PageService,
    private toastr: ToastrService
  ) {
    this.formTaskManager = this.fb.group({
      nameProject: [null, Validators.required],
      startDate: [null, Validators.required],
      endDate: [null, Validators.required],
      toName: [null, Validators.required],
      fromName: [null, Validators.required],
      nameTask: [null, Validators.required],
      status: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.getListProject();
    if (this.content) {
      console.log('content', this.content);
      this.viewData();
    }
  }

  viewData() {
    this.formTaskManager.patchValue({
      nameProject: this.content.nameProject,
      startDate: new Date(moment(this.content.startDate).format('MM/DD/YYYY')),
      endDate: new Date(moment(this.content.endDate).format('MM/DD/YYYY')),
      nameTask: this.content.nameTask,
      toName: this.content.toName,
      fromName: this.content.fromName,
      status: this.content.status,
    });
  }

  getListProject() {
    this.isLoadingdataProject$.next(true);
    this.pageService
      .getProject()
      .pipe(finalize(() => this.isLoadingdataProject$.next(false)))
      .subscribe((res) => {
        const data = res.map((x: any) => {
          return {
            value: x?.nameProject,
            label: x?.nameProject,
          };
        });
        this.dataProject$.next(data);
      });
  }

  handleChangeProject(value: any) {
    this.isLoadingdataUser$.next(true);
    this.pageService
      .getUser()
      .pipe(finalize(() => this.isLoadingdataUser$.next(false)))
      .subscribe((res) => {
        const includes = res.filter((y: any) =>
          y.nameProject.includes(value.value)
        );
        const data = includes.map((x: any) => {
          return {
            value: x.firstName + ' ' + x.lastname,
            label: x.firstName + ' ' + x.lastname,
          };
        });
        this.dataUser$.next(data);
      });
  }
  handleSubmit() {
    if (!this.formTaskManager.valid) {
      this.formTaskManager.markAllAsTouched();
      return;
    }
    const body = {
      startDate: moment(this.formTaskManager.value.startDate).format(
        'MM/DD/YYYY'
      ),
      nameProject:
        this.formTaskManager.value.nameProject.value ||
        this.formTaskManager.value.nameProject,
      status:
        this.formTaskManager.value.status.value ||
        this.formTaskManager.value.status,
      endDate: moment(this.formTaskManager.value.endDate).format('MM/DD/YYYY'),
      toName:
        this.formTaskManager.value.toName.value ||
        this.formTaskManager.value.toName,
      fromName:
        this.formTaskManager.value.fromName.value ||
        this.formTaskManager.value.fromName,
      nameTask: this.formTaskManager.value.nameTask,
    };
    this.isLoadingSubmit$.next(true);
    if (!this.content) {
      this.pageService
        .postTask(body)
        .pipe(finalize(() => this.isLoadingSubmit$.next(false)))
        .subscribe((res) => {
          this.toastr.success('Add new Succsessful!');

          this.activeModal.close(true);
        });
    } else {
      this.pageService
        .putTask(body, this.content.id)
        .pipe(finalize(() => this.isLoadingSubmit$.next(false)))
        .subscribe((res) => {
          this.toastr.success('Edit Succsessful!');

          this.activeModal.close(true);
        });
    }
  }
}
