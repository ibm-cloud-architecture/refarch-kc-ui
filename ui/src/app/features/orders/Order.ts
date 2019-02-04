import { Address } from './Address';

export class Order {
    orderID?: string;
    pickupAddress: Address;
    destinationAddress: Address;
    productID: string;
    quantity: string;
    pickupDate: string;
    expectedDeliveryDate: string;
    status?: string;
    customerID: string;
}