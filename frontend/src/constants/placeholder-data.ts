import { Group } from "../components/shared/types/Group";
import { Item } from "../components/shared/types/Item";
import { Order } from "../components/shared/types/Order";
import { OrderItem } from "../components/shared/types/OrderItem";

export const PLACEHOLDER_ITEMS: Item[] = [
    {
        _id: "4a9a2e4c-d27f-40d8-9107-971c94904e99",
        name: "JHHS Sweater",
        description: "Official JHHS sweater with school logo.",
        pickupLocation: "123 Main St, City, Country",
        pickupTime: "March 10, 2024, 10:00 AM",
        itemOwner: "2a8e91a0-47fb-4ae1-8c14-72940263f7f3",
        price: 25, // Example price
        tags: ["school", "sweater"]
    },
    {
        _id: "e1477237-1b8d-4f3a-86c4-2a159e87986c",
        name: "Hack Club 2024 T-Shirt",
        description: "Official Hack Club 2024 T-Shirt.",
        pickupLocation: "456 Elm St, City, Country",
        pickupTime: "March 11, 2024, 2:00 PM",
        itemOwner: "1c20c0ff-174e-4cf3-a8a3-00ebf68f7e8e",
        price: 15, // Example price
        tags: ["hack club", "t-shirt", "2024"]
    },
    {
        _id: "7e36df7d-53fd-4c77-8d97-97917f0c4602",
        name: "Hack Club 2023 T-Shirt",
        description: "Official Hack Club 2023 T-Shirt.",
        pickupLocation: "789 Oak St, City, Country",
        pickupTime: "March 12, 2024, 5:00 PM",
        itemOwner: "3b7d5b27-06c1-4734-9c24-875f2b248aa6",
        price: 15, // Example price
        tags: ["hack club", "t-shirt", "2023"]
    },
    {
        _id: "f0f389f2-4784-4f05-b2e8-8ecdfc6b6d6d",
        name: "Robotics T-Shirt",
        description: "Official Robotics Club T-Shirt.",
        pickupLocation: "321 Pine St, City, Country",
        pickupTime: "March 13, 2024, 11:00 AM",
        itemOwner: "a63d18a2-4a09-429e-ae68-7be4a5a5e46c",
        price: 20, // Example price
        tags: ["robotics", "t-shirt"]
    },
    {
        _id: "d3fa0f6b-5b7d-4031-b438-bf9435bebe30",
        name: "CS Club T-Shirt",
        description: "Official Computer Science Club T-Shirt.",
        pickupLocation: "555 Maple St, City, Country",
        pickupTime: "March 14, 2024, 3:00 PM",
        itemOwner: "87d29a72-eeb8-4567-ae9f-3619b0a8b1b5",
        price: 20, // Example price
        tags: ["cs club", "t-shirt"]
    }
];

export const PLACEHOLDER_ITEMS_ORDERED: OrderItem[] = [
    {
        _id: "a919188d-1bf1-4863-8df9-f398e04fdcc6",
        orderId: "1001",
        itemId: "123",
        size: 'M',
        numOrdered: 2,
        name: 'T-Shirt',
        price: 20,
        tag: 'tshirt'
    },
    {
        _id: "7899b5d2-e3e0-48fc-ad90-daa5540f810f",
        orderId: "1002",
        itemId: "456",
        size: 'L',
        numOrdered: 1,
        name: 'Hoodie',
        price: 30,
        tag: 'hoodie'
    }
]

export const PLACEHOLDER_GROUPS: Group[] = [
    {
        _id: "f431ac00-2af8-4c58-bee3-adefd990c685",
        name: "D214 Merch"
    },
    {
        _id: "f431ac00-2af8-4c58-bee3-adefd990c666",
        name: "Robotics"
    },
    {
        _id: "f431ac00-2af8-4c58-bee3-adefd990c667",
        name: "Hack Club"
    }
]

export const PLACEHOLDER_ORDERS: Order[] = [
    {
        _id: "a919188d-1bf1-4863-8df9-f398e04fdcc6",
        orderNumber: 1001,
        customerName: 'John Doe',
        customerEmail: 'john@example.com',
        customerType: 'Student',
        school: 'Elk Grove High School',
        notes: 'Please deliver to the main office'
    },
    {
        _id: "7899b5d2-e3e0-48fc-ad90-daa5540f810f",
        orderNumber: 1002,
        customerName: 'Jane Smith',
        customerEmail: 'jane@example.com',
        customerType: 'Teacher',
        school: 'Hersey High School',
        notes: 'Deliver after 3:00 PM'
    },
    // Add more placeholder orders as needed
]

export const JHHS_LOGO = "https://i.ibb.co/nRyBR1v/image-1-1.png";

export const JHHS_SWEATER = "https://i.ibb.co/25Fv78b/44981-173703-5261-2-INK-H74-2081282644-v4-2.png";

export const JHHS_HACK_CLUB = "https://i.ibb.co/mGFzxm2/Supreme-Reg.png";