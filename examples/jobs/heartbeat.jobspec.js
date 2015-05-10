'use strict';

module.exports = {
    cronTime: '*/5 * * * * *',
    start: false,

    onTick: function() {
        console.warn('Scheduler test.');
    }
};
