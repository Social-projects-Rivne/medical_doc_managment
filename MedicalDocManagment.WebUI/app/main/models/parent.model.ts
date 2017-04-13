export default class ParentModel {
    id: string;
    f_Name: string;
    s_Name: string;
    l_Name: string;
    work: string;
    phone: string;

    constructor(jsonObject?) {
        if (jsonObject) {
            this.id = jsonObject.id;
            this.f_Name = jsonObject.f_Name;
            this.s_Name = jsonObject.f_Name;
            this.l_Name = jsonObject.f_Name;
            this.work = jsonObject.work;
            this.phone = jsonObject.phone;
        }
        else {
            this.id = null;
            this.f_Name = null;
            this.f_Name = null;
            this.f_Name = null;
            this.work = null;
            this.phone = null;
        }
    }
}