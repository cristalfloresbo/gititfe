import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TabPage } from "./tab.page";

const routes: Routes = [
  {
    path: "",
    component: TabPage,
    children: [
      {
        path: "view-profile/:id",
        loadChildren: () =>
          import("../../pages/view-profile/view-profile.module").then(
            (m) => m.ViewProfilePageModule
          ),
      },
      {
        path: "publish",
        // tslint:disable-next-line:max-line-length
        loadChildren: () =>
          import(
            "../../pages/publish-offer-and-demand/publish-offer-and-demand.module"
          ).then((m) => m.PublishOfferAndDemandPageModule),
      },
      {
        path: "home",
        loadChildren: () =>
          import("../../pages/home/home.module").then((m) => m.HomePageModule),
      },
      {
        path: "search",
        loadChildren: () =>
          import("../../pages/search/search.module").then(
            (m) => m.SearchPageModule
          ),
      },
	  {
        path: 'tab2',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../../pages/tab2/tab2.module').then(m => m.Tab2PageModule)
          }
        ]
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabPageRoutingModule {}

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
  })
  export class TabsPageRoutingModule {}
