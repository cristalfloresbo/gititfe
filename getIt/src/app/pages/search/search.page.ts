import { Component } from "@angular/core";
import { Router } from "@angular/router";
import data from "../../helpers/searchOptions";

@Component({
  selector: "app-search",
  styleUrls: ["./search.page.scss"],
  templateUrl: "./search.page.html",
})
export class SearchPage {
  public routes = {
    address: "getit/search/by-address",
    email: "getit/search/by-email",
    fee: "getit/search/by-fee",
    requiredTime: "getit/search/by-required-time",
    workArea: "getit/search/by-work-area",
  };

  public searchOptions = data;
  constructor(private router: Router) {}

  public redirectTo(event: CustomEvent) {
    this.router.navigate([this.routes[event.detail.value]]);
  }
}
