import {Injectable} from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';

@Injectable()
export class ItemActionListNotificationService {
    private notificationSource = new ReplaySubject<string>();
    notificationAdded$ = this.notificationSource.asObservable();
    addNotification(type: string) {
        this.notificationSource.next(type);
    }
}