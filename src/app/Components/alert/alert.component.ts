import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {
  /**
   *
   */
  constructor(
    private activeModal : NgbActiveModal,

  ) {

    
  }
  close(){
    this.activeModal.close();
 
   }
}
