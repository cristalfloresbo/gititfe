import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ShowAlertMessage } from 'src/app/helpers/showAlertMessage';
import { Rating, RatingUpdate } from 'src/app/models/rating.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
})
export class RatingComponent implements OnInit {

  @Input() ratedUser: number;
  public currentUser=1;
  public currentScore;
  public ratingModel: Rating = {
    ratedUser: 0,
    raterUser: 1,
    score: 0
  };
  public ratingUpdateModel: RatingUpdate = {
    id: undefined,
    ratedUser: 0,
    raterUser: 1,
    score: 0
  };
  public rating;
  public showAlertMessage = new ShowAlertMessage();

  constructor(private modalCtrl: ModalController, private apiService: ApiService) { }

  ngOnInit() {
    this.getRating();
  }

  public rateUser(event) {
    this.currentScore = event.detail.value;
  }

  public getRating() {
    this.apiService.getById<Array<RatingUpdate>>('user-rating', this.ratedUser).subscribe(response => {
      this.ratingUpdateModel = response.find(rate => rate.raterUser == this.currentUser);  
      let sum = 0;
      // tslint:disable-next-line:forin
      for (const index in response) {
        sum += response[index].score;
      }
      this.rating = (sum / response.length);      
    }, (error: HttpErrorResponse) => {
      this.showAlertMessage.showErrorAlert(error.name);
    });
  }
  public save(){
    this.ratingModel.ratedUser = this.ratedUser;
    if (this.ratingUpdateModel == undefined){
      this.ratingModel.score = this.currentScore;
      this.apiService.post('rate-user', this.ratingModel).subscribe(response => {
        // tslint:disable-next-line:no-unused-expression
        response;
        this.showAlertMessage.showSuccessAlert('Su calificación se ha registrado exitosamente!');
        this.modalCtrl.dismiss();
        window.location.reload();
      }, (error: HttpErrorResponse) => {
        this.showAlertMessage.showErrorAlert(error.name);
      });
    } else {
      this.ratingUpdateModel.score = this.currentScore;
      this.apiService.put('rating', this.ratingUpdateModel.id,this.ratingUpdateModel).subscribe(response => {
        // tslint:disable-next-line:no-unused-expression
        response;
        this.showAlertMessage.showSuccessAlert('Su calificación se ha registrado exitosamente!');
        this.modalCtrl.dismiss();
        window.location.reload();
      }, (error: HttpErrorResponse) => {
        this.showAlertMessage.showErrorAlert(error.name);
      });
    }
  }
  public cancel() {
    this.modalCtrl.dismiss();
  }
}
