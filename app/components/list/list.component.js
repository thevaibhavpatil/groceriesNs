"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var applicationSettings = require("application-settings");
var nativescript_couchbase_1 = require("nativescript-couchbase");
var ImageSource = require("image-source");
var ListComponent = /** @class */ (function () {
    function ListComponent(router, location) {
        var _this = this;
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
        this.images = [];
    }
    ListComponent.prototype.ngOnInit = function () {
        var rows = this.database.executeQuery("images");
        for (var i = 0; i < rows.length; i++) {
            this.images.push(ImageSource.fromBase64(rows[i].image));
        }
    };
    ListComponent.prototype.create = function () {
        this.router.navigate(["/create"]);
    };
    ListComponent = __decorate([
        core_1.Component({
            selector: 'list',
            templateUrl: './components/list/list.component.html'
        }),
        __metadata("design:paramtypes", [router_1.Router, common_1.Location])
    ], ListComponent);
    return ListComponent;
}());
exports.ListComponent = ListComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJsaXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEwQztBQUMxQywwQ0FBMkM7QUFDM0MsMENBQXlDO0FBQ3pDLDBEQUE0RDtBQUM1RCxpRUFBbUQ7QUFDbkQsMENBQTRDO0FBUTVDO0lBTUksdUJBQVksTUFBYyxFQUFFLFFBQWtCO1FBQTlDLGlCQWFDO1FBWkcsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLG1CQUFtQixDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUM1RSxRQUFRLENBQUMsU0FBUyxDQUFDLFVBQUMsSUFBSTtZQUNwQixLQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsbUJBQW1CLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ2hGLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLGtDQUFTLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUNoRCxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLFVBQVMsUUFBUSxFQUFFLE9BQU87WUFDOUQsRUFBRSxDQUFBLENBQUMsUUFBUSxDQUFDLElBQUksSUFBSSxRQUFRLENBQUMsSUFBSSxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQzNDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxRQUFRLENBQUMsQ0FBQztZQUN6QyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBQ0QsZ0NBQVEsR0FBUjtRQUNJLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2hELEdBQUcsQ0FBQSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQ2xDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDNUQsQ0FBQztJQUVMLENBQUM7SUFFRCw4QkFBTSxHQUFOO1FBQ0ksSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUE5QlEsYUFBYTtRQUp6QixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLE1BQU07WUFDaEIsV0FBVyxFQUFDLHVDQUF1QztTQUN0RCxDQUFDO3lDQU9zQixlQUFNLEVBQVksaUJBQVE7T0FOckMsYUFBYSxDQWdDekI7SUFBRCxvQkFBQztDQUFBLEFBaENELElBZ0NDO0FBaENZLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgTG9jYXRpb24gfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uXCI7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0ICogYXMgYXBwbGljYXRpb25TZXR0aW5ncyBmcm9tIFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIjtcclxuaW1wb3J0IHsgQ291Y2hiYXNlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1jb3VjaGJhc2VcIjtcclxuaW1wb3J0ICogYXMgSW1hZ2VTb3VyY2UgZnJvbSBcImltYWdlLXNvdXJjZVwiO1xyXG5cclxuXHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnbGlzdCcsXHJcbiAgICB0ZW1wbGF0ZVVybDonLi9jb21wb25lbnRzL2xpc3QvbGlzdC5jb21wb25lbnQuaHRtbCdcclxufSlcclxuZXhwb3J0IGNsYXNzIExpc3RDb21wb25lbnQge1xyXG4gICAgcm91dGVyOiBSb3V0ZXI7XHJcbiAgICBwZXJzb25MaXN0OiBBcnJheTxPYmplY3Q+O1xyXG4gICAgcHVibGljIGRhdGFiYXNlOiBhbnk7XHJcbiAgICBwdWJsaWMgaW1hZ2VzOiBBcnJheTxhbnk+O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHJvdXRlcjogUm91dGVyLCBsb2NhdGlvbjogTG9jYXRpb24gKSB7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXIgPSByb3V0ZXI7XHJcbiAgICAgICAgdGhpcy5wZXJzb25MaXN0ID0gSlNPTi5wYXJzZShhcHBsaWNhdGlvblNldHRpbmdzLmdldFN0cmluZyhcInBlb3BsZVwiLCBcIltdXCIpKTtcclxuICAgICAgICBsb2NhdGlvbi5zdWJzY3JpYmUoKHBhdGgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5wZXJzb25MaXN0ID0gSlNPTi5wYXJzZShhcHBsaWNhdGlvblNldHRpbmdzLmdldFN0cmluZyhcInBlb3BsZVwiLCBcIltdXCIpKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmRhdGFiYXNlID0gbmV3IENvdWNoYmFzZShcImltYWdlLWRhdGFiYXNlXCIpO1xyXG4gICAgICAgIHRoaXMuZGF0YWJhc2UuY3JlYXRlVmlldyhcImltYWdlc1wiLCBcIjFcIiwgZnVuY3Rpb24oZG9jdW1lbnQsIGVtaXR0ZXIpIHtcclxuICAgICAgICAgICAgaWYoZG9jdW1lbnQudHlwZSAmJiBkb2N1bWVudC50eXBlID09IFwiaW1hZ2VcIikge1xyXG4gICAgICAgICAgICAgICAgZW1pdHRlci5lbWl0KGRvY3VtZW50Ll9pZCwgZG9jdW1lbnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5pbWFnZXMgPSBbXTtcclxuICAgIH1cclxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgICAgIGxldCByb3dzID0gdGhpcy5kYXRhYmFzZS5leGVjdXRlUXVlcnkoXCJpbWFnZXNcIik7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHJvd3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5pbWFnZXMucHVzaChJbWFnZVNvdXJjZS5mcm9tQmFzZTY0KHJvd3NbaV0uaW1hZ2UpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlKCkge1xyXG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcIi9jcmVhdGVcIl0pO1xyXG4gICAgfVxyXG4gICAgXHJcbn0iXX0=