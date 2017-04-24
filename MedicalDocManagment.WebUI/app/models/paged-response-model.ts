import UsersModel from './usersmodel';

export default class PagedResponseModel {
    pageNumber: number;
    pageSize: number;
    pageCount: number;
    totalRecordCount: number;
    users: UsersModel;
}