import { NgModule } from '@angular/core';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { Routes } from '@angular/router';

import { ItemsComponent } from './item/items.component';
import { ItemDetailComponent } from './item/item-detail.component';
import { ListComponent } from '~/components/list/list.component';
import { CreateComponent } from '~/components/create/create.component';
import { UserListComponent } from '~/user-list/user-list.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  // { path: "", redirectTo: "/items", pathMatch: "full" },
  // { path: "items", component: ItemsComponent },
  // { path: "item/:id", component: ItemDetailComponent },
  {
    path: '',
    component: UserListComponent,
    children: [
      { path: '', component: ListComponent },
      { path: 'create', component: CreateComponent },
      { path: 'login', component: LoginComponent }
    ]
  }
];

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule]
})
export class AppRoutingModule {}
