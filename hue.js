const v3 = require('node-hue-api').v3;
const LightState = v3.lightStates.LightState;

class Hue {
    constructor()  {
        this.api = null
        this.timeOut = null
    }

    async createApi () {
        const results = await v3.discovery.nupnpSearch()
        const host = results[0].ipaddress
        this.api = await v3.api.createLocal(host).connect(process.env.HUE_USERNAME)
        console.log("Connected to Hue!")
        return true
    }

    async getLight () {
        return await this.api.lights.getLightByName(process.env.LIGHT_NAME)
    }

    get timeoutValue () {
        return process.env.TIMEOUT * 1000
    }

    async toggleLight () {
        const { id } = await this.getLight()
        const currentState = await this.api.lights.getLightState(id)
        const newState = new LightState()
        currentState.on ? newState.off() : newState.on()
        await this.api.lights.setLightState(id, newState)
        this.resetTimeout()
    }

    async turnOffLight () {
        const { id } = await this.getLight()
        await this.api.lights.setLightState(id, new LightState().off())
        this.timeOut = null
    }

    resetTimeout () {
        if (this.timeOut)
            clearTimeout(this.timeOut)
        this.timeOut = setTimeout(this.turnOffLight.bind(this), this.timeoutValue)
    }
}

module.exports = Hue
