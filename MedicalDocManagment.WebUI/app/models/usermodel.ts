import PositionModel from './positionmodel';
import RoleModel from './rolemodel';

export default class UserModel {
    id: string;
    userName: string;
    email: string;
    avatar: string;
    position: PositionModel;
    role: RoleModel;
    isActive: boolean;

    constructor(jsonobject?) {
        if (jsonobject) {
            this.id = jsonobject.id;
            this.userName = jsonobject.userName;
            this.email = jsonobject.email;
            this.avatar = jsonobject.avatar;
            this.position = new PositionModel(jsonobject.position);
            this.role = jsonobject.role;
            this.isActive = jsonobject.isActive;
        }
        else {
            this.id = null;
            this.userName = null;
            this.email = null;
            this.avatar = null;
            this.position = null;
            this.role = null;
            this.isActive = null;
        }
    }
}
