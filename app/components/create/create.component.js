"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var applicationSettings = require("application-settings");
var router_1 = require("nativescript-angular/router");
var image_source_1 = require("tns-core-modules/image-source");
var nativescript_camera_1 = require("nativescript-camera");
var nativescript_couchbase_1 = require("nativescript-couchbase");
var ImageSource = require("image-source");
var page_1 = require("ui/page");
var CreateComponent = /** @class */ (function () {
    function CreateComponent(page, location, routerExtensions) {
        this.page = page;
        this.routerExtensions = routerExtensions;
        this.saveToGallery = false;
        this.keepAspectRatio = true;
        this.width = 300;
        this.height = 300;
        page.actionBarHidden = false;
        this.location = location;
        this.firstname = '';
        this.lastname = '';
        this.onCheckForCamera();
        this.onRequestPermissions();
        this.database = new nativescript_couchbase_1.Couchbase('image-database');
        this.database.createView('images', '1', function (document, emitter) {
            if (document.type && document.type == 'image') {
                emitter.emit(document._id, document);
            }
        });
        this.images = [];
    }
    CreateComponent.prototype.save = function () {
        console.log('save ====================>');
        if (this.firstname != '' && this.lastname != '') {
            var people = JSON.parse(applicationSettings.getString('people', '[]'));
            people.push({ firstname: this.firstname, lastname: this.lastname });
            // console.log('people', people);
            applicationSettings.setString('people', JSON.stringify(people));
            var update = JSON.parse(applicationSettings.getString('people', '[]'));
            // this.location.back();
            this.routerExtensions.back();
        }
    };
    CreateComponent.prototype.back = function () {
        this.routerExtensions.back();
    };
    CreateComponent.prototype.onTakePhoto = function () {
        var _this = this;
        var options = {
            width: this.width,
            height: this.height,
            keepAspectRatio: this.keepAspectRatio,
            saveToGallery: this.saveToGallery
        };
        if (this.firstname != '' && this.lastname != '') {
            nativescript_camera_1.takePicture(options)
                .then(function (imageAsset) {
                _this.imageTaken = imageAsset;
                // console.log('Size: ' + imageAsset.options.width + 'x' + imageAsset.options.height);
                var base64;
                image_source_1.fromAsset(imageAsset).then(function (res) {
                    var myImageSource = res;
                    base64 = myImageSource.toBase64String('jpeg', 100);
                    // console.log(base64);
                    _this.database.createDocument({
                        type: 'image',
                        image: base64,
                        timestamp: new Date().getTime(),
                        firstname: _this.firstname,
                        lastname: _this.lastname
                    });
                    _this.getPhotoFromDb();
                });
                // this.images.push(picture);
            })
                .catch(function (err) {
                console.log(err.message);
            });
        }
    };
    // << camera-module-photo-code
    // >> camera-module-perm-code
    CreateComponent.prototype.onRequestPermissions = function () {
        nativescript_camera_1.requestPermissions();
    };
    // << camera-module-perm-code
    // >> camera-module-avai-code
    CreateComponent.prototype.onCheckForCamera = function () {
        var isCameraAvailable = nativescript_camera_1.isAvailable();
        console.log('Is camera hardware available: ' + isCameraAvailable);
    };
    CreateComponent.prototype.getPhotoFromDb = function () {
        var rows = this.database.executeQuery('images');
        for (var i = 0; i < rows.length; i++) {
            this.images.push(ImageSource.fromBase64(rows[i].image));
        }
        console.log('this.images', this.images);
    };
    CreateComponent.prototype.ngOnDestroy = function () {
        //Called once, before the instance is destroyed.
        //Add 'implements OnDestroy' to the class.
        this.page.actionBarHidden = true;
    };
    CreateComponent = __decorate([
        core_1.Component({
            selector: 'create',
            templateUrl: './components/create/create.component.html'
        }),
        __metadata("design:paramtypes", [page_1.Page, common_1.Location, router_1.RouterExtensions])
    ], CreateComponent);
    return CreateComponent;
}());
exports.CreateComponent = CreateComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNyZWF0ZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBcUQ7QUFDckQsMENBQTJDO0FBQzNDLDBEQUE0RDtBQUM1RCxzREFBK0Q7QUFDL0QsOERBQThGO0FBRzlGLDJEQUFtRjtBQUVuRixpRUFBbUQ7QUFDbkQsMENBQTRDO0FBQzVDLGdDQUErQjtBQU0vQjtJQVdFLHlCQUFvQixJQUFTLEVBQUMsUUFBa0IsRUFBVSxnQkFBa0M7UUFBeEUsU0FBSSxHQUFKLElBQUksQ0FBSztRQUE2QixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBTnJGLGtCQUFhLEdBQVksS0FBSyxDQUFDO1FBQy9CLG9CQUFlLEdBQVksSUFBSSxDQUFDO1FBQ2hDLFVBQUssR0FBVyxHQUFHLENBQUM7UUFDcEIsV0FBTSxHQUFXLEdBQUcsQ0FBQztRQUkxQixJQUFJLENBQUMsZUFBZSxHQUFHLEtBQUssQ0FBQztRQUM3QixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN6QixJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztRQUNwQixJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztRQUM1QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksa0NBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ2hELElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUUsVUFBUyxRQUFRLEVBQUUsT0FBTztZQUNoRSxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxJQUFJLFFBQVEsQ0FBQyxJQUFJLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFDOUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFR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QWtCLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBQ0QsNkJBQTZCO0lBQzdCLDZCQUE2QjtJQUM3QiwwQ0FBZ0IsR0FBaEI7UUFDRSxJQUFJLGlCQUFpQixHQUFHLGlDQUFXLEVBQUUsQ0FBQztRQUN0QyxPQUFPLENBQUMsR0FBRyxDQUFDLGdDQUFnQyxHQUFHLGlCQUFpQixDQUFDLENBQUM7SUFDcEUsQ0FBQztJQUNELHdDQUFjLEdBQWQ7UUFDRSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNoRCxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUNyQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQzFELENBQUM7UUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUVELHFDQUFXLEdBQVg7UUFDRSxnREFBZ0Q7UUFDaEQsMENBQTBDO1FBQzFDLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztJQUNuQyxDQUFDO0lBckdVLGVBQWU7UUFKM0IsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxRQUFRO1lBQ2xCLFdBQVcsRUFBRSwyQ0FBMkM7U0FDekQsQ0FBQzt5Q0FZeUIsV0FBSSxFQUFXLGlCQUFRLEVBQTRCLHlCQUFnQjtPQVhqRixlQUFlLENBc0czQjtJQUFELHNCQUFDO0NBQUEsQUF0R0QsSUFzR0M7QUF0R1ksMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTG9jYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0ICogYXMgYXBwbGljYXRpb25TZXR0aW5ncyBmcm9tICdhcHBsaWNhdGlvbi1zZXR0aW5ncyc7XG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IGZyb21GaWxlLCBmcm9tUmVzb3VyY2UsIGZyb21CYXNlNjQsIGZyb21Bc3NldCB9IGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvaW1hZ2Utc291cmNlJztcbmltcG9ydCB7IEZvbGRlciwgcGF0aCwga25vd25Gb2xkZXJzIH0gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy9maWxlLXN5c3RlbSc7XG5pbXBvcnQgeyBJbWFnZUFzc2V0IH0gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy9pbWFnZS1hc3NldC9pbWFnZS1hc3NldCc7XG5pbXBvcnQgeyB0YWtlUGljdHVyZSwgcmVxdWVzdFBlcm1pc3Npb25zLCBpc0F2YWlsYWJsZSB9IGZyb20gJ25hdGl2ZXNjcmlwdC1jYW1lcmEnO1xuaW1wb3J0ICogYXMgQ2FtZXJhIGZyb20gJ25hdGl2ZXNjcmlwdC1jYW1lcmEnO1xuaW1wb3J0IHsgQ291Y2hiYXNlIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWNvdWNoYmFzZSc7XG5pbXBvcnQgKiBhcyBJbWFnZVNvdXJjZSBmcm9tICdpbWFnZS1zb3VyY2UnO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gJ3VpL3BhZ2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjcmVhdGUnLFxuICB0ZW1wbGF0ZVVybDogJy4vY29tcG9uZW50cy9jcmVhdGUvY3JlYXRlLmNvbXBvbmVudC5odG1sJ1xufSlcbmV4cG9ydCBjbGFzcyBDcmVhdGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkRlc3Ryb3l7XG4gIGxvY2F0aW9uOiBMb2NhdGlvbjtcbiAgZmlyc3RuYW1lOiBzdHJpbmc7XG4gIGxhc3RuYW1lOiBzdHJpbmc7XG4gIHB1YmxpYyBpbWFnZVRha2VuOiBJbWFnZUFzc2V0O1xuICBwdWJsaWMgc2F2ZVRvR2FsbGVyeTogYm9vbGVhbiA9IGZhbHNlO1xuICBwdWJsaWMga2VlcEFzcGVjdFJhdGlvOiBib29sZWFuID0gdHJ1ZTtcbiAgcHVibGljIHdpZHRoOiBudW1iZXIgPSAzMDA7XG4gIHB1YmxpYyBoZWlnaHQ6IG51bWJlciA9IDMwMDtcbiAgZGF0YWJhc2U6IGFueTtcbiAgaW1hZ2VzOiBhbnk7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcGFnZTpQYWdlLGxvY2F0aW9uOiBMb2NhdGlvbiwgcHJpdmF0ZSByb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zKSB7XG4gICAgcGFnZS5hY3Rpb25CYXJIaWRkZW4gPSBmYWxzZTtcbiAgICB0aGlzLmxvY2F0aW9uID0gbG9jYXRpb247XG4gICAgdGhpcy5maXJzdG5hbWUgPSAnJztcbiAgICB0aGlzLmxhc3RuYW1lID0gJyc7XG4gICAgdGhpcy5vbkNoZWNrRm9yQ2FtZXJhKCk7XG4gICAgdGhpcy5vblJlcXVlc3RQZXJtaXNzaW9ucygpO1xuICAgIHRoaXMuZGF0YWJhc2UgPSBuZXcgQ291Y2hiYXNlKCdpbWFnZS1kYXRhYmFzZScpO1xuICAgIHRoaXMuZGF0YWJhc2UuY3JlYXRlVmlldygnaW1hZ2VzJywgJzEnLCBmdW5jdGlvbihkb2N1bWVudCwgZW1pdHRlcikge1xuICAgICAgaWYgKGRvY3VtZW50LnR5cGUgJiYgZG9jdW1lbnQudHlwZSA9PSAnaW1hZ2UnKSB7XG4gICAgICAgIGVtaXR0ZXIuZW1pdChkb2N1bWVudC5faWQsIGRvY3VtZW50KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLmltYWdlcyA9IFtdO1xuICB9XG5cbiAgc2F2ZSgpIHtcbiAgICBjb25zb2xlLmxvZygnc2F2ZSA9PT09PT09PT09PT09PT09PT09PT4nKTtcbiAgICBpZiAodGhpcy5maXJzdG5hbWUgIT0gJycgJiYgdGhpcy5sYXN0bmFtZSAhPSAnJykge1xuICAgICAgdmFyIHBlb3BsZTogQXJyYXk8T2JqZWN0PiA9IEpTT04ucGFyc2UoYXBwbGljYXRpb25TZXR0aW5ncy5nZXRTdHJpbmcoJ3Blb3BsZScsICdbXScpKTtcbiAgICAgIHBlb3BsZS5wdXNoKHsgZmlyc3RuYW1lOiB0aGlzLmZpcnN0bmFtZSwgbGFzdG5hbWU6IHRoaXMubGFzdG5hbWUgfSk7XG4gICAgICAvLyBjb25zb2xlLmxvZygncGVvcGxlJywgcGVvcGxlKTtcbiAgICAgIGFwcGxpY2F0aW9uU2V0dGluZ3Muc2V0U3RyaW5nKCdwZW9wbGUnLCBKU09OLnN0cmluZ2lmeShwZW9wbGUpKTtcbiAgICAgIGxldCB1cGRhdGUgPSBKU09OLnBhcnNlKGFwcGxpY2F0aW9uU2V0dGluZ3MuZ2V0U3RyaW5nKCdwZW9wbGUnLCAnW10nKSk7XG4gICAgICAvLyB0aGlzLmxvY2F0aW9uLmJhY2soKTtcbiAgICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5iYWNrKCk7XG4gICAgfVxuICB9XG4gIGJhY2soKSB7XG4gICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLmJhY2soKTtcbiAgfVxuXG4gIG9uVGFrZVBob3RvKCkge1xuICAgIGxldCBvcHRpb25zID0ge1xuICAgICAgd2lkdGg6IHRoaXMud2lkdGgsXG4gICAgICBoZWlnaHQ6IHRoaXMuaGVpZ2h0LFxuICAgICAga2VlcEFzcGVjdFJhdGlvOiB0aGlzLmtlZXBBc3BlY3RSYXRpbyxcbiAgICAgIHNhdmVUb0dhbGxlcnk6IHRoaXMuc2F2ZVRvR2FsbGVyeVxuICAgIH07XG5cbiAgICBpZiAodGhpcy5maXJzdG5hbWUgIT0gJycgJiYgdGhpcy5sYXN0bmFtZSAhPSAnJykge1xuICAgICAgdGFrZVBpY3R1cmUob3B0aW9ucylcbiAgICAgICAgLnRoZW4oaW1hZ2VBc3NldCA9PiB7XG4gICAgICAgICAgdGhpcy5pbWFnZVRha2VuID0gaW1hZ2VBc3NldDtcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZygnU2l6ZTogJyArIGltYWdlQXNzZXQub3B0aW9ucy53aWR0aCArICd4JyArIGltYWdlQXNzZXQub3B0aW9ucy5oZWlnaHQpO1xuICAgICAgICAgIGxldCBiYXNlNjQ7XG4gICAgICAgICAgZnJvbUFzc2V0KGltYWdlQXNzZXQpLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgIHZhciBteUltYWdlU291cmNlID0gcmVzO1xuICAgICAgICAgICAgYmFzZTY0ID0gbXlJbWFnZVNvdXJjZS50b0Jhc2U2NFN0cmluZygnanBlZycsIDEwMCk7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhiYXNlNjQpO1xuICAgICAgICAgICAgdGhpcy5kYXRhYmFzZS5jcmVhdGVEb2N1bWVudCh7XG4gICAgICAgICAgICAgIHR5cGU6ICdpbWFnZScsXG4gICAgICAgICAgICAgIGltYWdlOiBiYXNlNjQsXG4gICAgICAgICAgICAgIHRpbWVzdGFtcDogbmV3IERhdGUoKS5nZXRUaW1lKCksXG4gICAgICAgICAgICAgIGZpcnN0bmFtZTogdGhpcy5maXJzdG5hbWUsXG4gICAgICAgICAgICAgIGxhc3RuYW1lOiB0aGlzLmxhc3RuYW1lXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuZ2V0UGhvdG9Gcm9tRGIoKTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIC8vIHRoaXMuaW1hZ2VzLnB1c2gocGljdHVyZSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKGVyci5tZXNzYWdlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICB9XG4gIC8vIDw8IGNhbWVyYS1tb2R1bGUtcGhvdG8tY29kZVxuICAvLyA+PiBjYW1lcmEtbW9kdWxlLXBlcm0tY29kZVxuICBvblJlcXVlc3RQZXJtaXNzaW9ucygpIHtcbiAgICByZXF1ZXN0UGVybWlzc2lvbnMoKTtcbiAgfVxuICAvLyA8PCBjYW1lcmEtbW9kdWxlLXBlcm0tY29kZVxuICAvLyA+PiBjYW1lcmEtbW9kdWxlLWF2YWktY29kZVxuICBvbkNoZWNrRm9yQ2FtZXJhKCkge1xuICAgIGxldCBpc0NhbWVyYUF2YWlsYWJsZSA9IGlzQXZhaWxhYmxlKCk7XG4gICAgY29uc29sZS5sb2coJ0lzIGNhbWVyYSBoYXJkd2FyZSBhdmFpbGFibGU6ICcgKyBpc0NhbWVyYUF2YWlsYWJsZSk7XG4gIH1cbiAgZ2V0UGhvdG9Gcm9tRGIoKSB7XG4gICAgbGV0IHJvd3MgPSB0aGlzLmRhdGFiYXNlLmV4ZWN1dGVRdWVyeSgnaW1hZ2VzJyk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCByb3dzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB0aGlzLmltYWdlcy5wdXNoKEltYWdlU291cmNlLmZyb21CYXNlNjQocm93c1tpXS5pbWFnZSkpO1xuICAgIH1cbiAgICBjb25zb2xlLmxvZygndGhpcy5pbWFnZXMnLCB0aGlzLmltYWdlcyk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAvL0NhbGxlZCBvbmNlLCBiZWZvcmUgdGhlIGluc3RhbmNlIGlzIGRlc3Ryb3llZC5cbiAgICAvL0FkZCAnaW1wbGVtZW50cyBPbkRlc3Ryb3knIHRvIHRoZSBjbGFzcy5cbiAgICB0aGlzLnBhZ2UuYWN0aW9uQmFySGlkZGVuID0gdHJ1ZTtcbiAgfVxufVxuIl19