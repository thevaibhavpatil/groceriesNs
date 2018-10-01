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
            this.images.push(ImageSource.fromBase64(rows[i].image));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJsaXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEwQztBQUMxQywwQ0FBMkM7QUFDM0MsMENBQXlDO0FBQ3pDLDBEQUE0RDtBQUM1RCxpRUFBbUQ7QUFDbkQsMENBQTRDO0FBQzVDLDRGQUEwRjtBQUMxRixzREFBd0Q7QUFReEQ7SUFPSSx1QkFBWSxNQUFjLEVBQUUsUUFBa0IsRUFBVSxTQUFvQjtRQUE1RSxpQkFhQztRQWJ1RCxjQUFTLEdBQVQsU0FBUyxDQUFXO1FBSDVFLDZCQUE2QjtRQUM3QixXQUFNLEdBQUcsSUFBSSxrQ0FBZSxFQUFFLENBQUM7UUFHM0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLG1CQUFtQixDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUM1RSxRQUFRLENBQUMsU0FBUyxDQUFDLFVBQUMsSUFBSTtZQUNwQixLQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsbUJBQW1CLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ2hGLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLGtDQUFTLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUNoRCxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLFVBQVMsUUFBUSxFQUFFLE9BQU87WUFDOUQsRUFBRSxDQUFBLENBQUMsUUFBUSxDQUFDLElBQUksSUFBSSxRQUFRLENBQUMsSUFBSSxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQzNDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxRQUFRLENBQUMsQ0FBQztZQUN6QyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsTUFBTSxHQUFJLElBQUksa0NBQWUsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBQ0QsZ0NBQVEsR0FBUjtRQUNJLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2hELEdBQUcsQ0FBQSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQ2xDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDNUQsQ0FBQztJQUVMLENBQUM7SUFFRCw4QkFBTSxHQUFOO1FBQ0ksSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFDRCxvQ0FBWSxHQUFaO0lBRUEsQ0FBQztJQWxDUSxhQUFhO1FBSnpCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsTUFBTTtZQUNoQixXQUFXLEVBQUMsdUNBQXVDO1NBQ3RELENBQUM7eUNBUXNCLGVBQU0sRUFBWSxpQkFBUSxFQUFxQixrQkFBUztPQVBuRSxhQUFhLENBbUN6QjtJQUFELG9CQUFDO0NBQUEsQUFuQ0QsSUFtQ0M7QUFuQ1ksc0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgTG9jYXRpb24gfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uXCI7XG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgKiBhcyBhcHBsaWNhdGlvblNldHRpbmdzIGZyb20gXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xuaW1wb3J0IHsgQ291Y2hiYXNlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1jb3VjaGJhc2VcIjtcbmltcG9ydCAqIGFzIEltYWdlU291cmNlIGZyb20gXCJpbWFnZS1zb3VyY2VcIjtcbmltcG9ydCB7IE9ic2VydmFibGVBcnJheSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2RhdGEvb2JzZXJ2YWJsZS1hcnJheS9vYnNlcnZhYmxlLWFycmF5XCI7XG5pbXBvcnQgeyBQYWdlUm91dGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XG5cblxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2xpc3QnLFxuICAgIHRlbXBsYXRlVXJsOicuL2NvbXBvbmVudHMvbGlzdC9saXN0LmNvbXBvbmVudC5odG1sJ1xufSlcbmV4cG9ydCBjbGFzcyBMaXN0Q29tcG9uZW50IHtcbiAgICByb3V0ZXI6IFJvdXRlcjtcbiAgICBwZXJzb25MaXN0OiBBcnJheTxPYmplY3Q+O1xuICAgIHB1YmxpYyBkYXRhYmFzZTogYW55O1xuICAgIC8vIHB1YmxpYyBpbWFnZXM6IEFycmF5PGFueT47XG4gICAgaW1hZ2VzID0gbmV3IE9ic2VydmFibGVBcnJheSgpO1xuXG4gICAgY29uc3RydWN0b3Iocm91dGVyOiBSb3V0ZXIsIGxvY2F0aW9uOiBMb2NhdGlvbiwgcHJpdmF0ZSBwYWdlUm91dGU6IFBhZ2VSb3V0ZSApIHtcbiAgICAgICAgdGhpcy5yb3V0ZXIgPSByb3V0ZXI7XG4gICAgICAgIHRoaXMucGVyc29uTGlzdCA9IEpTT04ucGFyc2UoYXBwbGljYXRpb25TZXR0aW5ncy5nZXRTdHJpbmcoXCJwZW9wbGVcIiwgXCJbXVwiKSk7XG4gICAgICAgIGxvY2F0aW9uLnN1YnNjcmliZSgocGF0aCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5wZXJzb25MaXN0ID0gSlNPTi5wYXJzZShhcHBsaWNhdGlvblNldHRpbmdzLmdldFN0cmluZyhcInBlb3BsZVwiLCBcIltdXCIpKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuZGF0YWJhc2UgPSBuZXcgQ291Y2hiYXNlKFwiaW1hZ2UtZGF0YWJhc2VcIik7XG4gICAgICAgIHRoaXMuZGF0YWJhc2UuY3JlYXRlVmlldyhcImltYWdlc1wiLCBcIjFcIiwgZnVuY3Rpb24oZG9jdW1lbnQsIGVtaXR0ZXIpIHtcbiAgICAgICAgICAgIGlmKGRvY3VtZW50LnR5cGUgJiYgZG9jdW1lbnQudHlwZSA9PSBcImltYWdlXCIpIHtcbiAgICAgICAgICAgICAgICBlbWl0dGVyLmVtaXQoZG9jdW1lbnQuX2lkLCBkb2N1bWVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmltYWdlcyA9ICBuZXcgT2JzZXJ2YWJsZUFycmF5KFtdKTtcbiAgICB9XG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIGxldCByb3dzID0gdGhpcy5kYXRhYmFzZS5leGVjdXRlUXVlcnkoXCJpbWFnZXNcIik7XG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCByb3dzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLmltYWdlcy5wdXNoKEltYWdlU291cmNlLmZyb21CYXNlNjQocm93c1tpXS5pbWFnZSkpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgIH1cblxuICAgIGNyZWF0ZSgpIHtcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiL2NyZWF0ZVwiXSk7XG4gICAgfVxuICAgIGRlbGV0ZUZyb21EQigpe1xuXG4gICAgfVxufSJdfQ==