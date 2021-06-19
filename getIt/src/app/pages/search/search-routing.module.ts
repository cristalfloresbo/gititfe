import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SearchAdByAddressComponent } from "src/app/components/search-ad-by-address/search-ad-by-address.component";
import { SearchAdByFeeComponent } from "src/app/components/search-ad-by-fee/search-ad-by-fee.component";
import { SearchAdByRequiredTimeComponent } from "src/app/components/search-ad-by-required-time/search-ad-by-required-time.component";
import { SearchAdByWorkareaComponent } from "src/app/components/search-ad-by-workarea/search-ad-by-workarea.component";
import { SearchUserByEmailComponent } from "src/app/components/search-user-by-email/search-user-by-email.component";

import { SearchPage } from "./search.page";

const routes: Routes = [
  {
    path: "",
    component: SearchPage,
  },
  {
    path: "by-work-area",
    component: SearchAdByWorkareaComponent,
  },
  {
    path: "by-address",
    component: SearchAdByAddressComponent,
  },
  {
    path: "by-fee",
    component: SearchAdByFeeComponent,
  },
  {
    path: "by-required-time",
    component: SearchAdByRequiredTimeComponent,
  },
  {
    path: "by-email",
    component: SearchUserByEmailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchPageRoutingModule {}
