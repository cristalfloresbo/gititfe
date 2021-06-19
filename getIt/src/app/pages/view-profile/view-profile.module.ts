import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ViewProfilePageRoutingModule } from './view-profile-routing.module';
import { ViewProfilePage } from './view-profile.page';
import { ViewPublicationComponent } from 'src/app/components/view-publication/view-publication.component';

@NgModule({
  entryComponents: [
    ViewPublicationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewProfilePageRoutingModule
  ],
  declarations: [ViewProfilePage, ViewPublicationComponent]
})
export class ViewProfilePageModule {}
