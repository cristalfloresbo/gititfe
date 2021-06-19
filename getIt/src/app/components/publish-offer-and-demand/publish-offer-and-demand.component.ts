import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ApiService } from "src/app/services/api.service";
import { ShowAlertMessage } from "src/app/helpers/showAlertMessage";
import { Publication } from "src/app/models/publication.model";
import { WorkArea } from "src/app/models/workArea.model";

@Component({
  selector: "app-publish-offer-and-demand",
  templateUrl: "./publish-offer-and-demand.component.html",
  styleUrls: ["./publish-offer-and-demand.component.scss"],
})
export class PublishOfferAndDemandComponent implements OnInit {
  // @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  public publicationForm: FormGroup;
  public workareas: WorkArea[] = [];
  private publication: Publication;
  private USER_ID = 1;
  private showMessage = new ShowAlertMessage();

  constructor(
    public formBuilder: FormBuilder,
    private apiService: ApiService
  ) {}

  public ngOnInit() {
    this.createPublicationForm();
    this.loadWorkAreas();
  }

  public async loadWorkAreas() {
    await this.apiService
      .getAll<WorkArea[]>("workareas")
      .subscribe((response) => {
        this.workareas = response;
      });
  }

  public async savePublication() {
    this.publication = this.publicationForm.value as Publication;
    this.publication.userId = this.USER_ID;
    await this.apiService
      .post(`/publishing`, this.publication)
      .subscribe((results) => {
        this.showMessage.showSuccessAlert(
          `publication with id: ${results} registered successfully!`
        );
      });
  }

  private createPublicationForm() {
    this.publicationForm = this.formBuilder.group({
      typePublishing: ["", [Validators.required]],
      workAreaId: ["", [Validators.required]],
      tariff: ["", [Validators.pattern("^[0-9]*$"), Validators.min(1)]],
      address: ["", [Validators.maxLength(50), Validators.minLength(10)]],
      timeRequiredOrOffered: ["", [Validators.pattern("^[0-9]+$")]],
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

  private cancel(): void {
    this.showMessage.showCancelAlert(
      "¿Esta seguro que no desea registrar la publicacion?",
      ""
    );
  }
}
