import AppConfig  from '../config/AppConfig';
import * as orderDomain from './orderDomain';
import * as request from 'request-promise-native';

 export default class OrderClient {
    config:AppConfig;
    // mockup
    orders: orderDomain.Order[] = [{orderID: "order01",
        pickupAddress: {street: "200 1st street", city: "Shanghai", country: "China", state: "", zipcode: "09430"},
        destinationAddress: {street: "500 main street", city: "San Leonardo", country: "USA", state: "CA", zipcode: "95030"},
        productID: "FreshProduct01", 
        customerID: "GoodManuf",
        quantity: "100",
        expectedDeliveryDate: "03/2019",
        status:"Pending"}];

    constructor() {
        this.config =  new AppConfig();
    }

    public getOrders(manuf:string): Promise<orderDomain.Order[]>  {
        // todo call orders microservice
       
        return new Promise((res,rej) => {
            res(this.orders);
        });
    }

    public saveOrder(order: orderDomain.Order): Promise<orderDomain.Order> {
        // mockup
        this.orders.push(order);
        order.orderID="super-save-01";
        return  new Promise((res,rej) => {
            res(order);
        });
    }
 }