import 'rxjs/add/operator/map';

import UserModel from '../models/usermodel';

export default class UsersModel extends Array<UserModel> {
  constructor(jsonobject) {
    super();
    if (jsonobject)
    {
      jsonobject.map((user) => { this.push(new UserModel(user)); });
    }
  }
}