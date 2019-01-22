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
 }