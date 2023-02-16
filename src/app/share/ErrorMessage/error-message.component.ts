import { Component, Input } from '@angular/core';

@Component({
  selector: 'error-message-root',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss'],
})
export class ErrorMessageComponent {
  @Input() messageError: any;
  @Input() errors: any;
}
