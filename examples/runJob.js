'use strict';

process.title = 'scheduler';

var lib = require('../lib'),
    log = lib.log;

function start() {
    var filename = process.argv[2];

    if (!filename) {
        log.error('You must provide a filename!');
        log.error('Usage:  ', process.argv[0], process.argv[1], './jobs/heartbeat.jobspec.js');
    } else {
        var job = require(filename);

        job.onTick();
    }
}

start();
