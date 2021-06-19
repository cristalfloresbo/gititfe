import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";

import { SearchAdByFeeComponent } from "./search-ad-by-fee.component";

describe("SearchAdByFeeComponent", () => {
  let component: SearchAdByFeeComponent;
  let fixture: ComponentFixture<SearchAdByFeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchAdByFeeComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchAdByFeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
