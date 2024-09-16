export default class MotorVehicle {
    constructor(make, model, wheels, engineSize) {
        this._make = make;
        this._model = model;
        this._wheels = wheels;
        this._engineSize = engineSize;
        this._speed = 0;
    }

    get make() {
        return this._make;
    }

    get model() {
        return this._model;
    }

    get wheels() {
        return this._wheels;
    }

    get engineSize() {
        return this._engineSize;
    }

    set engineSize(newEngineSize) {
        this._engineSize = newEngineSize;
    }

    get speed() {
        return this._speed;
    }
    
    accelerate(time) {
        this._speed = this._speed + ((0.25 * this._engineSize/this._wheels) * time);
    }

    brake(time) {
        if (this._speed > 0) {
            this._speed = (this.speed - ((0.3 * this._engineSize/this._wheels) * time) > 0) ?
                this.speed - ((0.3 * this._engineSize/this._wheels) * time) : 0;
        }
    }
}