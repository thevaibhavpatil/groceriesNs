import { Component, OnInit } from '@angular/core';
import {Page} from "ui/page";

@Component({
  moduleId: module.id,
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  constructor(private page: Page) { 
    page.actionBarHidden = true;
  }

  ngOnInit() { }

}
