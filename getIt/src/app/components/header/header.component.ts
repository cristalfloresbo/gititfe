import { Component, OnInit, Input } from '@angular/core';
import { UserService } from "src/app/services/user.service" 
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  styleUrls: ['header.component.scss'],
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  @Input() input:boolean;

  constructor(
	private userService: UserService, private router: Router) {}

  ngOnInit(): void {}

  onLogOut(){
    this.userService.removeCurrentUser("token");
    this.userService.removeCurrentUser("user");
    this.router.navigate(['/login-user']);
  }
}
