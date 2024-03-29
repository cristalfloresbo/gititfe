import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PhotoGalleryPage } from './photo-gallery.page';
import { ExploreContainerComponentModule } from '../../components/explore-container/explore-container.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
	ReactiveFormsModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([{ path: '', component: PhotoGalleryPage }])
  ],
  declarations: [PhotoGalleryPage]
})
export class PhotoGalleryPageModule {}
