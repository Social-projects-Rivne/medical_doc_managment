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

    constructor(jsonObject?) {
        this.id = this.userName = this.email = this.avatar = this.position = this.role =
            this.isActive = this.firstName = this.lastName = this.secondName =
            this.positionId = null;
        if (jsonObject) {
            for (var prop in this)
                if (jsonObject.hasOwnProperty(prop))
                    this[prop] = jsonObject[prop];
        }
    }
}
    
