import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { RegisterComponent } from "./components/register/register.component";
import { LoginUserComponent } from "./components/login-user/login-user.component";

const routes: Routes = [
  {
    path: "register",
    component: RegisterComponent,
  },
  {
    path: "login-user",
    component: LoginUserComponent,
  },
  {
    path: "",
    redirectTo: "login-user",
    pathMatch: "full",
  },
  {
    path: 'getit',
    loadChildren: () => import('./pages/tab/tab.module').then( m => m.TabPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
