import ShipPositionConsumer from '../routes/ShipPositionConsumer';

(() => {
    console.log("###################################");
    let consumer = new ShipPositionConsumer();
    consumer.startConsumer();
})()
