"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const http_service_1 = require("./http.service");
const user_1 = require("./user");
let UserAddComponent = class UserAddComponent {
    constructor(httpService) {
        this.httpService = httpService;
        this.user = new user_1.User();
    }
    submit(user) {
        this.httpService.postData(user)
            .subscribe((data) => { console.log(data); });
    }
};
UserAddComponent = __decorate([
    core_1.Component({
        selector: 'app-user-add',
        //template: '<h1>User add is working</h1>'
        templateUrl: 'app/user-add/user-add.component.html',
        providers: [http_service_1.HttpService]
    }),
    __metadata("design:paramtypes", [http_service_1.HttpService])
], UserAddComponent);
exports.UserAddComponent = UserAddComponent;
//# sourceMappingURL=user-add.component.js.map