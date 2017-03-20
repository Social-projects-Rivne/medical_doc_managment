/**
 * @fileoverview This file defines User model, which represents user of the system.
 * @author andriy_katsubo@ukr.net (Andriy Katsubo)
 */

import RoleModel from './rolemodel';

export default class UserModel {
  id: number;
  username: string;
  email: string;
  avatar: string;
  position: string;
  role: RoleModel;
  isActive: boolean;
}