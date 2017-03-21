/**
 * @fileoverview This file defines User model, which represents user of the system.
 * @author andriy_katsubo@ukr.net (Andriy Katsubo)
 */
import PositionModel from './positionmodel';
import RoleModel from './rolemodel';

/**
 * Class, which represents data model for user of the system.
 */
export default class UserModel {
  /**
   * Unique identifier of the user.
   * @type {number}
   */
  id: number;
  /**
   * Username of the user.
   * @type {string}
   */
  username: string;
  /**
   * E-mail of the user.
   * @type {string}
   */
  email: string;
  /**
   * Path to image, which contains avatar of the user.
   * @type {string}
   */
  avatar: string;
  /**
   * Position of the user.
   * @type {PositionModel}
   */
  position: PositionModel;
  /**
   * Role of the user.
   * @type {RoleModel}
   */
  role: RoleModel;
  /**
   * Property defines whether user is active.
   * @type {boolean}
   */
  isActive: boolean;
}