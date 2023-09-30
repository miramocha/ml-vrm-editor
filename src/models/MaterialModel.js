export default class MaterialModel {
  /**
   * @type {number}
   */
  materialIndex;

  /**
   * @type {any}
   */
  json;

  constructor({ materialIndex, json }) {
    this.materialIndex = materialIndex;
    this.json = json;
  }
}
