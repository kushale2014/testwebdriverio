const exec = require('child_process').exec;
const allure = require('allure-commandline');

const wdioConfig = {
    runner: 'local',
    specs: [
        './test/specs/**/*.*',
    ],
    suites: {
        superuser: [
            './test/specs/**/*.*',
        ],
        user: [
            './test/specs/**/*.*',
        ]
    },
    // Patterns to exclude.
    exclude: [
        // 'path/to/excluded/files'
    ],
    maxInstances: 5,
    capabilities: [{
            maxInstances: 2,
            browserName: 'chrome',
            acceptInsecureCerts: true
        }
        // {
        //     maxInstances: 2,
        //     browserName: 'firefox',
        // }
    ],
    // Level of logging verbosity: trace | debug | info | warn | error | silent
    logLevel: 'warn',
    bail: 0,
    baseUrl: 'http://localhost',
    waitforTimeout: 20000,
    connectionRetryTimeout: 90000,
    connectionRetryCount: 3,
    services: [
        ['chromedriver']
        // ['firefox-profile']
        // ['MicrosoftEdge']
    ],
    framework: 'mocha',
    // reporters: ['spec'],
    reporters: [['allure', {
        outputDir: 'allure-results',
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: false,
    }], 'spec'],

    //
    // Options to be passed to Mocha.
    // See the full list at http://mochajs.org/
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000 // 20 min
    },
    // =====
    // Hooks
    // =====
    beforeSession: function(config, capabilities) {
        if (process.env.DEBUG == "1") {
            // Giving debugger some time to connect...
            return new Promise(resolve => setTimeout(resolve, 10000));
        }
    },
    beforeSession() { // before hook works as well
        require('expect-webdriverio').setOptions({
            wait: 5000
        })
    },
    before: function (capabilities, specs) {
        browser.setTimeout({ 'pageLoad': 20000 })
    },
    afterTest: function(test, context, { error, result, duration, passed, retries }) {
        if (error) {
            browser.takeScreenshot();
        }
    },
    afterStep: function (test, scenario, { error, duration, passed }) {
        browser.takeScreenshot();
    },

    // onComplete: function(exitCode, config, capabilities, results) {
    // },
    // onComplete: function() {
    //     const reportError = new Error('Could not generate Allure report')
    //     const generation = allure(['generate', 'allure-results', '--clean'])

    //     return new Promise((resolve, reject) => {
    //         const generationTimeout = setTimeout(
    //             () => reject(reportError),
    //             5000)
    //         exec('cp -R allure-report/history allure-results');
    //         generation.on('exit', function(exitCode) {
    //             clearTimeout(generationTimeout)

    //             if (exitCode !== 0) {
    //                 return reject(reportError)
    //             }
    //             console.log('Allure report successfully generated')
    //             resolve()
    //         });
    
    //     })
    // }
};

if (process.env.DEBUG == "1") {
    console.log("###### Running in debug mode! ######");
    wdioConfig.maxInstances = 1
    wdioConfig['execArgv'] = ["--inspect=127.0.0.1:5858"];
    wdioConfig.mochaOpts.timeout = 360000;
}

module.exports.config = wdioConfig;