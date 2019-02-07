

/**
 * Use a kafka consumer on shipPosition topic to get the container carriers
 * positions
 */
// Use a kafka consumer
var KafkaConsumer = require('./KafkaConsumer');
var consumer = KafkaConsumer.buildConsumer();

// keep the position of the ship, ship is a key
var positions = [];

positions['rose'] =[{latitude:1,longitude:2},{latitude:2,longitude:2}];
positions['kim'] = [{latitude:3,longitude:4}];

const getPositions = (shipID) => {
    return positions[shipID];
}

const start = () => {
    consumer.connect();
}

module.exports = {
    getPositions,
    start
}
