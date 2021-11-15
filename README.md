# Printing company test task

Solution contains UI- and API-tests. Both test types implemented under one code base and in BDD manner using [cucumber-js](https://www.npmjs.com/package/@cucumber/cucumber).
- API tests use [axios](https://www.npmjs.com/package/axios) for API calls, [chai](https://www.npmjs.com/package/chai) for assertions
- UI tests use [selenium-webdriver](https://www.npmjs.com/package/selenium-webdriver) for web interaction and [chromedriver](https://www.npmjs.com/package/chromedriver)

## Preconditions

[Docker](https://docs.docker.com/engine/install/) is required to run this solution.

## Usage

```bash
# in order to run tests:
docker-compose up --build

# in order to obtain report (linux):
docker cp printing-company-test-task-main_dev-node_1:/app/reports/cucumber_report.html .

# in order to obtain report (windows):
docker cp printing-company-test-task-main-dev-node-1:/app/reports/cucumber_report.html .
```
## License
[ISC](https://choosealicense.com/licenses/isc/)
