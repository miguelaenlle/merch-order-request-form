export interface InventoryItem {
    _id: string;
    itemId: string;
    size: string;
    amount: number;
    price: number;
    change?: number;
}