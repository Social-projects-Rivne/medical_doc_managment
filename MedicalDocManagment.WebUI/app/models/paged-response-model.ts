import UsersModel from '../models/usersmodel';
export default class PagedResponseModel {
    PageNumber: number;
    PageSize: number;
    PageCount: number;
    TotalRecordCount: number;
    Users: UsersModel;
}