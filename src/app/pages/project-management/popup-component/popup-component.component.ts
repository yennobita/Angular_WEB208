import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-popup-component',
  templateUrl: './popup-component.component.html',
  styleUrls: ['./popup-component.component.scss']
})
export class PopupComponentComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal,) { }

  ngOnInit(): void {
  }

}
