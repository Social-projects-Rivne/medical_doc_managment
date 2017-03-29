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

  constructor(jsonobject) {
    if (jsonobject)
    {
      this.id = jsonobject.Id;
      this.userName = jsonobject.UserName;
      this.email = jsonobject.Email;
      this.avatar = jsonobject.AserName;
      this.position = new PositionModel(jsonobject.Position);
      this.role = jsonobject.Role;
      this.isActive = jsonobject.IsActive;
    }
    else
    {
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