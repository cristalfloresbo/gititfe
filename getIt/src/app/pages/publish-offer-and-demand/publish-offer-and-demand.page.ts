import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ApiService } from "src/app/services/api.service";
import { ShowAlertMessage } from "src/app/helpers/showAlertMessage";
import { Publication } from "src/app/models/publication.model";
import { WorkArea } from "src/app/models/workArea.model";
import { UserPhoto, PhotoService } from '../../services/photo.service';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: "app-publish-offer-and-demand",
  templateUrl: "./publish-offer-and-demand.page.html",
  styleUrls: ["./publish-offer-and-demand.page.scss"],
})
export class PublishOfferAndDemandPage implements OnInit {
  public publicationForm: FormGroup;
  public workareas: WorkArea[] = [];
  private publication: Publication;
  private USER_ID = 1;
  private showMessage = new ShowAlertMessage();

  constructor(
    public formBuilder: FormBuilder,
    private apiService: ApiService,
    private route: Router,	
	public photoService: PhotoService,
	public actionSheetController: ActionSheetController,
  ) {}

  public async ngOnInit() {
    this.createPublicationForm();
    this.loadWorkAreas();
	await this.photoService.loadSaved();
  }

  public async loadWorkAreas() {
    await this.apiService
      .getAll<WorkArea[]>("workareas")
      .subscribe((response) => {
        this.workareas = response;
      });
  }

  public async showActionSheet(photo: UserPhoto, position: number) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Photos',
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

  public save() {
    this.publication = this.publicationForm.value as Publication;
    this.publication.userId = this.USER_ID;
	this.publication.image = this.photoService.photos[0].webviewPath;
    this.apiService
      .post(`/publication`, this.publication)
      .subscribe((results) => {
        this.showMessage.showSuccessAlert(
          "Publicación registrada exitosamente"
        );
      });
  }

  public isInvalid(formControlName: string) {
    const control = this.publicationForm.controls[formControlName];
    return !control.valid && (control.dirty || control.touched);
  }

  public hasErrorControl(formControlName, errorType) {
    return this.publicationForm.controls[formControlName].errors[errorType];
  }

  public cancel(): void {
    this.showMessage.showCancelAlert(
      "¿Esta seguro que no desea registrar la publicación?",
      ""
    );
  }

  private createPublicationForm() {
    this.publicationForm = this.formBuilder.group({
      typePublication: ["", [Validators.required]],
      workAreaId: ["", [Validators.required]],
      address: ["", [Validators.maxLength(50), Validators.minLength(10)]],
      timeRequiredOrOffered: ["", [Validators.min(1)]],
      tariff: ["", [Validators.min(1)]],
      description: [
        "",
        [
          Validators.required,
          Validators.maxLength(100),
          Validators.minLength(10),
        ],
      ],
    });
  }
}
