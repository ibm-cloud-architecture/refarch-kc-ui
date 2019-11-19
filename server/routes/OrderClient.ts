import AppConfig  from '../config/AppConfig';
import * as orderDomain from './orderDomain';
import * as request from 'request-promise-native';

 export default class OrderClient {
    config:AppConfig;

    constructor() {
        this.config =  new AppConfig();
    }

    public getOrders(manuf:string): Promise<orderDomain.Order[]>  {
        return request.get(this.config.getOrderQueryMSURL() + '/byManuf/' + manuf,
        {json: true})
        .then(body => {
            return <orderDomain.Order[]>body;
        })
        .catch(err => {
            console.error(err);
            return new Promise((resolve, _) => {
                // resolve empty on error
                resolve([]);
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
            console.error(err);
            return new Promise((resolve, _) => {
                resolve(new orderDomain.Order());
            });
        });
    }

    public saveOrder(order: orderDomain.Order): Promise<orderDomain.Order> {
        return request.post(
            this.config.getOrderMSURL(),
            {json: true,
             headers: {
                accept: 'application/json',
                'Content-Type': 'application/json'}, 
             body: order 
            })
            .then(body => {
                return <orderDomain.Order>body;
            })
            .catch(err => {
                console.error(err);
                order.status = "Error " + err;
                return new Promise((resolve, _) => {
                    resolve(order);
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
                return <orderDomain.Order>body;
            })
            .catch(err => {
                console.error(err);
                order.status = "Error " + err;
                return new Promise((resolve, _) => {
                    resolve(order);
                });
            });  
    }

    public checkCreateNewOrder(order: orderDomain.Order): boolean {
        return ( order.customerID !== "" && order.customerID !== undefined &&
                 order.pickupAddress.city !== "" && order.pickupAddress.city !== undefined &&
                 order.pickupAddress.country !== "" && order.pickupAddress.country !== undefined &&
                 order.pickupAddress.state !== "" && order.pickupAddress.state !== undefined &&
                 order.pickupAddress.street !== "" && order.pickupAddress.street !== undefined &&
                 order.pickupAddress.zipcode !== "" && order.pickupAddress.zipcode !== undefined &&
                 order.destinationAddress.city !== "" && order.destinationAddress.city !== undefined &&
                 order.destinationAddress.country !== "" && order.destinationAddress.country !== undefined &&
                 order.destinationAddress.state !== "" && order.destinationAddress.state !== undefined &&
                 order.destinationAddress.street !== "" && order.destinationAddress.street !== undefined &&
                 order.destinationAddress.zipcode !== "" && order.destinationAddress.zipcode !== undefined &&
                 order.productID !== "" && order.productID !== undefined &&
                 order.quantity !== "" && order.quantity !== "0" && order.quantity !== undefined &&
                 order.expectedDeliveryDate !== "" && order.expectedDeliveryDate !== "" );
    }
 }