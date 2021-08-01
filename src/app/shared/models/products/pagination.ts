export interface IPagination<IProduct> {
    pageIndex: number;
    pageSize: number;
    count: number;
    data: IProduct[];
}