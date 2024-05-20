export interface Item {
    _id: string;
    name: string;
    description: string;
    pickupLocation: string;
    pickupTime: string;
    price: number;
    groupId: string;
    groupIdName?: string;
    itemOwnerId?: string;
    itemOwnerName?: string;
    filename?: string;
    path?: string;
}