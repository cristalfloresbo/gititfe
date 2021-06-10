import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { ApiService } from "../../services/api.service";
import { Ad } from "../../models/ad.model";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage implements OnInit {
  public ad$: Observable<Ad[]>;

  constructor(private apiService: ApiService, private router: Router) {}

  public ngOnInit() {
    this.ad$ = this.apiService.getAll<Ad[]>("publications");
  }
}
