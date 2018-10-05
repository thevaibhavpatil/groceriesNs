import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ObservableArray } from 'tns-core-modules/data/observable-array/observable-array';
import { Page } from 'ui/page';
// import { android } from 'tns-core-modules/application/application';
var view = require('ui/core/view');
declare var android;
@Component({
  moduleId: module.id,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {
  api_key = '42177386c6161d57c1383bb25ddf1bc2';
  images = new ObservableArray([]);
  @ViewChild('ref')
  ref: ElementRef;
  constructor(private http: HttpClient, private page: Page) {
    /*  this.images.push({
      img: 'https://farm2.staticflickr.com/1972/31238543938_eaab6a6c5b.jpg'
    }); */
  }

  ngOnInit() {
    this.page.bindingContext = this.images;

    this.http
      .get(
        'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' +
          this.api_key +
          '&text=hello&format=json&nojsoncallback=1&per_page=5',
        { responseType: 'json' }
      )
      .subscribe(
        r => {
          let imgUrl = '';

          let photoList = r['photos'].photo;
          console.log('photoList', photoList);

          for (let i = 0; i < photoList.length; i++) {
            imgUrl =
              'https://farm' +
              photoList[i].farm +
              '.staticflickr.com/' +
              photoList[i].server +
              '/' +
              photoList[i].id +
              '_' +
              photoList[i].secret +
              '.jpg';
            console.log('imgUrl', imgUrl);

            this.images.push({
              img: imgUrl
            });
          }
          this.page.bindingContext = this.images;

          // const androidPkg = android;
          // let card = this.page.getViewById('sh');
          // console.log('card', card);
          // // let color = androidPkg.graphics.Color.parseColor("#7f7f7f");
          // // console.log('color', color)
          // card.nativeView.setShadowLayer(5, 0.1, 1, '#7f7f7f');
        },
        function(e) {
          console.log(e);
        }
      );
  }
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    
    // setTimeout(() => {
    //   const androidPkg = android;
    //   let card = this.ref.nativeElement;

    //   card.width = '200';
    //   this.setLabelShadow(this.page, "balance");
    // }, 5000);
  }

  setLabelShadow(page: any, labelId: string) {
    var label = page.getViewById(labelId);
    var radius = 4;
    var xOffset = 1;
    var yOffset = 0.2;
    var color = android.graphics.Color.parseColor("#7f7f7f");
    console.log('color', color)

    // call native setShadowLayer method
    label.nativeView.setShadowLayer(radius, xOffset, yOffset, color);
}
}
