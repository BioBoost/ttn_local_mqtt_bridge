const fs = require('fs');
const mqtt = require('mqtt');

console.log("Launching The Things Network Local MQTT Bridge");

let config = null;
try {
  config = JSON.parse(fs.readFileSync('settings.json', 'utf8'));
} catch (e) {
  console.log("Could not load settings.json file. Is it there?");
  process.exit();
}

let localBroker  = mqtt.connect(config.local.connection);
let ttnBroker  = mqtt.connect(config.remote.connection, {
  username: config.remote.app_id,
  password: config.remote.base64_access_key
});

localBroker.on('connect', function () {
  console.log("Successfully connected to local broker");
});

bridges = [];
ttnBroker.on('connect', function () {
  console.log("Successfully connected to TTN broker");

  config.bridges.forEach(function(bridge, index, array) {
    console.log("Creating bridge per device");

    bridge.remote.devices.forEach(function(device, index, array) {
      bridges.push({
        local: localBroker,
        remote: ttnBroker,
        remote_topic: config.remote.app_id + "/devices/" + device + "/up",
        local_topic: bridge.local.topic
      });

      ttnBroker.subscribe(bridges[bridges.length-1].remote_topic, function (err) {
        if (err) {
          console.log("Failed to subscribe to ttn topic");
        } else {
          console.log("Successfully subscribed to ttn topic");
        }
      });
    });
  });
});

ttnBroker.on('message', function (topic, message) {
  // message is Buffer
  let payload = JSON.stringify(JSON.parse(message.toString())['payload_fields']);
  bridges.forEach(function(bridge, index, array) {
    if (bridge.remote_topic == topic) {
      bridge.local.publish(bridge.local_topic, payload, function(err){
        if (err) {
          console.log("Failed to publish: " + payload);
        }
      });
    }
  });
});