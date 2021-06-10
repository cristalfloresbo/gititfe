import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { SearchAdByAddressComponent } from "src/app/components/search-ad-by-address/search-ad-by-address.component";
import { SearchAdByFeeComponent } from "src/app/components/search-ad-by-fee/search-ad-by-fee.component";
import { SearchAdByRequiredTimeComponent } from "src/app/components/search-ad-by-required-time/search-ad-by-required-time.component";
import { SearchAdByWorkareaComponent } from "src/app/components/search-ad-by-workarea/search-ad-by-workarea.component";
import { SearchUserByEmailComponent } from "src/app/components/search-user-by-email/search-user-by-email.component";
import { PipesModule } from "src/app/pipes/pipes.module";
import { SearchPageRoutingModule } from "./search-routing.module";
import { SearchPage } from "./search.page";

@NgModule({
  declarations: [
    SearchPage,
    SearchUserByEmailComponent,
    SearchAdByWorkareaComponent,
    SearchAdByAddressComponent,
    SearchAdByFeeComponent,
    SearchAdByRequiredTimeComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    SearchPageRoutingModule,
  ],
})
export class SearchPageModule {}
