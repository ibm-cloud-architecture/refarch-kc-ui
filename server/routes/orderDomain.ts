export class Address {
    street: string;
    city: string;
    country: string;
    state: string;
    zipcode: string;
}

export class Order {
    orderID?: string;
    customerID: string;
    pickupAddress: Address;
    destinationAddress: Address;
    productID: string;
    quantity: string;
    expectedDeliveryDate: string;
    status?: string;
    voyageID?: string;
}

export class OrderedShipment {
    orderID: string;
    customerID: string;
    status: string;
    voyageID?: string;
}

export class Voyage {
    voyageID: string;
    status: string;
    startPort:string;
    startDate: string;
    endPort: string;
    endDate: string;
    manifest?: string;
    shipID?: string;
}
