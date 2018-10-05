"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var observable_array_1 = require("tns-core-modules/data/observable-array/observable-array");
var page_1 = require("ui/page");
// import { android } from 'tns-core-modules/application/application';
var view = require('ui/core/view');
var LoginComponent = /** @class */ (function () {
    function LoginComponent(http, page) {
        this.http = http;
        this.page = page;
        this.api_key = '42177386c6161d57c1383bb25ddf1bc2';
        this.images = new observable_array_1.ObservableArray([]);
        /*  this.images.push({
          img: 'https://farm2.staticflickr.com/1972/31238543938_eaab6a6c5b.jpg'
        }); */
    }
    LoginComponent.prototype.ngOnInit = function () {
        // this.page.bindingContext = this.images;
        var _this = this;
        this.http
            .get('https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' +
            this.api_key +
            '&text=hello&format=json&nojsoncallback=1&per_page=5', { responseType: 'json' })
            .subscribe(function (r) {
            var imgUrl = '';
            var photoList = r['photos'].photo;
            console.log('photoList', photoList);
            for (var i = 0; i < photoList.length; i++) {
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
                _this.images.push({
                    img: imgUrl
                });
            }
            _this.page.bindingContext = _this.images;
            // const androidPkg = android;
            // let card = this.page.getViewById('sh');
            // console.log('card', card);
            // // let color = androidPkg.graphics.Color.parseColor("#7f7f7f");
            // // console.log('color', color)
            // card.nativeView.setShadowLayer(5, 0.1, 1, '#7f7f7f');
        }, function (e) {
            console.log(e);
        });
    };
    LoginComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
        //Add 'implements AfterViewInit' to the class.
        setTimeout(function () {
            var androidPkg = android;
            var card = _this.ref.nativeElement;
            card.width = '200';
            _this.setLabelShadow(_this.page, "balance");
        }, 5000);
    };
    LoginComponent.prototype.setLabelShadow = function (page, labelId) {
        var label = page.getViewById(labelId);
        var radius = 4;
        var xOffset = 1;
        var yOffset = 0.2;
        var color = android.graphics.Color.parseColor("#7f7f7f");
        console.log('color', color);
        // call native setShadowLayer method
        label.nativeView.setShadowLayer(radius, xOffset, yOffset, color);
    };
    __decorate([
        core_1.ViewChild('ref'),
        __metadata("design:type", core_1.ElementRef)
    ], LoginComponent.prototype, "ref", void 0);
    LoginComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.scss']
        }),
        __metadata("design:paramtypes", [http_1.HttpClient, page_1.Page])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXdGO0FBQ3hGLDZDQUFrRDtBQUNsRCw0RkFBMEY7QUFDMUYsZ0NBQStCO0FBQy9CLHNFQUFzRTtBQUN0RSxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUM7QUFRbkM7SUFLRSx3QkFBb0IsSUFBZ0IsRUFBVSxJQUFVO1FBQXBDLFNBQUksR0FBSixJQUFJLENBQVk7UUFBVSxTQUFJLEdBQUosSUFBSSxDQUFNO1FBSnhELFlBQU8sR0FBRyxrQ0FBa0MsQ0FBQztRQUM3QyxXQUFNLEdBQUcsSUFBSSxrQ0FBZSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBSS9COztjQUVNO0lBQ1IsQ0FBQztJQUVELGlDQUFRLEdBQVI7UUFDRSwwQ0FBMEM7UUFENUMsaUJBK0NDO1FBNUNDLElBQUksQ0FBQyxJQUFJO2FBQ04sR0FBRyxDQUNGLDRFQUE0RTtZQUMxRSxJQUFJLENBQUMsT0FBTztZQUNaLHFEQUFxRCxFQUN2RCxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsQ0FDekI7YUFDQSxTQUFTLENBQ1IsVUFBQSxDQUFDO1lBQ0MsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO1lBRWhCLElBQUksU0FBUyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFLLENBQUM7WUFDbEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFFcEMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7Z0JBQzFDLE1BQU07b0JBQ0osY0FBYzt3QkFDZCxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSTt3QkFDakIsb0JBQW9CO3dCQUNwQixTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTTt3QkFDbkIsR0FBRzt3QkFDSCxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTt3QkFDZixHQUFHO3dCQUNILFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNO3dCQUNuQixNQUFNLENBQUM7Z0JBQ1QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7Z0JBRTlCLEtBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO29CQUNmLEdBQUcsRUFBRSxNQUFNO2lCQUNaLENBQUMsQ0FBQztZQUNMLENBQUM7WUFDRCxLQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFJLENBQUMsTUFBTSxDQUFDO1lBRXZDLDhCQUE4QjtZQUM5QiwwQ0FBMEM7WUFDMUMsNkJBQTZCO1lBQzdCLGtFQUFrRTtZQUNsRSxpQ0FBaUM7WUFDakMsd0RBQXdEO1FBQzFELENBQUMsRUFDRCxVQUFTLENBQUM7WUFDUixPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2pCLENBQUMsQ0FDRixDQUFDO0lBQ04sQ0FBQztJQUNELHdDQUFlLEdBQWY7UUFBQSxpQkFVQztRQVRDLDZHQUE2RztRQUM3Ryw4Q0FBOEM7UUFDOUMsVUFBVSxDQUFDO1lBQ1QsSUFBTSxVQUFVLEdBQUcsT0FBTyxDQUFDO1lBQzNCLElBQUksSUFBSSxHQUFHLEtBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDO1lBRWxDLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1lBQ25CLEtBQUksQ0FBQyxjQUFjLENBQUMsS0FBSSxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztRQUM1QyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDWCxDQUFDO0lBRUQsdUNBQWMsR0FBZCxVQUFlLElBQVMsRUFBRSxPQUFlO1FBQ3ZDLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDdEMsSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQ2YsSUFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFDO1FBQ2hCLElBQUksT0FBTyxHQUFHLEdBQUcsQ0FBQztRQUNsQixJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDekQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUE7UUFFM0Isb0NBQW9DO1FBQ3BDLEtBQUssQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3JFLENBQUM7SUE3RUM7UUFEQyxnQkFBUyxDQUFDLEtBQUssQ0FBQztrQ0FDWixpQkFBVTsrQ0FBQztJQUpMLGNBQWM7UUFOMUIsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsV0FBVztZQUNyQixXQUFXLEVBQUUsd0JBQXdCO1lBQ3JDLFNBQVMsRUFBRSxDQUFDLHdCQUF3QixDQUFDO1NBQ3RDLENBQUM7eUNBTTBCLGlCQUFVLEVBQWdCLFdBQUk7T0FMN0MsY0FBYyxDQWtGMUI7SUFBRCxxQkFBQztDQUFBLEFBbEZELElBa0ZDO0FBbEZZLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIEFmdGVyVmlld0luaXQsIFZpZXdDaGlsZCwgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IE9ic2VydmFibGVBcnJheSB9IGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvZGF0YS9vYnNlcnZhYmxlLWFycmF5L29ic2VydmFibGUtYXJyYXknO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gJ3VpL3BhZ2UnO1xuLy8gaW1wb3J0IHsgYW5kcm9pZCB9IGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvYXBwbGljYXRpb24vYXBwbGljYXRpb24nO1xudmFyIHZpZXcgPSByZXF1aXJlKCd1aS9jb3JlL3ZpZXcnKTtcbmRlY2xhcmUgdmFyIGFuZHJvaWQ7XG5AQ29tcG9uZW50KHtcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgc2VsZWN0b3I6ICdhcHAtbG9naW4nLFxuICB0ZW1wbGF0ZVVybDogJy4vbG9naW4uY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9sb2dpbi5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIExvZ2luQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0IHtcbiAgYXBpX2tleSA9ICc0MjE3NzM4NmM2MTYxZDU3YzEzODNiYjI1ZGRmMWJjMic7XG4gIGltYWdlcyA9IG5ldyBPYnNlcnZhYmxlQXJyYXkoW10pO1xuICBAVmlld0NoaWxkKCdyZWYnKVxuICByZWY6IEVsZW1lbnRSZWY7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cENsaWVudCwgcHJpdmF0ZSBwYWdlOiBQYWdlKSB7XG4gICAgLyogIHRoaXMuaW1hZ2VzLnB1c2goe1xuICAgICAgaW1nOiAnaHR0cHM6Ly9mYXJtMi5zdGF0aWNmbGlja3IuY29tLzE5NzIvMzEyMzg1NDM5MzhfZWFhYjZhNmM1Yi5qcGcnXG4gICAgfSk7ICovXG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICAvLyB0aGlzLnBhZ2UuYmluZGluZ0NvbnRleHQgPSB0aGlzLmltYWdlcztcblxuICAgIHRoaXMuaHR0cFxuICAgICAgLmdldChcbiAgICAgICAgJ2h0dHBzOi8vYXBpLmZsaWNrci5jb20vc2VydmljZXMvcmVzdC8/bWV0aG9kPWZsaWNrci5waG90b3Muc2VhcmNoJmFwaV9rZXk9JyArXG4gICAgICAgICAgdGhpcy5hcGlfa2V5ICtcbiAgICAgICAgICAnJnRleHQ9aGVsbG8mZm9ybWF0PWpzb24mbm9qc29uY2FsbGJhY2s9MSZwZXJfcGFnZT01JyxcbiAgICAgICAgeyByZXNwb25zZVR5cGU6ICdqc29uJyB9XG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKFxuICAgICAgICByID0+IHtcbiAgICAgICAgICBsZXQgaW1nVXJsID0gJyc7XG5cbiAgICAgICAgICBsZXQgcGhvdG9MaXN0ID0gclsncGhvdG9zJ10ucGhvdG87XG4gICAgICAgICAgY29uc29sZS5sb2coJ3Bob3RvTGlzdCcsIHBob3RvTGlzdCk7XG5cbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBob3RvTGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaW1nVXJsID1cbiAgICAgICAgICAgICAgJ2h0dHBzOi8vZmFybScgK1xuICAgICAgICAgICAgICBwaG90b0xpc3RbaV0uZmFybSArXG4gICAgICAgICAgICAgICcuc3RhdGljZmxpY2tyLmNvbS8nICtcbiAgICAgICAgICAgICAgcGhvdG9MaXN0W2ldLnNlcnZlciArXG4gICAgICAgICAgICAgICcvJyArXG4gICAgICAgICAgICAgIHBob3RvTGlzdFtpXS5pZCArXG4gICAgICAgICAgICAgICdfJyArXG4gICAgICAgICAgICAgIHBob3RvTGlzdFtpXS5zZWNyZXQgK1xuICAgICAgICAgICAgICAnLmpwZyc7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnaW1nVXJsJywgaW1nVXJsKTtcblxuICAgICAgICAgICAgdGhpcy5pbWFnZXMucHVzaCh7XG4gICAgICAgICAgICAgIGltZzogaW1nVXJsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5wYWdlLmJpbmRpbmdDb250ZXh0ID0gdGhpcy5pbWFnZXM7XG5cbiAgICAgICAgICAvLyBjb25zdCBhbmRyb2lkUGtnID0gYW5kcm9pZDtcbiAgICAgICAgICAvLyBsZXQgY2FyZCA9IHRoaXMucGFnZS5nZXRWaWV3QnlJZCgnc2gnKTtcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZygnY2FyZCcsIGNhcmQpO1xuICAgICAgICAgIC8vIC8vIGxldCBjb2xvciA9IGFuZHJvaWRQa2cuZ3JhcGhpY3MuQ29sb3IucGFyc2VDb2xvcihcIiM3ZjdmN2ZcIik7XG4gICAgICAgICAgLy8gLy8gY29uc29sZS5sb2coJ2NvbG9yJywgY29sb3IpXG4gICAgICAgICAgLy8gY2FyZC5uYXRpdmVWaWV3LnNldFNoYWRvd0xheWVyKDUsIDAuMSwgMSwgJyM3ZjdmN2YnKTtcbiAgICAgICAgfSxcbiAgICAgICAgZnVuY3Rpb24oZSkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgICB9XG4gICAgICApO1xuICB9XG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICAvL0NhbGxlZCBhZnRlciBuZ0FmdGVyQ29udGVudEluaXQgd2hlbiB0aGUgY29tcG9uZW50J3MgdmlldyBoYXMgYmVlbiBpbml0aWFsaXplZC4gQXBwbGllcyB0byBjb21wb25lbnRzIG9ubHkuXG4gICAgLy9BZGQgJ2ltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCcgdG8gdGhlIGNsYXNzLlxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgY29uc3QgYW5kcm9pZFBrZyA9IGFuZHJvaWQ7XG4gICAgICBsZXQgY2FyZCA9IHRoaXMucmVmLm5hdGl2ZUVsZW1lbnQ7XG5cbiAgICAgIGNhcmQud2lkdGggPSAnMjAwJztcbiAgICAgIHRoaXMuc2V0TGFiZWxTaGFkb3codGhpcy5wYWdlLCBcImJhbGFuY2VcIik7XG4gICAgfSwgNTAwMCk7XG4gIH1cblxuICBzZXRMYWJlbFNoYWRvdyhwYWdlOiBhbnksIGxhYmVsSWQ6IHN0cmluZykge1xuICAgIHZhciBsYWJlbCA9IHBhZ2UuZ2V0Vmlld0J5SWQobGFiZWxJZCk7XG4gICAgdmFyIHJhZGl1cyA9IDQ7XG4gICAgdmFyIHhPZmZzZXQgPSAxO1xuICAgIHZhciB5T2Zmc2V0ID0gMC4yO1xuICAgIHZhciBjb2xvciA9IGFuZHJvaWQuZ3JhcGhpY3MuQ29sb3IucGFyc2VDb2xvcihcIiM3ZjdmN2ZcIik7XG4gICAgY29uc29sZS5sb2coJ2NvbG9yJywgY29sb3IpXG5cbiAgICAvLyBjYWxsIG5hdGl2ZSBzZXRTaGFkb3dMYXllciBtZXRob2RcbiAgICBsYWJlbC5uYXRpdmVWaWV3LnNldFNoYWRvd0xheWVyKHJhZGl1cywgeE9mZnNldCwgeU9mZnNldCwgY29sb3IpO1xufVxufVxuIl19