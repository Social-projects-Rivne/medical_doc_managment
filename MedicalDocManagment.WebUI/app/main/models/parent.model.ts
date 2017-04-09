export default class ParentModel {
    id: string;
    f_name: string;
    s_name: string;
    l_name: string;
    work: string;
    phone: string;

    constructor(jsonObject?) {
        if (jsonObject) {
            this.id = jsonObject.id;
            this.f_name = jsonObject.f_name;
            this.s_name = jsonObject.s_name;
            this.l_name = jsonObject.l_name;
            this.work = jsonObject.work;
            this.phone = jsonObject.phone;
        }
        else {
            this.id = null;
            this.f_name = null;
            this.s_name = null;
            this.l_name = null;
            this.work = null;
            this.phone = null;
        }
    }
}