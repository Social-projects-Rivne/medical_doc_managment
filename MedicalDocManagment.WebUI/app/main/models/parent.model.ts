export default class ParentModel {
    id: string;
    f_name: string;
    s_name: string;
    l_name: string;
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
    
