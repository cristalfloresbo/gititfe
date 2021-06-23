import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-tab",
  templateUrl: "./tab.page.html",
  styleUrls: ["./tab.page.scss"],
})
export class TabPage implements OnInit {
  public currentUserId: number;
  constructor(private userService: UserService) {}

  public ngOnInit() {
    this.currentUserId = this.userService.getCurrentUser("user")
  }
}
