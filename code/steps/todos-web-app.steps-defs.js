const until = require('selenium-webdriver/lib/until');
const { Key } = require('selenium-webdriver');

const page = require('../page-object/todos-web-app-page');
const data = require('../../test-data/common-data');
const timeout = 30000;

module.exports = {
    deleteTodo,
    doubleClickTodoAndClear,
    editTodo,
    fillInput,
    getCompletedCount,
    getCounterText,
    getTodosCount,
    getTodoTitle,
    markCompleted,
    openApp,
    prepareTodos,
    removeAllTodos,
    sendEnter,
    switchTo
}

async function openApp(driver) {
    await driver.get(page.url);
    await driver.wait(until.elementLocated(page.input), timeout, 'Timed out after 30 seconds', timeout/30); //since page is marked as ready before elements appears
}

async function fillInput(driver, text) {
    if(text=="long text") text = data.textLongerThan256; 
    const element = await driver.findElement(page.input);
    await element.sendKeys(text);
}

async function sendEnter(driver) {
    const actions = driver.actions({bridge: true});
    await actions.keyDown(Key.ENTER).keyUp(Key.ENTER).perform();
    await driver.wait(until.elementLocated(page.listElement), timeout, 'Timed out after 30 seconds', timeout/30);
}

async function getTodoTitle(driver) {
    return await driver.findElement(page.listElement).getText();
}

async function removeAllTodos(driver) {
    await switchTo(driver, "all");
    let todosToMark = await driver.findElements(page.notCompletedTodosRadio);
    todosToMark.forEach(element => {
        element.click();
    });
    await driver.wait(until.elementLocated(page.clearCompletedButton), timeout, 'Timed out after 30 seconds', timeout/30);
    await driver.findElement(page.clearCompletedButton).click();
}

async function prepareTodos(driver, count) {
    for (let i = 0; i < count; i++) {
        await fillInput(driver, data.textForPreparedTodo.concat(i + 1));
        await sendEnter(driver);
    }
}

async function doubleClickTodoAndClear(driver) {
    const actions = driver.actions({bridge: true});
    await actions.doubleClick(driver.findElement(page.listElement)).keyDown(Key.CONTROL).sendKeys("a").keyUp(Key.CONTROL).sendKeys(Key.BACK_SPACE).perform();
}

async function editTodo(driver, text) {
    const actions = driver.actions({bridge: true});
    await actions.sendKeys(text).perform();
    await sendEnter(driver);
}

async function deleteTodo(driver) {
    const actions = driver.actions({bridge: true});
    await actions.move({duration: 100, origin: driver.findElement(page.listElement)}).perform();
    await actions.click(driver.findElement(page.deleteButton)).perform();
}

async function getTodosCount(driver) {
    let count = 0;
    await driver.findElements(page.listElement).then(elements => count = elements.length);
    return count;
}

async function getCompletedCount(driver) {
    let count = 0;
    await driver.findElements(page.completedTodo).then(elements => count = elements.length);
    return count;
}

async function getCounterText(driver) {
    return await driver.findElement(page.counter).getText();
}

async function markCompleted(driver) {
    await driver.findElement(page.radioCheck).click();
}

async function switchTo(driver, viewType) {
    switch(viewType) {
        case 'active':
            await driver.findElement(page.activeViewButton).click();
            break;
        case 'completed':
            await driver.findElement(page.completedViewButton).click();
            break;
        default:
            //all
            await driver.findElement(page.allViewButton).click();
      }
}