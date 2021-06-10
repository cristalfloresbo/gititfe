import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { PublishOfferAndDemandPageRoutingModule } from "./publish-offer-and-demand-routing.module";

import { PublishOfferAndDemandPage } from "./publish-offer-and-demand.page";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    PublishOfferAndDemandPageRoutingModule,
  ],
  declarations: [PublishOfferAndDemandPage],
})
export class PublishOfferAndDemandPageModule {}
