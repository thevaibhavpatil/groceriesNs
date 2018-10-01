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
var CreateComponent = /** @class */ (function () {
    function CreateComponent(location, routerExtensions) {
        this.routerExtensions = routerExtensions;
        this.saveToGallery = false;
        this.keepAspectRatio = true;
        this.width = 300;
        this.height = 300;
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
    CreateComponent = __decorate([
        core_1.Component({
            selector: 'create',
            templateUrl: './components/create/create.component.html'
        }),
        __metadata("design:paramtypes", [common_1.Location, router_1.RouterExtensions])
    ], CreateComponent);
    return CreateComponent;
}());
exports.CreateComponent = CreateComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNyZWF0ZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMEM7QUFDMUMsMENBQTJDO0FBQzNDLDBEQUE0RDtBQUM1RCxzREFBK0Q7QUFDL0QsOERBQThGO0FBRzlGLDJEQUFtRjtBQUVuRixpRUFBbUQ7QUFDbkQsMENBQTRDO0FBTTVDO0lBV0UseUJBQVksUUFBa0IsRUFBVSxnQkFBa0M7UUFBbEMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQU5uRSxrQkFBYSxHQUFZLEtBQUssQ0FBQztRQUMvQixvQkFBZSxHQUFZLElBQUksQ0FBQztRQUNoQyxVQUFLLEdBQVcsR0FBRyxDQUFDO1FBQ3BCLFdBQU0sR0FBVyxHQUFHLENBQUM7UUFJMUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDekIsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7UUFDcEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7UUFDNUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLGtDQUFTLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUNoRCxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLFVBQVMsUUFBUSxFQUFFLE9BQU87WUFDaEUsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksSUFBSSxRQUFRLENBQUMsSUFBSSxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQzlDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxRQUFRLENBQUMsQ0FBQztZQUN2QyxDQUFDO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsTUFBTSxHQUFH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R0FBRyxpQ0FBVyxFQUFFLENBQUM7UUFDdEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQ0FBZ0MsR0FBRyxpQkFBaUIsQ0FBQyxDQUFDO0lBQ3BFLENBQUM7SUFDRCx3Q0FBYyxHQUFkO1FBQ0UsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDaEQsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDckMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUMxRCxDQUFDO1FBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUE5RlUsZUFBZTtRQUozQixnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLFFBQVE7WUFDbEIsV0FBVyxFQUFFLDJDQUEyQztTQUN6RCxDQUFDO3lDQVlzQixpQkFBUSxFQUE0Qix5QkFBZ0I7T0FYL0QsZUFBZSxDQStGM0I7SUFBRCxzQkFBQztDQUFBLEFBL0ZELElBK0ZDO0FBL0ZZLDBDQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBMb2NhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgKiBhcyBhcHBsaWNhdGlvblNldHRpbmdzIGZyb20gJ2FwcGxpY2F0aW9uLXNldHRpbmdzJztcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tICduYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgZnJvbUZpbGUsIGZyb21SZXNvdXJjZSwgZnJvbUJhc2U2NCwgZnJvbUFzc2V0IH0gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy9pbWFnZS1zb3VyY2UnO1xuaW1wb3J0IHsgRm9sZGVyLCBwYXRoLCBrbm93bkZvbGRlcnMgfSBmcm9tICd0bnMtY29yZS1tb2R1bGVzL2ZpbGUtc3lzdGVtJztcbmltcG9ydCB7IEltYWdlQXNzZXQgfSBmcm9tICd0bnMtY29yZS1tb2R1bGVzL2ltYWdlLWFzc2V0L2ltYWdlLWFzc2V0JztcbmltcG9ydCB7IHRha2VQaWN0dXJlLCByZXF1ZXN0UGVybWlzc2lvbnMsIGlzQXZhaWxhYmxlIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWNhbWVyYSc7XG5pbXBvcnQgKiBhcyBDYW1lcmEgZnJvbSAnbmF0aXZlc2NyaXB0LWNhbWVyYSc7XG5pbXBvcnQgeyBDb3VjaGJhc2UgfSBmcm9tICduYXRpdmVzY3JpcHQtY291Y2hiYXNlJztcbmltcG9ydCAqIGFzIEltYWdlU291cmNlIGZyb20gJ2ltYWdlLXNvdXJjZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2NyZWF0ZScsXG4gIHRlbXBsYXRlVXJsOiAnLi9jb21wb25lbnRzL2NyZWF0ZS9jcmVhdGUuY29tcG9uZW50Lmh0bWwnXG59KVxuZXhwb3J0IGNsYXNzIENyZWF0ZUNvbXBvbmVudCB7XG4gIGxvY2F0aW9uOiBMb2NhdGlvbjtcbiAgZmlyc3RuYW1lOiBzdHJpbmc7XG4gIGxhc3RuYW1lOiBzdHJpbmc7XG4gIHB1YmxpYyBpbWFnZVRha2VuOiBJbWFnZUFzc2V0O1xuICBwdWJsaWMgc2F2ZVRvR2FsbGVyeTogYm9vbGVhbiA9IGZhbHNlO1xuICBwdWJsaWMga2VlcEFzcGVjdFJhdGlvOiBib29sZWFuID0gdHJ1ZTtcbiAgcHVibGljIHdpZHRoOiBudW1iZXIgPSAzMDA7XG4gIHB1YmxpYyBoZWlnaHQ6IG51bWJlciA9IDMwMDtcbiAgZGF0YWJhc2U6IGFueTtcbiAgaW1hZ2VzOiBhbnk7XG4gIGNvbnN0cnVjdG9yKGxvY2F0aW9uOiBMb2NhdGlvbiwgcHJpdmF0ZSByb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zKSB7XG4gICAgdGhpcy5sb2NhdGlvbiA9IGxvY2F0aW9uO1xuICAgIHRoaXMuZmlyc3RuYW1lID0gJyc7XG4gICAgdGhpcy5sYXN0bmFtZSA9ICcnO1xuICAgIHRoaXMub25DaGVja0ZvckNhbWVyYSgpO1xuICAgIHRoaXMub25SZXF1ZXN0UGVybWlzc2lvbnMoKTtcbiAgICB0aGlzLmRhdGFiYXNlID0gbmV3IENvdWNoYmFzZSgnaW1hZ2UtZGF0YWJhc2UnKTtcbiAgICB0aGlzLmRhdGFiYXNlLmNyZWF0ZVZpZXcoJ2ltYWdlcycsICcxJywgZnVuY3Rpb24oZG9jdW1lbnQsIGVtaXR0ZXIpIHtcbiAgICAgIGlmIChkb2N1bWVudC50eXBlICYmIGRvY3VtZW50LnR5cGUgPT0gJ2ltYWdlJykge1xuICAgICAgICBlbWl0dGVyLmVtaXQoZG9jdW1lbnQuX2lkLCBkb2N1bWVudCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5pbWFnZXMgPSBbXTtcbiAgfVxuXG4gIHNhdmUoKSB7XG4gICAgY29uc29sZS5sb2coJ3NhdmUgPT09PT09PT09PT09PT09PT09PT0+Jyk7XG4gICAgaWYgKHRoaXMuZmlyc3RuYW1lICE9ICcnICYmIHRoaXMubGFzdG5hbWUgIT0gJycpIHtcbiAgICAgIHZhciBwZW9wbGU6IEFycmF5PE9iamVjdD4gPSBKU09OLnBhcnNlKGFwcGxpY2F0aW9uU2V0dGluZ3MuZ2V0U3RyaW5nKCdwZW9wbGUnLCAnW10nKSk7XG4gICAgICBwZW9wbGUucHVzaCh7IGZpcnN0bmFtZTogdGhpcy5maXJzdG5hbWUsIGxhc3RuYW1lOiB0aGlzLmxhc3RuYW1lIH0pO1xuICAgICAgLy8gY29uc29sZS5sb2coJ3Blb3BsZScsIHBlb3BsZSk7XG4gICAgICBhcHBsaWNhdGlvblNldHRpbmdzLnNldFN0cmluZygncGVvcGxlJywgSlNPTi5zdHJpbmdpZnkocGVvcGxlKSk7XG4gICAgICBsZXQgdXBkYXRlID0gSlNPTi5wYXJzZShhcHBsaWNhdGlvblNldHRpbmdzLmdldFN0cmluZygncGVvcGxlJywgJ1tdJykpO1xuICAgICAgLy8gdGhpcy5sb2NhdGlvbi5iYWNrKCk7XG4gICAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMuYmFjaygpO1xuICAgIH1cbiAgfVxuICBiYWNrKCkge1xuICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5iYWNrKCk7XG4gIH1cblxuICBvblRha2VQaG90bygpIHtcbiAgICBsZXQgb3B0aW9ucyA9IHtcbiAgICAgIHdpZHRoOiB0aGlzLndpZHRoLFxuICAgICAgaGVpZ2h0OiB0aGlzLmhlaWdodCxcbiAgICAgIGtlZXBBc3BlY3RSYXRpbzogdGhpcy5rZWVwQXNwZWN0UmF0aW8sXG4gICAgICBzYXZlVG9HYWxsZXJ5OiB0aGlzLnNhdmVUb0dhbGxlcnlcbiAgICB9O1xuXG4gICAgaWYgKHRoaXMuZmlyc3RuYW1lICE9ICcnICYmIHRoaXMubGFzdG5hbWUgIT0gJycpIHtcbiAgICAgIHRha2VQaWN0dXJlKG9wdGlvbnMpXG4gICAgICAgIC50aGVuKGltYWdlQXNzZXQgPT4ge1xuICAgICAgICAgIHRoaXMuaW1hZ2VUYWtlbiA9IGltYWdlQXNzZXQ7XG4gICAgICAgICAgLy8gY29uc29sZS5sb2coJ1NpemU6ICcgKyBpbWFnZUFzc2V0Lm9wdGlvbnMud2lkdGggKyAneCcgKyBpbWFnZUFzc2V0Lm9wdGlvbnMuaGVpZ2h0KTtcbiAgICAgICAgICBsZXQgYmFzZTY0O1xuICAgICAgICAgIGZyb21Bc3NldChpbWFnZUFzc2V0KS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICB2YXIgbXlJbWFnZVNvdXJjZSA9IHJlcztcbiAgICAgICAgICAgIGJhc2U2NCA9IG15SW1hZ2VTb3VyY2UudG9CYXNlNjRTdHJpbmcoJ2pwZWcnLCAxMDApO1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coYmFzZTY0KTtcbiAgICAgICAgICAgIHRoaXMuZGF0YWJhc2UuY3JlYXRlRG9jdW1lbnQoe1xuICAgICAgICAgICAgICB0eXBlOiAnaW1hZ2UnLFxuICAgICAgICAgICAgICBpbWFnZTogYmFzZTY0LFxuICAgICAgICAgICAgICB0aW1lc3RhbXA6IG5ldyBEYXRlKCkuZ2V0VGltZSgpLFxuICAgICAgICAgICAgICBmaXJzdG5hbWU6IHRoaXMuZmlyc3RuYW1lLFxuICAgICAgICAgICAgICBsYXN0bmFtZTogdGhpcy5sYXN0bmFtZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLmdldFBob3RvRnJvbURiKCk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICAvLyB0aGlzLmltYWdlcy5wdXNoKHBpY3R1cmUpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhlcnIubWVzc2FnZSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgfVxuICAvLyA8PCBjYW1lcmEtbW9kdWxlLXBob3RvLWNvZGVcbiAgLy8gPj4gY2FtZXJhLW1vZHVsZS1wZXJtLWNvZGVcbiAgb25SZXF1ZXN0UGVybWlzc2lvbnMoKSB7XG4gICAgcmVxdWVzdFBlcm1pc3Npb25zKCk7XG4gIH1cbiAgLy8gPDwgY2FtZXJhLW1vZHVsZS1wZXJtLWNvZGVcbiAgLy8gPj4gY2FtZXJhLW1vZHVsZS1hdmFpLWNvZGVcbiAgb25DaGVja0ZvckNhbWVyYSgpIHtcbiAgICBsZXQgaXNDYW1lcmFBdmFpbGFibGUgPSBpc0F2YWlsYWJsZSgpO1xuICAgIGNvbnNvbGUubG9nKCdJcyBjYW1lcmEgaGFyZHdhcmUgYXZhaWxhYmxlOiAnICsgaXNDYW1lcmFBdmFpbGFibGUpO1xuICB9XG4gIGdldFBob3RvRnJvbURiKCkge1xuICAgIGxldCByb3dzID0gdGhpcy5kYXRhYmFzZS5leGVjdXRlUXVlcnkoJ2ltYWdlcycpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcm93cy5sZW5ndGg7IGkrKykge1xuICAgICAgdGhpcy5pbWFnZXMucHVzaChJbWFnZVNvdXJjZS5mcm9tQmFzZTY0KHJvd3NbaV0uaW1hZ2UpKTtcbiAgICB9XG4gICAgY29uc29sZS5sb2coJ3RoaXMuaW1hZ2VzJywgdGhpcy5pbWFnZXMpO1xuICB9XG59XG4iXX0=