/*
 *  Scheduler
 *
 *  A super-simple Node.JS scheduler
 *
 *  Copyright 2015 Cody Hazelwood
 *  Released under the MIT license.
 */

'use strict';

process.title = 'scheduler';

var fs       = require('fs'),
    async    = require('async'),
    cron     = require('cron'),
    _        = require('lodash'),
    minimist = require('minimist'),
    path     = require('path'),
    CronJob  = cron.CronJob,
    args     = minimist(process.argv.slice(2));

function startScheduler() {
    var jobFiles = [],
        jobs     = [],
        jobPath  = args.jobsPath || process.env.JOBS_PATH || path.resolve(__dirname, '../examples/jobs/');

    async.series([
        // Get Job Files
        function getJobs(callback) {
            // Load all job files
            fs.readdir(jobPath, function (error, results) {
                if (error) {
                    return callback(error);
                }

                // Keep only jobspecs
                jobFiles = _.filter(results, function (filename) {
                    return /\.jobspec\.js$/.test(filename);
                });

                callback();
            });
        },

        // Import Jobs
        function processJobs(callback) {
            // Read jobs
            async.each(
                jobFiles,
                function (filename, callback2) {
                    var jobOptions;

                    // Try to import the jobspec
                    try {
                        jobOptions = require(path.join(jobPath, filename));
                    }
                    catch (e) {
                        console.error('Failed while trying to import ' + filename);

                        throw e;
                    }

                    // Create the cron job and add it to the array
                    jobs.push(new CronJob(jobOptions));

                    callback2();
                },
                callback
            );
        },

        // Start Jobs
        function startJobs(callback) {
            jobs.forEach(function (job) {
                // Start running the cron job
                job.start();
            });

            callback();
        }
    ],

    // Error Handler
    function (err) {
        if (err) {
            console.error(err);
        }
    });
}

startScheduler();
