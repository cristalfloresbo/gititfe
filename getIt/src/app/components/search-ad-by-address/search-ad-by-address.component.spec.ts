import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";

import { SearchAdByAddressComponent } from "./search-ad-by-address.component";

describe("SearchAdByAddressComponent", () => {
  let component: SearchAdByAddressComponent;
  let fixture: ComponentFixture<SearchAdByAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchAdByAddressComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchAdByAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
