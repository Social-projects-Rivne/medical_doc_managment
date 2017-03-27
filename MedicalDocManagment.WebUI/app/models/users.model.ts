import 'rxjs/add/operator/map';

import UserModel from '../models/user.model';

export default class UsersModel extends Array<UserModel> {
  constructor(jsonobject=null) {
    super();
    if (jsonobject)
    {
      jsonobject.map((user) => { this.push(new UserModel(user)); });
    }
  }
}