const fs = require('fs');

console.log("Launching The Things Network Local MQTT Bridge");

let config = null;
try {
  config = JSON.parse(fs.readFileSync('settings.json', 'utf8'));
} catch (e) {
  console.log("Could not load settings.json file. Is it there?");
  process.exit();
}

bridges = [];
config.bridges.forEach(function(item, index, array) {
  console.log("Creating bridge");

  let bridge = {
    local: config.local.connection,
    remote: config.remote.connection,
    username: item.remote.app_id,
    password: item.remote.base64_access_key,
    devices: item.remote.devices,
    local_topic: item.local.topic
  };

  bridges.push(bridge);
});

console.log(bridges);