import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";

import { SearchUserByEmailComponent } from "./search-user-by-email.component";

describe("SearchUserByEmailComponent", () => {
  let component: SearchUserByEmailComponent;
  let fixture: ComponentFixture<SearchUserByEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchUserByEmailComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchUserByEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
