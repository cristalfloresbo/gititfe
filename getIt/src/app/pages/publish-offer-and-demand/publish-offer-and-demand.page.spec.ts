import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";

import { PublishOfferAndDemandPage } from "./publish-offer-and-demand.page";

describe("PublishOfferAndDemandPage", () => {
  let component: PublishOfferAndDemandPage;
  let fixture: ComponentFixture<PublishOfferAndDemandPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PublishOfferAndDemandPage],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(PublishOfferAndDemandPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
