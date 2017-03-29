import UsersModel from '../models/usersmodel';
export default class PagedResponseModel {
    pageNumber: number;
    pageSize: number;
    pageCount: number;
    totalRecordCount: number;
    users: UsersModel;
}