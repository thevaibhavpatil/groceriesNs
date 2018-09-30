import { Component } from "@angular/core";
import { Location } from "@angular/common";
import { Router } from "@angular/router";
import * as applicationSettings from "application-settings";
import { Couchbase } from "nativescript-couchbase";
import * as ImageSource from "image-source";



@Component({
    selector: 'list',
    templateUrl:'./components/list/list.component.html'
})
export class ListComponent {
    router: Router;
    personList: Array<Object>;
    public database: any;
    public images: Array<any>;

    constructor(router: Router, location: Location ) {
        this.router = router;
        this.personList = JSON.parse(applicationSettings.getString("people", "[]"));
        location.subscribe((path) => {
            this.personList = JSON.parse(applicationSettings.getString("people", "[]"));
        });
        this.database = new Couchbase("image-database");
        this.database.createView("images", "1", function(document, emitter) {
            if(document.type && document.type == "image") {
                emitter.emit(document._id, document);
            }
        });
        this.images = [];
    }
    ngOnInit(): void {
        let rows = this.database.executeQuery("images");
        for(let i = 0; i < rows.length; i++) {
            this.images.push(ImageSource.fromBase64(rows[i].image));
        }
        
    }

    create() {
        this.router.navigate(["/create"]);
    }
    
}