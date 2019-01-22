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
        return request.get(this.config.getOrderQueryMSURL() + '/byManuf/' +manuf,
        {json: true})
        .then( (body) => {
            return <orderDomain.Order[]>body;
        })
        .catch( (err:any) => {
            console.log(err);
            return new Promise((resolv,reject) => {
                resolv(this.orders);
            });
        });
        
    }

    public getOrderByID(id:string): Promise<orderDomain.Order>  {
        return request.get(this.config.getOrderQueryMSURL() + '/' + id,
        {json: true})
        .then( (body) => {
            console.log(body);
            return <orderDomain.Order>body;
        })
        .catch( (err:any) => {
            console.log(err);
            return new Promise((resolv,reject) => {
                resolv(new orderDomain.Order());
            });
        });
        
    }

    public saveOrder(order: orderDomain.Order): Promise<orderDomain.Order> {
        // mockup
        return request.post(
            this.config.getOrderMSURL(),
            {json: true,
             headers: {
                accept: 'application/json',
                'Content-Type': 'application/json'}, 
             body: order 
            })
            .then(body => {
                this.orders.push(body);
                return <orderDomain.Order>body;
            })
            .catch(err => {
                console.log(err);
                order.status = "Error " + err;
                return new Promise((resolv,reject) => {
                    resolv(order);
                });
            });  
    }

    public updateOrder(order: orderDomain.Order): Promise<orderDomain.Order> {
        return request.put(
            `${this.config.getOrderMSURL()}/${order.orderID}`,
            {json: true,
             headers: {
                accept: 'application/json',
                'Content-Type': 'application/json'}, 
             body: order 
            })
            .then(body => {
                ///this.orders.push(body);
                return <orderDomain.Order>body;
            })
            .catch(err => {
                console.log(err);
                order.status = "Error " + err;
                return new Promise((resolv,reject) => {
                    resolv(order);
                });
            });  
    }
 }