export enum CategoriesToViewByEnum{
    byFirstName, byLastName, bySecondName, byBirthDate, byCardNumber, byAllInTheAbove
}

export const CATEGORIES_TO_VIEW_BY = [
    { name: 'По імені', key: CategoriesToViewByEnum.byFirstName },
    { name: 'По прізвищу', key: CategoriesToViewByEnum.byLastName },
    { name: 'По батькові', key: CategoriesToViewByEnum.bySecondName },
    { name: 'По даті народження', key: CategoriesToViewByEnum.byBirthDate },
    { name: 'По номеру картки', key: CategoriesToViewByEnum.byCardNumber },
    { name: 'По всьому вищевказаному', key: CategoriesToViewByEnum.byAllInTheAbove }
];