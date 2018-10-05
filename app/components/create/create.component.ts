import { Component, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import * as applicationSettings from 'application-settings';
import { RouterExtensions } from 'nativescript-angular/router';
import { fromFile, fromResource, fromBase64, fromAsset } from 'tns-core-modules/image-source';
import { Folder, path, knownFolders } from 'tns-core-modules/file-system';
import { ImageAsset } from 'tns-core-modules/image-asset/image-asset';
import { takePicture, requestPermissions, isAvailable } from 'nativescript-camera';
import * as Camera from 'nativescript-camera';
import { Couchbase } from 'nativescript-couchbase';
import * as ImageSource from 'image-source';
import { Page } from 'ui/page';

@Component({
  selector: 'create',
  templateUrl: './components/create/create.component.html'
})
export class CreateComponent implements OnDestroy{
  location: Location;
  firstname: string;
  lastname: string;
  public imageTaken: ImageAsset;
  public saveToGallery: boolean = false;
  public keepAspectRatio: boolean = true;
  public width: number = 300;
  public height: number = 300;
  database: any;
  images: any;
  constructor(private page:Page,location: Location, private routerExtensions: RouterExtensions) {
    page.actionBarHidden = false;
    this.location = location;
    this.firstname = '';
    this.lastname = '';
    this.onCheckForCamera();
    this.onRequestPermissions();
    this.database = new Couchbase('image-database');
    this.database.createView('images', '1', function(document, emitter) {
      if (document.type && document.type == 'image') {
        emitter.emit(document._id, document);
      }
    });
    this.images = [];
  }

  save() {
    console.log('save ====================>');
    if (this.firstname != '' && this.lastname != '') {
      var people: Array<Object> = JSON.parse(applicationSettings.getString('people', '[]'));
      people.push({ firstname: this.firstname, lastname: this.lastname });
      // console.log('people', people);
      applicationSettings.setString('people', JSON.stringify(people));
      let update = JSON.parse(applicationSettings.getString('people', '[]'));
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

    if (this.firstname != '' && this.lastname != '') {
      takePicture(options)
        .then(imageAsset => {
          this.imageTaken = imageAsset;
          // console.log('Size: ' + imageAsset.options.width + 'x' + imageAsset.options.height);
          let base64;
          fromAsset(imageAsset).then(res => {
            var myImageSource = res;
            base64 = myImageSource.toBase64String('jpeg', 100);
            // console.log(base64);
            this.database.createDocument({
              type: 'image',
              image: base64,
              timestamp: new Date().getTime(),
              firstname: this.firstname,
              lastname: this.lastname
            });
            this.getPhotoFromDb();
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
    console.log('Is camera hardware available: ' + isCameraAvailable);
  }
  getPhotoFromDb() {
    let rows = this.database.executeQuery('images');
    for (let i = 0; i < rows.length; i++) {
      this.images.push(ImageSource.fromBase64(rows[i].image));
    }
    console.log('this.images', this.images);
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.page.actionBarHidden = true;
  }
}
