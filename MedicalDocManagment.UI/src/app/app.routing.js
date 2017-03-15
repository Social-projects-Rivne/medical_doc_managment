"use strict";
var router_1 = require('@angular/router');
var app_emptycontent_1 = require('./app.emptycontent');
var users_list_1 = require('./users.list');
var MAINMENU_ROUTES = [
    { path: '', component: app_emptycontent_1.EmptyContentComponent },
    { path: 'usersList', component: users_list_1.UsersListComponent },
];
exports.CONST_ROUTING = router_1.RouterModule.forRoot(MAINMENU_ROUTES);
//# sourceMappingURL=app.routing.js.map