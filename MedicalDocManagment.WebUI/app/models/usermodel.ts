import PositionModel from './positionmodel';
import RoleModel from './rolemodel';

export default class UserModel {
    id: string;
    userName: string;
    firstName: string;
    secondName: string;
    lastName: string;
    email: string;
    photo: string;
    position: PositionModel;
    positionId: number;
    role: RoleModel;
    isActive: boolean;

    constructor(jsonObject?) {
        this.id = this.userName = this.email = this.photo = this.position = this.role =
            this.isActive = this.firstName = this.lastName = this.secondName =
            this.positionId = null;
        if (jsonObject) {
            for (var prop in this)
                if (jsonObject.hasOwnProperty(prop))
                    this[prop] = jsonObject[prop];
        }
    }

    public clone(source) {
        for (var prop in this) {
            if (source.hasOwnProperty(prop)) {
                this[prop] = source[prop];
            }
        }
    }
}
    
