/**
 * @fileoverview This file defines Role model, which represents role of the user.
 * @author andriy_katsubo@ukr.net (Andriy Katsubo)
 */

/**
 * Class, which represents data model for role of the user.
 */
export default class RoleModel {
  /**
   * Unique identifier of role.
   * @type {number}
   */
  id: number;
  /**
   * Text, which defines role.
   * @type {string}
   */
  role: string;
}