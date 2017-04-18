import UserModel from '../models/usermodel';

export default class UsersModel extends Array<UserModel> {
    constructor(jsonObject?) {
        super();
        if (jsonObject) {
            jsonObject.forEach((user) => { this.push(new UserModel(user)); });
        }
    }
}