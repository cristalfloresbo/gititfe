import { Component, OnInit } from "@angular/core";
import { ApiService } from "src/app/services/api.service";
import { Users } from "../../models/user.model";

@Component({
  selector: "app-search-user-by-email",
  styleUrls: ["./search-user-by-email.component.scss"],
  templateUrl: "./search-user-by-email.component.html",
})
export class SearchUserByEmailComponent implements OnInit {
  public users: Users[] = [];
  public txtToSearch: String = "";

  constructor(private apiService: ApiService) {}

  public ngOnInit() {
    this.loadUsers();
  }

  public async loadUsers() {
    await this.apiService.getAll<Users[]>("users").subscribe((response) => {
      this.users = response;
    });
  }

  public search(event) {
    this.txtToSearch = event.detail.value;
  }
}
