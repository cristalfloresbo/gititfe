import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { ApiService } from "../../services/api.service";
import { Ad } from "../../models/ad.model";
import { ShowAlertMessage } from 'src/app/helpers/showAlertMessage';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage implements OnInit {
  public ads: Ad[] = [];
  public showAlertMessage = new ShowAlertMessage();


  constructor(private apiService: ApiService, private router: Router) {}

  public ngOnInit() {
    this.getPublications();
  }

  public getPublications() {
    this.apiService.getAll<Ad[]>("publications").subscribe(response => {
      this.ads = response;
    }, (error: HttpErrorResponse) => {
      this.showAlertMessage.showErrorAlert(error.error.message_error);
    });
  }
}
