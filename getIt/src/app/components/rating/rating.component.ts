import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { ShowAlertMessage } from 'src/app/helpers/showAlertMessage';
import { Rating } from 'src/app/models/rating.model';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
})
export class RatingComponent implements OnInit {

  @Input() ratedUser: number;
  public ratingModel: Rating = {
    ratedUser: 0,
    raterUser: 1,
    score: 0
  };
  public showAlertMessage = new ShowAlertMessage();

  constructor(private modalCtrl: ModalController, private apiService: ApiService) { }

  ngOnInit() {}

  public rateUser(event) {
    this.ratingModel.score = event.detail.value;
    this.ratingModel.ratedUser = this.ratedUser;
    this.apiService.post('rate-user', this.ratingModel).subscribe(response => {
      // tslint:disable-next-line:no-unused-expression
      response;
      this.showAlertMessage.showSuccessAlert('Su calificación se ha guardado exitosamente!');
      this.modalCtrl.dismiss();
    }, (error: HttpErrorResponse) => {
      this.showAlertMessage.showErrorAlert(error.name);
    });
  }

  public close() {
    this.modalCtrl.dismiss();
  }
}
