export interface Pagination<T> {
    data: T[];
    page: number;
    pageSize: number;
    totalPages: number;
    totalElements: number;
}