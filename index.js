var reporter = require('cucumber-html-reporter');

var options = {
    theme: 'bootstrap',
    jsonFile: 'reports/report.json',
    output: 'reports/cucumber_report.html',
    reportSuiteAsScenarios: true,
    scenarioTimestamp: true,
    launchReport: true,
    metadata: {
        "Title": "selenium-cucumber-js-ui-api",
        "Version": "0.0.1α",
        "Browser": "Chrome 95.0.4638.69"
    }
};

reporter.generate(options);