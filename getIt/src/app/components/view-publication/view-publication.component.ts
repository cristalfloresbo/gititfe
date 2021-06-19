import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import * as moment from 'moment';
@Component({
  selector: 'app-view-publication',
  templateUrl: './view-publication.component.html',
  styleUrls: ['./view-publication.component.scss'],
})
export class ViewPublicationComponent implements OnInit {

  @Input() publicationList: Array<any>;
  public createdAt: string;
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    this.createdAt = moment(this.publicationList[0].createdAt).format('LLL');
  }

  public close() {
    this.modalCtrl.dismiss();
  }
}
