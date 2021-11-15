require('chromedriver');
const assert = require('assert');
const { setDefaultTimeout, Given, When, Then, BeforeAll, After, AfterAll } = require('@cucumber/cucumber');
const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

const data = require('../../test-data/common-data');
const defs = require('./todos-web-app.steps-defs');
const timeout = 30000;
let driver;

setDefaultTimeout(timeout);

BeforeAll(async () => { //normally I'd do this as before each, but for the sake of saving execution time it'll be there
  driver = new Builder().forBrowser('chrome').setChromeOptions(new chrome.Options().addArguments(['--headless'])).usingServer(`http://selenium:4444/wd/hub`).build();
});

Given('I am on the TODOs app main page', async () => {
  await defs.openApp(driver);
});

Given('At least {int} todos exists', async (amount) => {
  await defs.prepareTodos(driver, amount);
});

When('I provide {string} into input field', async (text) => {
  await defs.fillInput(driver, text);
});

When('I click ENTER key', async () => {
  await defs.sendEnter(driver);
});

When('I double click on todo and clear text', async () => {
  await defs.doubleClickTodoAndClear(driver);
});

When('I provide {string} into todo', async (text) => {
  await defs.editTodo(driver, text);
});

When('I delete todo', async () => {
  await defs.deleteTodo(driver);
});

When('I mark todo as completed', async () => {
  await defs.markCompleted(driver);
});

When('I switch view to {string}', async (viewType) => {
  await defs.switchTo(driver, viewType.toLowerCase());
});

Then('I see the todo in list with title {string}', async (expectedTitle) => {
  if(expectedTitle=="long text") expectedTitle = data.textLongerThan256; //WA for keeping code clean
  const actualTitle = await defs.getTodoTitle(driver);
  assert.strictEqual(actualTitle, expectedTitle);
});

Then('I can see there is less than {int} todos in list', async (expectedLessThan) => {
  const actualCount = await defs.getTodosCount(driver);
  assert.strictEqual(actualCount < expectedLessThan, true);
});

Then('I can see there is {int} todos in list', async (expectedCount) => {
  const actualCount = await defs.getTodosCount(driver);
  assert.strictEqual(actualCount, expectedCount);
});

Then('I can see todo marked completed in list', async () => {
  const actualCount = await defs.getCompletedCount(driver);
  assert.strictEqual(actualCount, 1);
});

Then('I can see {string} text in todos counter', async (expectedText) => {
  const actualText = await defs.getCounterText(driver);
  assert.strictEqual(actualText, expectedText);
});

After({ tags: '@web' }, async () => {
  await defs.removeAllTodos(driver); //save time on closing/opening browser assuming deleting all todos reset the app to initial state; drawback - browser opens before all
});

AfterAll(async () => {
  await driver.quit();
});