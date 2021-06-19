import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import * as moment from "moment";
import { ApiService } from "src/app/services/api.service";
import { ShowAlertMessage } from "src/app/helpers/showAlertMessage";
import { User } from "src/app/models/user.model";
import data from "../../helpers/photos";

@Component({
  selector: "app-view-profile",
  templateUrl: "./view-profile.page.html",
  styleUrls: ["./view-profile.page.scss"],
})
export class ViewProfilePage implements OnInit {
  public user: User;
  public age: number;
  public images = data;
  public showAlertMessage = new ShowAlertMessage();
  public id;

  constructor(private apiService: ApiService, private route: ActivatedRoute) {}

  public ngOnInit() {
    this.getUser();
    this.id = +this.route.snapshot.paramMap.get("id");
    console.log("USER", this.id);
  }

  public getUser() {
    this.apiService
      .getById<User>("user", +this.route.snapshot.paramMap.get("id"))
      .subscribe(
        (response) => {
          this.user = response;
          this.age = moment(new Date()).diff(
            moment(this.user.birthdate),
            "years"
          );
        },
        (error: HttpErrorResponse) => {
          this.showAlertMessage.showErrorAlert(error.error.message_error);
        }
      );
  }
}
