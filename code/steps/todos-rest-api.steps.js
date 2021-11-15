const {Given, When, Then} = require('@cucumber/cucumber');
const chai = require('chai');  
const assert = chai.assert;
const rest = require('../rest/restMethods');
const config = require('../rest/config');

Given('A todo {}', function (request) {
    this.context['request'] = JSON.parse(request);
});
//In come cases id left unused, but IMHO it's better than having similar steps
Given('The todo with id {int} exist', async function (id) {
    this.context['id'] = id;
})

When('I send GET request to {}', async function (path) {
    const response = await rest.getData(`${config.baseUrl}${path}/${this.context['id']}`);
    this.context['response'] = response;
})

When('I send parameterized GET request to {} with params {}', async function (path, params) {
    const response = await rest.getData(`${config.baseUrl}${path}${params}`);
    this.context['response'] = response;
})

When('I send DELETE request to {}', async function (path) {
    const response = await rest.deleteData(`${config.baseUrl}${path}/${this.context['id']}`);
    this.context['response'] = response;
})

When('I send PATCH request with a {} to {}', async function (patchPayload, path) {
    const response = await rest.patchData(`${config.baseUrl}${path}/${this.context['id']}`, JSON.parse(patchPayload));
    this.context['response'] = response;
})

When('I send POST request to {}', async function (path) {
    this.context['response'] = await rest.postData(`${config.baseUrl}${path}`, this.context['request']);
})

When('I send PUT request with a {} to {}', async function (putPayload, path) {
    const response = await rest.patchData(`${config.baseUrl}${path}/${this.context['id']}`, JSON.parse(putPayload));
    this.context['response'] = response;
})

Then('I get response code {int}', async function (code) {
    assert.equal(this.context['response'].status, code);
});

Then(/^I receive response (.*)$/, async function (expectedResponse) {
    assert.deepEqual(this.context['response'].data, JSON.parse(expectedResponse));
})

Then(/^I receive as part of response (.*)$/, async function (expectedResponse) {
    assert.deepNestedInclude(this.context['response'].data, JSON.parse(expectedResponse));
})
