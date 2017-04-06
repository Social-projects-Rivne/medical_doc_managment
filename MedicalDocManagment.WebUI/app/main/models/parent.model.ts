export default class ParentModel {
    id: number;
    f_name: string;
    s_name: string;
    e_name: string;
    work: string;
    phone: string;

    constructor(jsonObject?) {
        if (jsonObject) {
            for (var prop in ParentModel.prototype) {
                if (jsonObject.hasOwnProperty(prop)) {
                    this[prop] = jsonObject[prop];
                }
            }            
        }
        else {
            // initializing of object by null values
            for (var prop in ParentModel.prototype) {
                this[prop] = null;
            }
        }
    }
}
    
