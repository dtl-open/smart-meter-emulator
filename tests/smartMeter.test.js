/**
 * Created by dilunika on 25/10/17.
 */
const test = require('ava');
const smartMeter = require('../utils/smartMeters');

test('Meters List ', async t => {

    const meters = await smartMeter.getAllMeters();
    console.log('Smart meters ' + JSON.stringify(meters[0]));
    t.is(meters.length, 1000);
});

test('Emulate Meter Read', async t => {

    const sendMeterReadMock = (data) => Promise.resolve(data);
    const results = await smartMeter.emulateReadings(sendMeterReadMock);
    t.is(results.length, 1000);
});