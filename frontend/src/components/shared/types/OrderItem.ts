export interface OrderItem {
    _id: string;
    orderId: string;
    itemId: string;
    size: string;
    numOrdered: number;
    name?: string;
    price?: number;
    tag?: string;
}