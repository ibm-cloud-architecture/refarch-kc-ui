export class Address {
    street: string;
    city: string;
    country: string;
    state: string;
    zipcode: string;
}

export class Order {
    orderID: string;
    pickupAddress: Address;
    destinationAddress: Address;
    productID: string;
    quantity: string;
    expectedDeliveryDate: string;
    status: string;
}