import { IPicture } from "./picture";

export interface IProduct {
    id: number;
    name: string;
    description: string;
    price: number;
    picture: IPicture[];
    productType: string;
    productBrand: string;
}