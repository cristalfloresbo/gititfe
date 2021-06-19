import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";

import { SearchAdByWorkareaComponent } from "./search-ad-by-workarea.component";

describe("SearchAdByWorkareaComponent", () => {
  let component: SearchAdByWorkareaComponent;
  let fixture: ComponentFixture<SearchAdByWorkareaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchAdByWorkareaComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchAdByWorkareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
