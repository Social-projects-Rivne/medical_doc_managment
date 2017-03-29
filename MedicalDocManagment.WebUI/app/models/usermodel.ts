import PositionModel from './positionmodel';
import RoleModel from './rolemodel';

export default class UserModel {
    id: string;
    userName: string;
    firstName: string;
    secondName: string;
    lastName: string;
    email: string;
    avatar: string;
    position: PositionModel;
    positionId: number;
    role: RoleModel;
    isActive: boolean;

    constructor(jsonobject?) {
        if (jsonobject) {
            this.id = jsonobject.id;
            this.userName = jsonobject.userName;
            this.email = jsonobject.email;
            this.avatar = jsonobject.avatar;
            this.position = jsonobject.position;
            this.role = jsonobject.role;
            this.isActive = jsonobject.isActive;
            this.firstName = jsonobject.firstName;
            this.lastName = jsonobject.lastName;
            this.secondName = jsonobject.secondName;
            this.positionId = jsonobject.positionId;
        }
        else
        {
            this.id         = null;
            this.userName   = null;
            this.email      = null;
            this.avatar     = null;
            this.position   = null;
            this.role       = null;
            this.isActive   = null;
            this.firstName  = null;
            this.lastName   = null;
            this.secondName = null;
            this.positionId = null;
        }
    }
}