"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var applicationSettings = require("application-settings");
var router_1 = require("nativescript-angular/router");
var image_source_1 = require("tns-core-modules/image-source");
var nativescript_camera_1 = require("nativescript-camera");
var CreateComponent = /** @class */ (function () {
    function CreateComponent(location, routerExtensions) {
        this.routerExtensions = routerExtensions;
        this.saveToGallery = false;
        this.keepAspectRatio = true;
        this.width = 300;
        this.height = 300;
        this.location = location;
        this.firstname = "";
        this.lastname = "";
        this.onCheckForCamera();
        this.onRequestPermissions();
    }
    CreateComponent.prototype.save = function () {
        console.log("save ====================>");
        if (this.firstname != "" && this.lastname != "") {
            var people = JSON.parse(applicationSettings.getString("people", "[]"));
            people.push({ firstname: this.firstname, lastname: this.lastname });
            console.log("people", people);
            applicationSettings.setString("people", JSON.stringify(people));
            var update = JSON.parse(applicationSettings.getString("people", "[]"));
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
        if (this.firstname != "" && this.lastname != "") {
            nativescript_camera_1.takePicture(options)
                .then(function (imageAsset) {
                _this.imageTaken = imageAsset;
                console.log("Size: " +
                    imageAsset.options.width +
                    "x" +
                    imageAsset.options.height);
                var base64;
                image_source_1.fromAsset(imageAsset).then(function (res) {
                    var myImageSource = res;
                    base64 = myImageSource.toBase64String("jpeg", 100);
                    console.log(base64);
                    _this.database.createDocument({
                        type: "image",
                        image: base64,
                        timestamp: new Date().getTime(),
                        firstname: _this.firstname,
                        lastname: _this.lastname
                    });
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
        console.log("Is camera hardware available: " + isCameraAvailable);
    };
    CreateComponent = __decorate([
        core_1.Component({
            selector: "create",
            templateUrl: "./components/create/create.component.html"
        }),
        __metadata("design:paramtypes", [common_1.Location, router_1.RouterExtensions])
    ], CreateComponent);
    return CreateComponent;
}());
exports.CreateComponent = CreateComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNyZWF0ZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMEM7QUFDMUMsMENBQTJDO0FBQzNDLDBEQUE0RDtBQUM1RCxzREFBK0Q7QUFDL0QsOERBTXVDO0FBR3ZDLDJEQUk2QjtBQU83QjtJQVVFLHlCQUFZLFFBQWtCLEVBQVUsZ0JBQWtDO1FBQWxDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFMbkUsa0JBQWEsR0FBWSxLQUFLLENBQUM7UUFDL0Isb0JBQWUsR0FBWSxJQUFJLENBQUM7UUFDaEMsVUFBSyxHQUFXLEdBQUcsQ0FBQztRQUNwQixXQUFNLEdBQVcsR0FBRyxDQUFDO1FBRzFCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO0lBQzlCLENBQUM7SUFFRCw4QkFBSSxHQUFKO1FBQ0UsT0FBTyxDQUFDLEdBQUcsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO1FBQzFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLElBQUksRUFBRSxJQUFJLElBQUksQ0FBQyxRQUFRLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNoRCxJQUFJLE1BQU0sR0FBa0IsSUFBSSxDQUFDLEtBQUssQ0FDcEMsbUJBQW1CLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FDOUMsQ0FBQztZQUNGLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7WUFD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RCxJQXFHQztBQXJHWSwwQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IExvY2F0aW9uIH0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vblwiO1xyXG5pbXBvcnQgKiBhcyBhcHBsaWNhdGlvblNldHRpbmdzIGZyb20gXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xyXG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQge1xyXG4gIEltYWdlU291cmNlLFxyXG4gIGZyb21GaWxlLFxyXG4gIGZyb21SZXNvdXJjZSxcclxuICBmcm9tQmFzZTY0LFxyXG4gIGZyb21Bc3NldFxyXG59IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2ltYWdlLXNvdXJjZVwiO1xyXG5pbXBvcnQgeyBGb2xkZXIsIHBhdGgsIGtub3duRm9sZGVycyB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2ZpbGUtc3lzdGVtXCI7XHJcbmltcG9ydCB7IEltYWdlQXNzZXQgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9pbWFnZS1hc3NldC9pbWFnZS1hc3NldFwiO1xyXG5pbXBvcnQge1xyXG4gIHRha2VQaWN0dXJlLFxyXG4gIHJlcXVlc3RQZXJtaXNzaW9ucyxcclxuICBpc0F2YWlsYWJsZVxyXG59IGZyb20gXCJuYXRpdmVzY3JpcHQtY2FtZXJhXCI7XHJcbmltcG9ydCAqIGFzIENhbWVyYSBmcm9tIFwibmF0aXZlc2NyaXB0LWNhbWVyYVwiO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6IFwiY3JlYXRlXCIsXHJcbiAgdGVtcGxhdGVVcmw6IFwiLi9jb21wb25lbnRzL2NyZWF0ZS9jcmVhdGUuY29tcG9uZW50Lmh0bWxcIlxyXG59KVxyXG5leHBvcnQgY2xhc3MgQ3JlYXRlQ29tcG9uZW50IHtcclxuICBsb2NhdGlvbjogTG9jYXRpb247XHJcbiAgZmlyc3RuYW1lOiBzdHJpbmc7XHJcbiAgbGFzdG5hbWU6IHN0cmluZztcclxuICBwdWJsaWMgaW1hZ2VUYWtlbjogSW1hZ2VBc3NldDtcclxuICBwdWJsaWMgc2F2ZVRvR2FsbGVyeTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIHB1YmxpYyBrZWVwQXNwZWN0UmF0aW86IGJvb2xlYW4gPSB0cnVlO1xyXG4gIHB1YmxpYyB3aWR0aDogbnVtYmVyID0gMzAwO1xyXG4gIHB1YmxpYyBoZWlnaHQ6IG51bWJlciA9IDMwMDtcclxuICBkYXRhYmFzZTogYW55O1xyXG4gIGNvbnN0cnVjdG9yKGxvY2F0aW9uOiBMb2NhdGlvbiwgcHJpdmF0ZSByb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zKSB7XHJcbiAgICB0aGlzLmxvY2F0aW9uID0gbG9jYXRpb247XHJcbiAgICB0aGlzLmZpcnN0bmFtZSA9IFwiXCI7XHJcbiAgICB0aGlzLmxhc3RuYW1lID0gXCJcIjtcclxuICAgIHRoaXMub25DaGVja0ZvckNhbWVyYSgpO1xyXG4gICAgdGhpcy5vblJlcXVlc3RQZXJtaXNzaW9ucygpO1xyXG4gIH1cclxuXHJcbiAgc2F2ZSgpIHtcclxuICAgIGNvbnNvbGUubG9nKFwic2F2ZSA9PT09PT09PT09PT09PT09PT09PT5cIik7XHJcbiAgICBpZiAodGhpcy5maXJzdG5hbWUgIT0gXCJcIiAmJiB0aGlzLmxhc3RuYW1lICE9IFwiXCIpIHtcclxuICAgICAgdmFyIHBlb3BsZTogQXJyYXk8T2JqZWN0PiA9IEpTT04ucGFyc2UoXHJcbiAgICAgICAgYXBwbGljYXRpb25TZXR0aW5ncy5nZXRTdHJpbmcoXCJwZW9wbGVcIiwgXCJbXVwiKVxyXG4gICAgICApO1xyXG4gICAgICBwZW9wbGUucHVzaCh7IGZpcnN0bmFtZTogdGhpcy5maXJzdG5hbWUsIGxhc3RuYW1lOiB0aGlzLmxhc3RuYW1lIH0pO1xyXG4gICAgICBjb25zb2xlLmxvZyhcInBlb3BsZVwiLCBwZW9wbGUpO1xyXG4gICAgICBhcHBsaWNhdGlvblNldHRpbmdzLnNldFN0cmluZyhcInBlb3BsZVwiLCBKU09OLnN0cmluZ2lmeShwZW9wbGUpKTtcclxuICAgICAgbGV0IHVwZGF0ZSA9IEpTT04ucGFyc2UoYXBwbGljYXRpb25TZXR0aW5ncy5nZXRTdHJpbmcoXCJwZW9wbGVcIiwgXCJbXVwiKSk7XHJcbiAgICAgIC8vIHRoaXMubG9jYXRpb24uYmFjaygpO1xyXG4gICAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMuYmFjaygpO1xyXG4gICAgfVxyXG4gIH1cclxuICBiYWNrKCkge1xyXG4gICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLmJhY2soKTtcclxuICB9XHJcblxyXG4gIG9uVGFrZVBob3RvKCkge1xyXG4gICAgbGV0IG9wdGlvbnMgPSB7XHJcbiAgICAgIHdpZHRoOiB0aGlzLndpZHRoLFxyXG4gICAgICBoZWlnaHQ6IHRoaXMuaGVpZ2h0LFxyXG4gICAgICBrZWVwQXNwZWN0UmF0aW86IHRoaXMua2VlcEFzcGVjdFJhdGlvLFxyXG4gICAgICBzYXZlVG9HYWxsZXJ5OiB0aGlzLnNhdmVUb0dhbGxlcnlcclxuICAgIH07XHJcblxyXG4gICAgaWYgKHRoaXMuZmlyc3RuYW1lICE9IFwiXCIgJiYgdGhpcy5sYXN0bmFtZSAhPSBcIlwiKSB7XHJcbiAgICAgIHRha2VQaWN0dXJlKG9wdGlvbnMpXHJcbiAgICAgICAgLnRoZW4oaW1hZ2VBc3NldCA9PiB7XHJcbiAgICAgICAgICB0aGlzLmltYWdlVGFrZW4gPSBpbWFnZUFzc2V0O1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXHJcbiAgICAgICAgICAgIFwiU2l6ZTogXCIgK1xyXG4gICAgICAgICAgICAgIGltYWdlQXNzZXQub3B0aW9ucy53aWR0aCArXHJcbiAgICAgICAgICAgICAgXCJ4XCIgK1xyXG4gICAgICAgICAgICAgIGltYWdlQXNzZXQub3B0aW9ucy5oZWlnaHRcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgICBsZXQgYmFzZTY0O1xyXG4gICAgICAgICAgZnJvbUFzc2V0KGltYWdlQXNzZXQpLnRoZW4ocmVzID0+IHtcclxuICAgICAgICAgICAgdmFyIG15SW1hZ2VTb3VyY2UgPSByZXM7XHJcbiAgICAgICAgICAgIGJhc2U2NCA9IG15SW1hZ2VTb3VyY2UudG9CYXNlNjRTdHJpbmcoXCJqcGVnXCIsIDEwMCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGJhc2U2NCk7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YWJhc2UuY3JlYXRlRG9jdW1lbnQoe1xyXG4gICAgICAgICAgICAgIHR5cGU6IFwiaW1hZ2VcIixcclxuICAgICAgICAgICAgICBpbWFnZTogYmFzZTY0LFxyXG4gICAgICAgICAgICAgIHRpbWVzdGFtcDogbmV3IERhdGUoKS5nZXRUaW1lKCksXHJcbiAgICAgICAgICAgICAgZmlyc3RuYW1lOiB0aGlzLmZpcnN0bmFtZSxcclxuICAgICAgICAgICAgICBsYXN0bmFtZTogdGhpcy5sYXN0bmFtZVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgIC8vIHRoaXMuaW1hZ2VzLnB1c2gocGljdHVyZSk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goZXJyID0+IHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKGVyci5tZXNzYWdlKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcbiAgLy8gPDwgY2FtZXJhLW1vZHVsZS1waG90by1jb2RlXHJcbiAgLy8gPj4gY2FtZXJhLW1vZHVsZS1wZXJtLWNvZGVcclxuICBvblJlcXVlc3RQZXJtaXNzaW9ucygpIHtcclxuICAgIHJlcXVlc3RQZXJtaXNzaW9ucygpO1xyXG4gIH1cclxuICAvLyA8PCBjYW1lcmEtbW9kdWxlLXBlcm0tY29kZVxyXG4gIC8vID4+IGNhbWVyYS1tb2R1bGUtYXZhaS1jb2RlXHJcbiAgb25DaGVja0ZvckNhbWVyYSgpIHtcclxuICAgIGxldCBpc0NhbWVyYUF2YWlsYWJsZSA9IGlzQXZhaWxhYmxlKCk7XHJcbiAgICBjb25zb2xlLmxvZyhcIklzIGNhbWVyYSBoYXJkd2FyZSBhdmFpbGFibGU6IFwiICsgaXNDYW1lcmFBdmFpbGFibGUpO1xyXG4gIH1cclxuICAvLyA8PCBjYW1lcmEtbW9kdWxlLWF2YWktY29kZVxyXG5cclxuICAvLyBwdWJsaWMgY2FwdHVyZSgpIHtcclxuICAvLyAgICAgQ2FtZXJhLnRha2VQaWN0dXJlKHsgd2lkdGg6IDMwMCwgaGVpZ2h0OiAzMDAsIGtlZXBBc3BlY3RSYXRpbzogdHJ1ZSwgc2F2ZVRvR2FsbGVyeTogZmFsc2UgfSkudGhlbihwaWN0dXJlID0+IHtcclxuICAvLyAgICAgICAgIGxldCBiYXNlNjQgPSBwaWN0dXJlLnRvQmFzZTY0U3RyaW5nKFwicG5nXCIsIDcwKTtcclxuICAvLyAgICAgICAgIHRoaXMuZGF0YWJhc2UuY3JlYXRlRG9jdW1lbnQoe1xyXG4gIC8vICAgICAgICAgICAgIFwidHlwZVwiOiBcImltYWdlXCIsXHJcbiAgLy8gICAgICAgICAgICAgXCJpbWFnZVwiOiBiYXNlNjQsXHJcbiAgLy8gICAgICAgICAgICAgXCJ0aW1lc3RhbXBcIjogKG5ldyBEYXRlKCkpLmdldFRpbWUoKVxyXG4gIC8vICAgICAgICAgfSk7XHJcbiAgLy8gICAgICAgICB0aGlzLmltYWdlcy5wdXNoKHBpY3R1cmUpO1xyXG4gIC8vICAgICB9LCBlcnJvciA9PiB7XHJcbiAgLy8gICAgICAgICBjb25zb2xlLmR1bXAoZXJyb3IpO1xyXG4gIC8vICAgICB9KTtcclxuICAvLyB9XHJcbn1cclxuIl19