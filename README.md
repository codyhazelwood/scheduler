# Scheduler
A simple, easy to use cron scheduler for Node.JS.

I use this in many of my own projects for simple JavaScript cron jobs.  It's
nice for running periodic database cleanup tasks, generating reports, etc.

Feel free to fork, submit pull requests, or copy and paste into your own
projects.  Open an issue if you find bugs, or see something that would make
it more useful for you.

Tested on Node.JS 0.10 and 0.12.

## To Use

First, install dependencies:  
`npm install`

##### Test mode (will run the included heartbeat.jobspec.js)
`npm start`

##### Production mode
`node lib/scheduler.js --jobsPath=~/myAwesomeJobs/`  
or  
`JOBS_PATH=~/myAwesomeJobs/ node lib/scheduler.js`
