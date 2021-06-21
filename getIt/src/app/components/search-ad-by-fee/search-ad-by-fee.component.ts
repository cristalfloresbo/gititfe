import { Component, OnInit } from "@angular/core";
import { ApiService } from "src/app/services/api.service";
import { Ad } from "../../models/ad.model";

@Component({
  selector: "app-search-ad-by-fee",
  styleUrls: ["./search-ad-by-fee.component.scss"],
  templateUrl: "./search-ad-by-fee.component.html",
})
export class SearchAdByFeeComponent implements OnInit {
  public ads: Ad[] = [];
  public txtToSearch = 0;
  constructor(private apiService: ApiService) {}

  public ngOnInit() {
    this.loadAds();
  }

  public async loadAds() {
    await this.apiService.getAll<Ad[]>("publications").subscribe((response) => {
      this.ads = response;
    });
  }

  public search(event) {
    this.txtToSearch = +event.detail.value;
  }
}
