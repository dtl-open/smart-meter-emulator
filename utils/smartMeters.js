/**
 * Created by dilunika on 25/10/17.
 */
const csv = require('csvdata');
const axios = require('axios');

let meters = [];

module.exports = {

    getAllMeters,
    emulateReadings
};

function cacheMeters() {

    return csv.load(__dirname + '/meters.csv')
        .then(arr => {
            meters = arr;
            return arr;
        });
}

function getAllMeters() {

    return meters.length === 0 ? cacheMeters() : Promise.resolve(meters);
}

const sendMeterReadToApi = (meterReadResource, data) => {

    return axios.post(meterReadResource, data)
        .then(res => res.data);

};

function emulateReadings(meterReadResource, numberOfMeters = -1, sendMeterReadAction = sendMeterReadToApi) {

    return getAllMeters()
        .then(meters => mapToMeterReadRequestPromises(meters,meterReadResource, sendMeterReadAction, numberOfMeters))
        .then(promises => Promise.all(promises))
        .then(results => results)


}

function mapToMeterReadRequestPromises(meters, meterReadResource, sendMeterReadAction, numberOfMeters) {

    const list = numberOfMeters > 0 ? meters.slice(0,numberOfMeters) : meters;

    return list.map(m => sendMeterReadAction(meterReadResource, {
        readingTime: new Date().getTime(),
        meterNumber: m.serialNumber,
        provider: m.provider,
        reading: (Math.random() * 1000) + .2
    }));
}
