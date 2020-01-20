import { expect, assert }  from 'chai';
import OrderClient  from '../routes/OrderClient';



describe('Order client', function() {
    it('should return an order', async function(){
        let client = new OrderClient();
        client.getOrderByID("9d21c0fe-fff0-4424-92be-41d44ede3e98").then( data => {
            console.log(data);
            assert.isOk(data);
        })
    });
    it('should create a new order', async function() {
        let client = new OrderClient();
        let newOrder = {
        pickupAddress: {street: "100 1st street", city: "Shanghai", country: "China", state: "", zipcode: "09430"},
        destinationAddress: {street: "200 main street", city: "San Leonardo", country: "USA", state: "CA", zipcode: "95030"},
        productID: "FreshProduct01", 
        customerID: "GoodManuf",
        quantity: "100",
        expectedDeliveryDate: "2019-03-15T17:48Z"};
        client.saveOrder(newOrder).then( data => {
            console.log(data);
            assert.isOk(data);
            assert.isOk(data.orderID);
        })
    }); 
});