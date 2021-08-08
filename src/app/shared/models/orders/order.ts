export interface IOrderToCreate {
    basketId: string;
    deliveryMethodId: number;
    shipToAddress: IAddress;
}

export interface IOrder {
    id: number;
    buyerEmail: string;
    orderDate: string;
    shipToAddress: IAddress;
    deliveryMethod: string;
    shippingPrice: number;
    orderItems: IOrderItem[];
    subtotal: number;
    status: string;
    total: number;
}

export interface IOrderItem {
    productId: number;
    productName: string;
    pictureUrl: string;
    price: number;
    quantity: number;
}
export interface IAddress {
    firstName: string;
    lastName: string;
    street: string;
    city: string;
}

export interface IDeliveryMethod {
    shortName: string;
    deliveryTime: string;
    description: string;
    price: number;
    id: number;
}