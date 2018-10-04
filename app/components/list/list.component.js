"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var applicationSettings = require("application-settings");
var nativescript_couchbase_1 = require("nativescript-couchbase");
var ImageSource = require("image-source");
var observable_array_1 = require("tns-core-modules/data/observable-array/observable-array");
var router_2 = require("nativescript-angular/router");
var ListComponent = /** @class */ (function () {
    function ListComponent(router, location, pageRoute) {
        var _this = this;
        this.pageRoute = pageRoute;
        // public images: Array<any>;
        this.images = new observable_array_1.ObservableArray();
        this.imageSrc = new observable_array_1.ObservableArray([]);
        this.router = router;
        this.personList = JSON.parse(applicationSettings.getString("people", "[]"));
        location.subscribe(function (path) {
            _this.personList = JSON.parse(applicationSettings.getString("people", "[]"));
        });
        this.database = new nativescript_couchbase_1.Couchbase("image-database");
        this.database.createView("images", "1", function (document, emitter) {
            if (document.type && document.type == "image") {
                emitter.emit(document._id, document);
            }
        });
        this.images = new observable_array_1.ObservableArray([]);
    }
    ListComponent.prototype.ngOnInit = function () {
        var rows = this.database.executeQuery("images");
        for (var i = 0; i < rows.length; i++) {
            var imageSrc = ImageSource.fromBase64(rows[i].image);
            rows[i]['imageSrc'] = imageSrc;
            console.log(' rows[i][\'imageSrc\']', rows[i]['imageSrc']);
            this.images.push(rows[i]);
        }
    };
    ListComponent.prototype.create = function () {
        this.router.navigate(["/create"]);
    };
    ListComponent.prototype.deleteFromDB = function () {
    };
    ListComponent = __decorate([
        core_1.Component({
            selector: 'list',
            templateUrl: './components/list/list.component.html'
        }),
        __metadata("design:paramtypes", [router_1.Router, common_1.Location, router_2.PageRoute])
    ], ListComponent);
    return ListComponent;
}());
exports.ListComponent = ListComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJsaXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEwQztBQUMxQywwQ0FBMkM7QUFDM0MsMENBQXlDO0FBQ3pDLDBEQUE0RDtBQUM1RCxpRUFBbUQ7QUFDbkQsMENBQTRDO0FBQzVDLDRGQUEwRjtBQUMxRixzREFBd0Q7QUFReEQ7SUFRSSx1QkFBWSxNQUFjLEVBQUUsUUFBa0IsRUFBVSxTQUFvQjtRQUE1RSxpQkFhQztRQWJ1RCxjQUFTLEdBQVQsU0FBUyxDQUFXO1FBSjVFLDZCQUE2QjtRQUM3QixXQUFNLEdBQUcsSUFBSSxrQ0FBZSxFQUFFLENBQUM7UUFDL0IsYUFBUSxHQUFJLElBQUksa0NBQWUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUdoQyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsbUJBQW1CLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQzVFLFFBQVEsQ0FBQyxTQUFTLENBQUMsVUFBQyxJQUFJO1lBQ3BCLEtBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDaEYsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksa0NBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ2hELElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUUsVUFBUyxRQUFRLEVBQUUsT0FBTztZQUM5RCxFQUFFLENBQUEsQ0FBQyxRQUFRLENBQUMsSUFBSSxJQUFJLFFBQVEsQ0FBQyxJQUFJLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFDM0MsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQ3pDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxNQUFNLEdBQUksSUFBSSxrQ0FBZSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFDRCxnQ0FBUSxHQUFSO1FBQ0ksSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDaEQsR0FBRyxDQUFBLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDbEMsSUFBTSxRQUFRLEdBQUcsV0FBVyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDdkQsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxHQUFHLFFBQVEsQ0FBQztZQUMvQixPQUFPLENBQUMsR0FBRyxDQUFDLHdCQUF3QixFQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFBO1lBQzNELElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzlCLENBQUM7SUFFTCxDQUFDO0lBRUQsOEJBQU0sR0FBTjtRQUNJLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBQ0Qsb0NBQVksR0FBWjtJQUVBLENBQUM7SUF0Q1EsYUFBYTtRQUp6QixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLE1BQU07WUFDaEIsV0FBVyxFQUFDLHVDQUF1QztTQUN0RCxDQUFDO3lDQVNzQixlQUFNLEVBQVksaUJBQVEsRUFBcUIsa0JBQVM7T0FSbkUsYUFBYSxDQXVDekI7SUFBRCxvQkFBQztDQUFBLEFBdkNELElBdUNDO0FBdkNZLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IExvY2F0aW9uIH0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vblwiO1xuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0ICogYXMgYXBwbGljYXRpb25TZXR0aW5ncyBmcm9tIFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIjtcbmltcG9ydCB7IENvdWNoYmFzZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtY291Y2hiYXNlXCI7XG5pbXBvcnQgKiBhcyBJbWFnZVNvdXJjZSBmcm9tIFwiaW1hZ2Utc291cmNlXCI7XG5pbXBvcnQgeyBPYnNlcnZhYmxlQXJyYXkgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9kYXRhL29ic2VydmFibGUtYXJyYXkvb2JzZXJ2YWJsZS1hcnJheVwiO1xuaW1wb3J0IHsgUGFnZVJvdXRlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xuXG5cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdsaXN0JyxcbiAgICB0ZW1wbGF0ZVVybDonLi9jb21wb25lbnRzL2xpc3QvbGlzdC5jb21wb25lbnQuaHRtbCdcbn0pXG5leHBvcnQgY2xhc3MgTGlzdENvbXBvbmVudCB7XG4gICAgcm91dGVyOiBSb3V0ZXI7XG4gICAgcGVyc29uTGlzdDogQXJyYXk8T2JqZWN0PjtcbiAgICBwdWJsaWMgZGF0YWJhc2U6IGFueTtcbiAgICAvLyBwdWJsaWMgaW1hZ2VzOiBBcnJheTxhbnk+O1xuICAgIGltYWdlcyA9IG5ldyBPYnNlcnZhYmxlQXJyYXkoKTtcbiAgICBpbWFnZVNyYyA9ICBuZXcgT2JzZXJ2YWJsZUFycmF5KFtdKTtcblxuICAgIGNvbnN0cnVjdG9yKHJvdXRlcjogUm91dGVyLCBsb2NhdGlvbjogTG9jYXRpb24sIHByaXZhdGUgcGFnZVJvdXRlOiBQYWdlUm91dGUgKSB7XG4gICAgICAgIHRoaXMucm91dGVyID0gcm91dGVyO1xuICAgICAgICB0aGlzLnBlcnNvbkxpc3QgPSBKU09OLnBhcnNlKGFwcGxpY2F0aW9uU2V0dGluZ3MuZ2V0U3RyaW5nKFwicGVvcGxlXCIsIFwiW11cIikpO1xuICAgICAgICBsb2NhdGlvbi5zdWJzY3JpYmUoKHBhdGgpID0+IHtcbiAgICAgICAgICAgIHRoaXMucGVyc29uTGlzdCA9IEpTT04ucGFyc2UoYXBwbGljYXRpb25TZXR0aW5ncy5nZXRTdHJpbmcoXCJwZW9wbGVcIiwgXCJbXVwiKSk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmRhdGFiYXNlID0gbmV3IENvdWNoYmFzZShcImltYWdlLWRhdGFiYXNlXCIpO1xuICAgICAgICB0aGlzLmRhdGFiYXNlLmNyZWF0ZVZpZXcoXCJpbWFnZXNcIiwgXCIxXCIsIGZ1bmN0aW9uKGRvY3VtZW50LCBlbWl0dGVyKSB7XG4gICAgICAgICAgICBpZihkb2N1bWVudC50eXBlICYmIGRvY3VtZW50LnR5cGUgPT0gXCJpbWFnZVwiKSB7XG4gICAgICAgICAgICAgICAgZW1pdHRlci5lbWl0KGRvY3VtZW50Ll9pZCwgZG9jdW1lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5pbWFnZXMgPSAgbmV3IE9ic2VydmFibGVBcnJheShbXSk7XG4gICAgfVxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICBsZXQgcm93cyA9IHRoaXMuZGF0YWJhc2UuZXhlY3V0ZVF1ZXJ5KFwiaW1hZ2VzXCIpO1xuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgcm93cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgaW1hZ2VTcmMgPSBJbWFnZVNvdXJjZS5mcm9tQmFzZTY0KHJvd3NbaV0uaW1hZ2UpO1xuICAgICAgICAgICAgcm93c1tpXVsnaW1hZ2VTcmMnXSA9IGltYWdlU3JjO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJyByb3dzW2ldW1xcJ2ltYWdlU3JjXFwnXScsICByb3dzW2ldWydpbWFnZVNyYyddKVxuICAgICAgICAgICAgdGhpcy5pbWFnZXMucHVzaChyb3dzW2ldKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICB9XG5cbiAgICBjcmVhdGUoKSB7XG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcIi9jcmVhdGVcIl0pO1xuICAgIH1cbiAgICBkZWxldGVGcm9tREIoKXtcblxuICAgIH1cbn0iXX0=