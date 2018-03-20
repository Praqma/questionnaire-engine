'use strict';var formDB = require('./formDB');
var yamlData = require('./yamlData');
var expect = require('chai').expect;

describe('Questionnaire', function () {
  describe('template', function () {
    var jsonData = yamlData.getQuestionnaireById('template');
    it('should exist with own ID', function () {
      expect(jsonData).to.include({
        id: 'template' });

    });
  });
});

describe('Results', function () {
  describe('template', function () {
    it('should return object as array with minimum 4 forms', function (done) {
      // call asycn function and wait for callback
      formDB.getAllAnswersById('template', function (err, data) {
        var results = data.results;

        // testing expectations
        expect(results).to.be.an('array');
        expect(results).to.have.lengthOf.at.least(3);

        // finish test execution
        done();
      });
    }).timeout(3000);
  });
});