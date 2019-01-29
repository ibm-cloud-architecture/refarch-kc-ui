import AppConfig  from '../config/AppConfig';
import * as orderDomain from './orderDomain';
import * as request from 'request-promise-native';
import { Observable, of } from 'rxjs';

export default class ShipmentClient {
    config:AppConfig;

    constructor() {
        this.config =  new AppConfig();
    }

    /**
     *  let orders: orderDomain.OrderedShipment[] = [
            {orderID: "order1",customerID: "GoodManuf",status: "Pending"},
            {orderID: "order2",customerID: "GoodManuf",status: "Booked", voyageID:"voyage12"},
            {orderID: "order3",customerID: "OtherManuf",status: "Allocated", voyageID:"voyage13"}
        ];
     */
    public getOrderedShipments(): Promise<orderDomain.OrderedShipment[]>  {
        return request.get(this.config.getOrderQueryMSURL() + '/byManuf/GoodManuf',
        {json: true})
        .then(body => {
            let orders:orderDomain.Order[] = <orderDomain.Order[]>body;
            console.log(' body ' + JSON.stringify(body))
            let shipmentOrders:orderDomain.OrderedShipment[] = [];
            for (var order of orders) {
                let s = new orderDomain.OrderedShipment();
                s.customerID = order.customerID;
                s.orderID = order.orderID;
                s.status = order.status;
                s.voyageID = order.voyageID;
                shipmentOrders.push(s);
            }
            console.log(shipmentOrders);
            return shipmentOrders;
        })
        .catch(err => {
            console.error(err);
            return new Promise((resolve, _) => {
                // resolve empty on error
                resolve([]);
            });
        });
    }
 
    public getVoyages(): Observable<orderDomain.Voyage[]> {
        let voyages: orderDomain.Voyage[] = [
            {voyageID:"voyage14", status: "Scheduled", startPort: "Oackland",
            startDate: "01/20/2019",
            endPort: "Shangai",
            endDate: "02/15/2019"},
            {voyageID:"voyage15",
            status: "Scheduled",
            startPort: "Oackland",
            startDate: "01/30/2019",
            endPort: "Shangai",
            endDate: "02/25/2019"}  
        ];
        return of(voyages)
    }

    public getVoyage(voyageID: string): Observable<orderDomain.Voyage> {
        return of({voyageID:voyageID,status: "Booked", startPort: "Oackland",
        startDate: "01/20/2019",
        endPort: "Shangai",
        endDate: "02/15/2019"})
    }

    public updateOrder(os: orderDomain.OrderedShipment): Observable<orderDomain.OrderedShipment> {
        console.log(os);
        return of(os);

    }
}