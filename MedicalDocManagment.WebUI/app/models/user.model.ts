import PositionModel from './position.model';
import RoleModel from './role.model';

export default class UserModel {
  id: number;
  username: string;
  email: string;
  avatar: string;
  position: PositionModel;
  role: RoleModel;
  isActive: boolean;

  constructor(jsonobject=null) {
    if (jsonobject)
    {
      this.id = jsonobject.Id;
      this.username = jsonobject.UserName;
      this.email = jsonobject.Email;
      this.avatar = jsonobject.Avatar;
      this.position = new PositionModel(jsonobject.Position);
      this.role = new RoleModel(jsonobject.Role);
      this.isActive = jsonobject.IsActive;
    }
    else
    {
      this.id = null;
      this.username = null;
      this.email = null;
      this.avatar = null;
      this.position = new PositionModel();
      this.role = new RoleModel();
      this.isActive = null;
    }
  }
}