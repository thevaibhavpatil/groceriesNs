import { Component } from "@angular/core";
import { Location } from "@angular/common";
import * as applicationSettings from "application-settings";
import { RouterExtensions } from "nativescript-angular/router";
import {
  ImageSource,
  fromFile,
  fromResource,
  fromBase64,
  fromAsset
} from "tns-core-modules/image-source";
import { Folder, path, knownFolders } from "tns-core-modules/file-system";
import { ImageAsset } from "tns-core-modules/image-asset/image-asset";
import {
  takePicture,
  requestPermissions,
  isAvailable
} from "nativescript-camera";
import * as Camera from "nativescript-camera";

@Component({
  selector: "create",
  templateUrl: "./components/create/create.component.html"
})
export class CreateComponent {
  location: Location;
  firstname: string;
  lastname: string;
  public imageTaken: ImageAsset;
  public saveToGallery: boolean = false;
  public keepAspectRatio: boolean = true;
  public width: number = 300;
  public height: number = 300;
  database: any;
  constructor(location: Location, private routerExtensions: RouterExtensions) {
    this.location = location;
    this.firstname = "";
    this.lastname = "";
    this.onCheckForCamera();
    this.onRequestPermissions();
  }

  save() {
    console.log("save ====================>");
    if (this.firstname != "" && this.lastname != "") {
      var people: Array<Object> = JSON.parse(
        applicationSettings.getString("people", "[]")
      );
      people.push({ firstname: this.firstname, lastname: this.lastname });
      console.log("people", people);
      applicationSettings.setString("people", JSON.stringify(people));
      let update = JSON.parse(applicationSettings.getString("people", "[]"));
      // this.location.back();
      this.routerExtensions.back();
    }
  }
  back() {
    this.routerExtensions.back();
  }

  onTakePhoto() {
    let options = {
      width: this.width,
      height: this.height,
      keepAspectRatio: this.keepAspectRatio,
      saveToGallery: this.saveToGallery
    };

    if (this.firstname != "" && this.lastname != "") {
      takePicture(options)
        .then(imageAsset => {
          this.imageTaken = imageAsset;
          console.log(
            "Size: " +
              imageAsset.options.width +
              "x" +
              imageAsset.options.height
          );
          let base64;
          fromAsset(imageAsset).then(res => {
            var myImageSource = res;
            base64 = myImageSource.toBase64String("jpeg", 100);
            console.log(base64);
            this.database.createDocument({
              type: "image",
              image: base64,
              timestamp: new Date().getTime(),
              firstname: this.firstname,
              lastname: this.lastname
            });
          });

          // this.images.push(picture);
        })
        .catch(err => {
          console.log(err.message);
        });
    }
  }
  // << camera-module-photo-code
  // >> camera-module-perm-code
  onRequestPermissions() {
    requestPermissions();
  }
  // << camera-module-perm-code
  // >> camera-module-avai-code
  onCheckForCamera() {
    let isCameraAvailable = isAvailable();
    console.log("Is camera hardware available: " + isCameraAvailable);
  }
  // << camera-module-avai-code

  // public capture() {
  //     Camera.takePicture({ width: 300, height: 300, keepAspectRatio: true, saveToGallery: false }).then(picture => {
  //         let base64 = picture.toBase64String("png", 70);
  //         this.database.createDocument({
  //             "type": "image",
  //             "image": base64,
  //             "timestamp": (new Date()).getTime()
  //         });
  //         this.images.push(picture);
  //     }, error => {
  //         console.dump(error);
  //     });
  // }
}
