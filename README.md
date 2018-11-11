# The Things Network Local MQTT Bridge

Bridge MQTT from The Things Network to a local MQTT broker

## Configuration

`device_id` is always injected into payload. This allows for several devices of the same app to be bridged to a single local topic.

```json
"bridges": [
  {
    "remote": {
      "devices": [
        "prototype", "print_01"
      ]
    },
    "local": {
      "topic": "test/home/motion"
    }
  }
]
```

Want different topics for each device or subtopic, then create bridge for each.

```json
"bridges": [
  {
    "remote": {
      "devices": [
        "prototype"
      ]
    },
    "local": {
      "topic": "test/home/motion/garage"
    }
  },
  {
    "remote": {
      "app_id": "test_smart_campus_boards",
      "base64_access_key": "my_secret_key",
      "devices": [
        "print_01"
      ]
    },
    "local": {
      "topic": "test/home/motion/hallway"
    }
  }
]
```

