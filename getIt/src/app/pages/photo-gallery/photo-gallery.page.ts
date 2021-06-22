import { Component } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { PhotoService } from '../../services/photo.service';
import { UserPhoto } from "src/app/models/userPhoto.model";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ApiService } from '../../services/api.service';
import { IPhotoGallery } from '../../models/photoGallery.model';
import { ShowAlertMessage } from "../../helpers/showAlertMessage";
import { generateUUID } from "../../helpers/uuid";
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-photo-gallery',
  templateUrl: 'photo-gallery.page.html',
  styleUrls: ['photo-gallery.page.scss']
})

export class PhotoGalleryPage {
  public userId;
  public postForm: FormGroup;
  private photoGallery: IPhotoGallery = {
	image: "",
	description: "",
	postId: "",
	userId: 0
  };  
  private showMessage = new ShowAlertMessage();

  constructor(
	  public photoService: PhotoService,
	  public actionSheetController: ActionSheetController,
	  public formBuilder: FormBuilder,
	  public apiService: ApiService,
	  private router: Router, 
	  private route: ActivatedRoute
	) {}

  async ngOnInit() {
	this.createPostForm();
  this.userId = this.route.snapshot.params.id;
	await this.photoService.loadSaved();
  }

  public async showActionSheet(photo: UserPhoto, position: number) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Fotos',
      buttons: [{
        text: 'Borrar',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.photoService.deletePicture(photo, position);
        }
      }, {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {}
      }]
    });
    await actionSheet.present();
  }

  public async save() {
	const photos = [...this.photoService.photos];
	if (photos.length > 0) {
		const description = this.postForm.value.description;
		const postId = generateUUID();
		if (photos.length <= 5) {
			photos.forEach((photo) => {
				this.photoGallery.description = description;
				this.photoGallery.userId = this.route.snapshot.params.id;
				this.photoGallery.postId = postId;
				this.photoGallery.image = photo.webviewPath;
				this.apiService.post("photo-gallery", this.photoGallery)
				.subscribe((response) => {
					this.showMessage.showSuccessAlert(
						"Publicación registrada exitosamente"
					);
				});
				this.deletePhotoToGallery(photo, 0);
			});
			this.clearPostForm();
		} else {
			this.showMessage.showWarningAlert(
				"La cantidad máxima de imagenes por publicacion es: 5"
			);
		}
	} else {
		this.showMessage.showWarningAlert(
			"La cantidad minima de imagenes por publicacion es: 1"
		);
	}
  }

  public isInvalid(formControlName: string) {
    const control = this.postForm.controls[formControlName];
    return !control.valid && (control.dirty || control.touched);
  }

  public hasErrorControl(formControlName, errorType) {
    return this.postForm.controls[formControlName].errors[errorType];
  }

  public cancel(): void {
    this.showMessage.showCancelAlert(
      "¿Esta seguro que no desea registrar la publicación?",
      ""
    );
  }

  private createPostForm() {
    this.postForm = this.formBuilder.group({
      description: [
        "",
        [
          Validators.required,
          Validators.maxLength(250),
          Validators.minLength(10),
        ],
      ],
    });
  }

  private clearPostForm() {
	  this.postForm.controls.description.setValue("");
  }

  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }

  deletePhotoToGallery(photo: UserPhoto, position: number) {
    this.photoService.deletePicture(photo, position);
  }
}
