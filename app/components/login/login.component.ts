import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ObservableArray } from 'tns-core-modules/data/observable-array/observable-array';
import { Page } from 'ui/page';

@Component({
  moduleId: module.id,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  api_key = '42177386c6161d57c1383bb25ddf1bc2';
  images = new ObservableArray([]);
  constructor(private http: HttpClient, private page: Page) {
    this.page = new Page();
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
        (r)=> {
          let imgUrl = '';

          let photoList = r['photos'].photo;

          for (let i = 0; i < photoList.length; i++) {
            imgUrl = 'https://farm' + photoList[i].farm +'.staticflickr.com/' + photoList[i].server + '/' + photoList[i].id + '_' + photoList[i].secret +'.jpg';

            this.images.push({
              img: imgUrl
            });
          }
          
        },
        function(e) {
          console.log(e);
        }
      );
  }
}
