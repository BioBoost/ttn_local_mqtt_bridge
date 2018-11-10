const fs = require('fs');

console.log("Launching The Things Network Local MQTT Bridge");

let config = null;
try {
  config = JSON.parse(fs.readFileSync('settings.json', 'utf8'));
} catch (e) {
  console.log("Could not load settings.json file. Is it there?");
  process.exit();
}