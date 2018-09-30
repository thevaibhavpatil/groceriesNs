import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

import { ItemsComponent } from "./item/items.component";
import { ItemDetailComponent } from "./item/item-detail.component";
import { ListComponent } from "~/components/list/list.component";
import { CreateComponent } from "~/components/create/create.component";

const routes: Routes = [
    // { path: "", redirectTo: "/items", pathMatch: "full" },
    // { path: "items", component: ItemsComponent },
    // { path: "item/:id", component: ItemDetailComponent },
    { path: "", component: ListComponent },
    { path: "create", component: CreateComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }