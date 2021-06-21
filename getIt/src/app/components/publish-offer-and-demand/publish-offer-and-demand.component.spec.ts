import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";

import { PublishOfferAndDemandComponent } from "./publish-offer-and-demand.component";

describe("PublishOfferAndDemandComponent", () => {
  let component: PublishOfferAndDemandComponent;
  let fixture: ComponentFixture<PublishOfferAndDemandComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [PublishOfferAndDemandComponent],
        imports: [IonicModule.forRoot()],
      }).compileComponents();

      fixture = TestBed.createComponent(PublishOfferAndDemandComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
