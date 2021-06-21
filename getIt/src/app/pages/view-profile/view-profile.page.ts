import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import * as moment from 'moment';
import { RatingComponent } from 'src/app/components/rating/rating.component';
import { ViewPublicationComponent } from 'src/app/components/view-publication/view-publication.component';
import { ShowAlertMessage } from 'src/app/helpers/showAlertMessage';
import { Rating } from 'src/app/models/rating.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.page.html',
  styleUrls: ['./view-profile.page.scss'],
})
export class ViewProfilePage implements OnInit {

  public user;
  public rating;
  public age: number;
  public publications;
  public showAlertMessage = new ShowAlertMessage();

  constructor(private apiService: ApiService, private route: ActivatedRoute,
              private router: Router, private modalCtrl: ModalController) {}

  ngOnInit() {
    this.getUser();
  }

  public getUser() {
    this.apiService.getById<any>('user', this.route.snapshot.params.id).subscribe(response => {
      this.user = response;
      this.getRating();
      this.getPublications();
      this.age = moment(new Date()).diff(moment(this.user.birthdate), 'years');
    }, (error: HttpErrorResponse) => {
      this.showAlertMessage.showErrorAlert(error.error.message_error);
    });
  }

  public async viewPublication( publication: any) {
    const modal = await this.modalCtrl.create({
      component: ViewPublicationComponent,
      componentProps: {
        publicationList: publication
      }
    });
    await modal.present();
  }

  public async rateUser() {
    const modal = await this.modalCtrl.create({
      component: RatingComponent,
      componentProps: {
        ratedUser: this.route.snapshot.params.id
      }
    });
    await modal.present();
  }


  public getRating() {
    this.apiService.getById<Array<Rating>>('user-rating', this.route.snapshot.params.id).subscribe(response => {
      let sum = 0;
      // tslint:disable-next-line:forin
      for (const index in response) {
        sum += response[index].score;
      }
      this.rating = ((sum / response.length)*10)*2;      
    }, (error: HttpErrorResponse) => {
      this.showAlertMessage.showErrorAlert(error.name);
    });
  }

  public getPublications() {
    this.apiService.getById<any>('photos-gallery', this.route.snapshot.params.id).subscribe(response => {
      this.publications = response;
    }, (error: HttpErrorResponse) => {
      this.showAlertMessage.showErrorAlert(error.error.message_error);
    });
  }

  public goPhotoToGallery() {
	  this.router.navigate(['getit/photo-gallery/',  this.route.snapshot.params.id]);
  }

}
