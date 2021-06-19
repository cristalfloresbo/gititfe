import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";

import { SearchAdByRequiredTimeComponent } from "./search-ad-by-required-time.component";

describe("SearchAdByRequiredTimeComponent", () => {
  let component: SearchAdByRequiredTimeComponent;
  let fixture: ComponentFixture<SearchAdByRequiredTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchAdByRequiredTimeComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchAdByRequiredTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
