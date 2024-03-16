export interface Item {
    _id: string;
    name: string;
    description: string;
    pickupLocation: string;
    pickupTime: string;
    itemOwner: string;
    price?: number;
    tags?: string[];
}