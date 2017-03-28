import PositionModel from './positionmodel';
import RoleModel from './rolemodel';

export default class UserModel {
    id: string;
    username: string;
    email: string;
    avatar: string;
    position: PositionModel;
    positionId: number;
    role: RoleModel;
    isActive: boolean;
    firstName: string;
    secondName: string;
    lastName: string;

    constructor(jsonobject?) {
        if (jsonobject) {
            this.id = jsonobject.Id;
            this.username = jsonobject.UserName;
            this.email = jsonobject.Email;
            this.avatar = jsonobject.AserName;
            this.position = new PositionModel(jsonobject.Position);
            this.role = jsonobject.Role;
            this.isActive = jsonobject.IsActive;
            this.firstName = jsonobject.FirstName;
            this.lastName = jsonobject.LastName;
            this.secondName = jsonobject.SecondName;
            this.positionId = jsonobject.PostionId;
        }
        else {
            this.id = null;
            this.username = null;
            this.email = null;
            this.avatar = null;
            this.position = null;
            this.role = null;
            this.isActive = null;
            this.firstName = null;
            this.lastName = null;
            this.secondName = null;
            this.positionId = null;
        }
    }
}