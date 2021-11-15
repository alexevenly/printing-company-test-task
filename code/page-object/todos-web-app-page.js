const { By } = require('selenium-webdriver');

module.exports = {
  url: 'https://todomvc.com/examples/react/#/',
  activeViewButton: By.css('a[href$=\'active\']'),
  allViewButton: By.css('a[href$=\'#/\']'),
  clearCompletedButton: By.css('button.clear-completed'),
  completedTodo: By.css('li.completed'),
  completedViewButton: By.css('a[href$=\'completed\']'),
  counter: By.css('span.todo-count'),
  deleteButton: By.css('button.destroy'),
  input: By.css('.new-todo'),
  listElement: By.css('.view label'),
  notCompletedTodosRadio: By.css('li:not(.completed) input.toggle'),
  radioCheck: By.css('input.toggle')
};
