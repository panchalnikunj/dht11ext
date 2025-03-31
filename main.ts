//% block="DHT11 Sensor"
namespace DHT11 {
    let dhtPin = DigitalPin.P2;

    /**
     * Read temperature from DHT11 sensor.
     * @return Temperature in Celsius
     */
    //% block="read temperature in C"
    export function readTemperature(): number {
        let buffer: number[] = [];
        pins.digitalWritePin(dhtPin, 0);
        basic.pause(18);
        pins.digitalReadPin(dhtPin);
        control.waitMicros(40);

        for (let i = 0; i < 40; i++) {
            while (pins.digitalReadPin(dhtPin) == 0);
            let start = control.micros();
            while (pins.digitalReadPin(dhtPin) == 1);
            let duration = control.micros() - start;
            buffer.push(duration > 50 ? 1 : 0);
        }

        let tempBits = buffer.slice(16, 24);
        let temperature = 0;
        for (let i = 0; i < 8; i++) {
            temperature = (temperature << 1) | tempBits[i];
        }
        return temperature;
    }

    /**
     * Read humidity from DHT11 sensor.
     * @return Humidity in percentage
     */
    //% block="read humidity in %"
    export function readHumidity(): number {
        let buffer: number[] = [];
        pins.digitalWritePin(dhtPin, 0);
        basic.pause(18);
        pins.digitalReadPin(dhtPin);
        control.waitMicros(40);

        for (let i = 0; i < 40; i++) {
            while (pins.digitalReadPin(dhtPin) == 0);
            let start = control.micros();
            while (pins.digitalReadPin(dhtPin) == 1);
            let duration = control.micros() - start;
            buffer.push(duration > 50 ? 1 : 0);
        }

        let humidityBits = buffer.slice(0, 8);
        let humidity = 0;
        for (let i = 0; i < 8; i++) {
            humidity = (humidity << 1) | humidityBits[i];
        }
        return humidity;
    }
}
