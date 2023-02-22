import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { BehaviorSubject } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { PageService } from '../../services/pages.service';

@Component({
  selector: 'app-popup-component',
  templateUrl: './popup-component.component.html',
  styleUrls: ['./popup-component.component.scss'],
})
export class PopupComponentComponent implements OnInit {
  formProjectManager: FormGroup;
  isLoadingSubmit$: BehaviorSubject<any> = new BehaviorSubject(false);

  get frm() {
    return this.formProjectManager && this.formProjectManager.controls;
  }

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private pageService: PageService
  ) {
    this.formProjectManager = this.fb.group({
      nameProject: [null, Validators.required],
      startDate: [null, Validators.required],
      teamSize: [null, Validators.required],
      pice: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    console.log('frm', this.frm);
  }

  handleSubmit() {
    console.log('frm', this.formProjectManager.value);
    if (!this.formProjectManager.valid) {
      this.formProjectManager.markAllAsTouched();
      return;
    }
    const body = {
      startDate: moment(this.formProjectManager.value.startDate).format(
        'DD/MM/YYYY'
      ),
      nameProject: this.formProjectManager.value.nameProject,
      teamSize: this.formProjectManager.value.teamSize,
      pice: this.formProjectManager.value.pice,
    };
    this.isLoadingSubmit$.next(true);
    this.pageService
      .postProject(body)
      .pipe(finalize(() => this.isLoadingSubmit$.next(false)))
      .subscribe((res) => {
        alert('Thêm thành công');
        this.activeModal.close(true);
      });
  }
}
