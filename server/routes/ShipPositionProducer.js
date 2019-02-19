var kafka = require('kafka-node'),
    Producer = kafka.Producer,
    KeyedMessage = kafka.KeyedMessage,
    client = new kafka.KafkaClient({kafkaHost: 'kafka1:9092'}),
    // client = new kafka.KafkaClient(),
    producer = new Producer(client),
    km = new KeyedMessage('key', 'message'),
    payloads = [
          // { topic: 'bluewaterShip', messages: 'hi', partition: 0 },
        { topic: 'bluewaterShip', messages: '{"shipID":"JimminyCricket","latitude":"38.311379442887706","longitude":"-124.36835269529928","speed":15,"ambiantTemperature":22.0,"compass":310,"status":"AT_SEA","timestampMillis":1550633481723}', partition:0 },
    ];


producer.on('ready', function () {
    producer.send(payloads, function (err, data) {
        console.log(data);
    });
});

producer.on('error', function (err) {});
