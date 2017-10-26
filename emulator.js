/**
 * Created by dilunika on 26/10/17.
 */

const smartMeters = require('./utils/smartMeters');

const meterReadResource = process.argv[2];
const numberOfMeters = process.argv[3];

smartMeters.emulateReadings(meterReadResource, numberOfMeters)
    .then(results => {
        const now = new Date();
        console.log(`Successfully sent meter reads for ${results.length} meters at ${now.toISOString()}`);
    })
    .catch(err => {
        const now = new Date();
        console.log(`Failed to send meter reads due to ${err.message} at ${now.toISOString()}`);
    });
