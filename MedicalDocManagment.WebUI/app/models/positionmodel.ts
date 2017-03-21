/**
 * @fileoverview This file defines Position model, which represents position of the user.
 * @author andriy_katsubo@ukr.net (Andriy Katsubo)
 */

/**
 * Class, which represents data model for position of the user.
 */
export default class PositionModel {
  /**
   * Unique identifier of position.
   * @type {number}
   */
  id: number;
  /**
   * Text, which defines position.
   * @type {string}
   */
  position: string;
}