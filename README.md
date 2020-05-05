# Bluetooth switch for Phillips Hue
Just a simple on/off switch for Hue from a dollar [Bluetooth tag](https://www.ebay.co.uk/itm/Smart-Tag-GPS-Tracker-Wireless-Bluetooth-Anti-Lost-Alarm-Key-Finder-Pet-Locator/323633412690).

## What is this

This is just a simple app which implements basic on/off switch for my closet light. When the Bluetooth button is pressed, turn on given light for defined amount of time, and turn it off automatically. If the button is pressed again, turn off the light immediately.

This project is inspired by [this blog post](https://medium.com/@monkeytypewritr/2-bluetooth-tags-and-tangible-uis-for-iot-47599869a7fb).

## Installation
See [requirements](https://github.com/abandonware/noble#prerequisites) for noble Bluetooth library.
```bash
git clone https://github.com/vaahtokarkki/bt-hue.git
cd bt-hue
npm install
npm start
```

Before first run, you need to configure your Hue bridge and add provided username to `.env`. Add also desired light name, your Bluetooth button name (if not default) and timeout (in seconds) after light is turned off.

You may need to run the app with sudo for to Bluetooth work correctly.

## Built with
* [Noble (thanks to  abandonware)](https://github.com/abandonware/noble)
* [node-hue-api](https://github.com/peter-murray/node-hue-api)