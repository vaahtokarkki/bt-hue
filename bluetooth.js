const noble = require('@abandonware/noble')

class Bluetooth {
    constructor (onTrigger) {
        this.onTrigger = onTrigger
    }

    get buttonName () {
        return process.env.BUTTON_NAME
    }

    start () {
        const { buttonName, onTrigger } = this

        noble.on('stateChange', function(state){
            if(state === 'poweredOn')
                noble.startScanning()
            else
                noble.stopScanning()
        })

        noble.on('discover', function(peripheral){
            let { localName } = peripheral.advertisement
            localName = localName && localName.trim()
            if(localName === buttonName){
                noble.stopScanning()
                console.log(`${buttonName} found!`)
                connect(peripheral, onTrigger)
                peripheral.once('disconnect', function(){
                    console.log('Disconnected, start scanning')
                    noble.startScanning()
                })
            }
        })
    }
}

function connect(peripheral, callback) {
    peripheral.connect(function(err) {
		if(err)
            return console.log(err, peripheral)
		else
            console.log('Button connected!')

		peripheral.discoverServices([], (err, services) => {
            const service = services.filter(service => service.uuid === 'ffe0')
            if (!service.length) {
                console.log("No valid service found")
                return
            }
            subscribeCharacteristic(service[0], callback)
        })
	})
}

function subscribeCharacteristic(service, callback) {
    service.discoverCharacteristics([], (error, characteristics) => {
        let characteristic = characteristics.filter(characteristic => characteristic.uuid === 'ffe1')
        if (!characteristic.length)
            return console.log("No valid characteristic found")

        characteristic[0].subscribe(() => null)
        characteristic[0].on('data', function(data){
            console.log('Triggered')
            callback()
        })
    })
}

module.exports = Bluetooth
