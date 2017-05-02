import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpFacade } from '../../../services/http.facade';

import PageComponent from './page/page.component';
import UsersModel from '../../../models/usersmodel';
import UserModel from '../../../models/usersmodel';
import {NotificationsService, SimpleNotificationsComponent} from 'angular2-notifications';
import {ItemActionListNotificationService} from '../../../services/item-actionlist-notification.service'
import { Subscription } from 'rxjs/Subscription';

@Component({
    moduleId: module.id,
    selector: 'usersList',
    templateUrl: 'users-list.component.html',
    styleUrls: ['users-list.component.css'],
    providers: [HttpFacade, NotificationsService]
})

export class UsersListComponent {
    users: Observable<UsersModel>;
    userForEdit: UserModel;
    page: number = 1;
    pageSize: number = 5;
    total: number;
    loading: boolean;
    private _httpFacade: HttpFacade;
    notificationSubscription: Subscription;
    public notificationOptions = {
        timeOut: 5000,
        lastOnBottom: true,
        clickToClose: true,
        maxLength: 0,
        maxStack: 7,
        showProgressBar: true,
        pauseOnHover: false,
        preventDuplicates: false,
        preventLastDuplicates: 'visible',
        animate: 'scale',
        position: ['right', 'bottom']
    };

    constructor(httpFacade: HttpFacade, private _service: NotificationsService,
                private itemNotificationService: ItemActionListNotificationService) {
        this._httpFacade = httpFacade;
        this.userForEdit = new UserModel(null);
    }

    onUsersListEdit(id: string) {
        this._httpFacade.getUserById(id)
            .subscribe((data: any) => { this.userForEdit = data; });
    }

    ngOnInit() {
        this.getPage(1, this.pageSize);
        this.notificationSubscription = this.itemNotificationService.notificationAdded$.subscribe(
            (type:string) => {
                if (type == "deleteSuccess") {
                    this._service.success("Успіх", "Успішно видалено користувача");
                }
                else if (type == "deleteError") {
                    this._service.error("Помилка", "Відбулася помилка при видаленні користувача");
                }
            });
    }

    onPageChange(page) {
        this.getPage(page, this.pageSize);
    }

    updateUsersList(): void {
        this.users = this._httpFacade.getUsersList();
    }

    getPage(page: number, pageSize: number) {
        this.loading = true;
        this.users = this._httpFacade.getUsersListPaged(page, pageSize)
                            .do(data => {
                                this.page = data.pageNumber;
                                this.pageSize = data.pageSize;
                                this.total = data.totalRecordCount;
                                this.loading = false;
                            })
                            .map(data => { return data.users; });
    }
}

