export default class PositionModel {
  id: string;
  name: string;

  constructor(jsonobject=null) {
    if (jsonobject)
    {
      this.id = jsonobject.Id;
      this.name = jsonobject.Name;
    }
    else
    {
      this.id = null;
      this.name = null;
    }
  }
}