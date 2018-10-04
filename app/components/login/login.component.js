"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var observable_array_1 = require("tns-core-modules/data/observable-array/observable-array");
var page_1 = require("ui/page");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(http, page) {
        this.http = http;
        this.page = page;
        this.api_key = '42177386c6161d57c1383bb25ddf1bc2';
        this.images = new observable_array_1.ObservableArray([]);
        this.page = new page_1.Page();
    }
    LoginComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.page.bindingContext = this.images;
        this.http
            .get('https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' +
            this.api_key +
            '&text=hello&format=json&nojsoncallback=1&per_page=5', { responseType: 'json' })
            .subscribe(function (r) {
            var imgUrl = '';
            var photoList = r['photos'].photo;
            for (var i = 0; i < photoList.length; i++) {
                imgUrl = 'https://farm' + photoList[i].farm + '.staticflickr.com/' + photoList[i].server + '/' + photoList[i].id + '_' + photoList[i].secret + '.jpg';
                _this.images.push({
                    img: imgUrl
                });
            }
        }, function (e) {
            console.log(e);
        });
    };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBQ2xELDZDQUFrRDtBQUNsRCw0RkFBMEY7QUFDMUYsZ0NBQStCO0FBUS9CO0lBR0Usd0JBQW9CLElBQWdCLEVBQVUsSUFBVTtRQUFwQyxTQUFJLEdBQUosSUFBSSxDQUFZO1FBQVUsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUZ4RCxZQUFPLEdBQUcsa0NBQWtDLENBQUM7UUFDN0MsV0FBTSxHQUFHLElBQUksa0NBQWUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUUvQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksV0FBSSxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUVELGlDQUFRLEdBQVI7UUFBQSxpQkE0QkM7UUEzQkMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUN2QyxJQUFJLENBQUMsSUFBSTthQUNOLEdBQUcsQ0FDRiw0RUFBNEU7WUFDMUUsSUFBSSxDQUFDLE9BQU87WUFDWixxREFBcUQsRUFDdkQsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLENBQ3pCO2FBQ0EsU0FBUyxDQUNSLFVBQUMsQ0FBQztZQUNBLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQztZQUVoQixJQUFJLFNBQVMsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsS0FBSyxDQUFDO1lBRWxDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO2dCQUMxQyxNQUFNLEdBQUcsY0FBYyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUUsb0JBQW9CLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxHQUFHLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxHQUFHLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRSxNQUFNLENBQUM7Z0JBRXBKLEtBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO29CQUNmLEdBQUcsRUFBRSxNQUFNO2lCQUNaLENBQUMsQ0FBQztZQUNMLENBQUM7UUFFSCxDQUFDLEVBQ0QsVUFBUyxDQUFDO1lBQ1IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNqQixDQUFDLENBQ0YsQ0FBQztJQUNOLENBQUM7SUFuQ1UsY0FBYztRQU4xQixnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxXQUFXO1lBQ3JCLFdBQVcsRUFBRSx3QkFBd0I7WUFDckMsU0FBUyxFQUFFLENBQUMsd0JBQXdCLENBQUM7U0FDdEMsQ0FBQzt5Q0FJMEIsaUJBQVUsRUFBZ0IsV0FBSTtPQUg3QyxjQUFjLENBb0MxQjtJQUFELHFCQUFDO0NBQUEsQUFwQ0QsSUFvQ0M7QUFwQ1ksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IE9ic2VydmFibGVBcnJheSB9IGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvZGF0YS9vYnNlcnZhYmxlLWFycmF5L29ic2VydmFibGUtYXJyYXknO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gJ3VpL3BhZ2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgc2VsZWN0b3I6ICdhcHAtbG9naW4nLFxuICB0ZW1wbGF0ZVVybDogJy4vbG9naW4uY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9sb2dpbi5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIExvZ2luQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgYXBpX2tleSA9ICc0MjE3NzM4NmM2MTYxZDU3YzEzODNiYjI1ZGRmMWJjMic7XG4gIGltYWdlcyA9IG5ldyBPYnNlcnZhYmxlQXJyYXkoW10pO1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQsIHByaXZhdGUgcGFnZTogUGFnZSkge1xuICAgIHRoaXMucGFnZSA9IG5ldyBQYWdlKCk7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnBhZ2UuYmluZGluZ0NvbnRleHQgPSB0aGlzLmltYWdlcztcbiAgICB0aGlzLmh0dHBcbiAgICAgIC5nZXQoXG4gICAgICAgICdodHRwczovL2FwaS5mbGlja3IuY29tL3NlcnZpY2VzL3Jlc3QvP21ldGhvZD1mbGlja3IucGhvdG9zLnNlYXJjaCZhcGlfa2V5PScgK1xuICAgICAgICAgIHRoaXMuYXBpX2tleSArXG4gICAgICAgICAgJyZ0ZXh0PWhlbGxvJmZvcm1hdD1qc29uJm5vanNvbmNhbGxiYWNrPTEmcGVyX3BhZ2U9NScsXG4gICAgICAgIHsgcmVzcG9uc2VUeXBlOiAnanNvbicgfVxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgKHIpPT4ge1xuICAgICAgICAgIGxldCBpbWdVcmwgPSAnJztcblxuICAgICAgICAgIGxldCBwaG90b0xpc3QgPSByWydwaG90b3MnXS5waG90bztcblxuICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGhvdG9MaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpbWdVcmwgPSAnaHR0cHM6Ly9mYXJtJyArIHBob3RvTGlzdFtpXS5mYXJtICsnLnN0YXRpY2ZsaWNrci5jb20vJyArIHBob3RvTGlzdFtpXS5zZXJ2ZXIgKyAnLycgKyBwaG90b0xpc3RbaV0uaWQgKyAnXycgKyBwaG90b0xpc3RbaV0uc2VjcmV0ICsnLmpwZyc7XG5cbiAgICAgICAgICAgIHRoaXMuaW1hZ2VzLnB1c2goe1xuICAgICAgICAgICAgICBpbWc6IGltZ1VybFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIFxuICAgICAgICB9LFxuICAgICAgICBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgICAgIH1cbiAgICAgICk7XG4gIH1cbn1cbiJdfQ==