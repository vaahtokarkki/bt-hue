require('dotenv').config()
const Hue = require("./hue")
const Bluetooth = require("./bluetooth")


async function run () {
    const hue = new Hue()
    await hue.createApi()

    const bt = new Bluetooth(() => hue.toggleLight())
    bt.start()
}

run()
