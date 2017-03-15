"use strict";
var router_1 = require('@angular/router');
var app_emptycontent_1 = require("./app.emptycontent");
var MAINMENU_ROUTES = [
    { path: '', component: EmptyContentComponent },
    { path: 'list', component: app_emptycontent_1.UsersListComponent }
];
exports.CONST_ROUTING = router_1.RouterModule.forRoot(MAINMENU_ROUTES);
//# sourceMappingURL=app.routes.js.map