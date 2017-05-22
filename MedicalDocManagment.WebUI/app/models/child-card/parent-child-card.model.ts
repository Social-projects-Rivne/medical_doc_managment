export default class ParentChildCard {
    id: number;
    parentId: number;
    childId: number;

    constructor(obj?) {
        if (obj) {
            this.id = obj.id;
            this.parentId = obj.parentId;
            this.childId = obj.childId;
        } else {
            this.id = null;
            this.parentId = null;
            this.childId = null;
        }
    }

}
