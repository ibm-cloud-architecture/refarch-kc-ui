var kafka = require('kafka-node'),
    Producer = kafka.Producer,
    KeyedMessage = kafka.KeyedMessage,
    client = new kafka.KafkaClient({kafkaHost: 'kafka1:9092'});
    // client = new kafka.KafkaClient(),
    producer = new Producer(client),
    km = new KeyedMessage('key', 'message'),
    payloads = [
          // { topic: 'bluewaterShip', messages: 'hi', partition: 0 },
        { topic: 'blueProblem', messages: '{"issue":"fire","containerId":"c167","shipId":"JimminyCricket","status":"AtSea"}', partition:0 },
        { topic: 'blueProblem', messages: '{"issue":"referral","containerId":"c109","shipId":"Hema","status":"AtSea"}', partition:0 }
    ];


producer.on('ready', function () {
    producer.send(payloads, function (err, data) {
        console.log(data);
    });
});

producer.on('error', function (err) {});
