var assert = require("assert"); // node.js core module
var formDb = require('./formDB')
var yamlData = require('./yamlData')
var expect = require('chai').expect

describe('Questionnaire', function(){
  describe('Template', function(){
    let jsonData = yamlData.getQuestionnaireById('template')
    it('should exist with id', function(){
      expect(jsonData).to.include({id: 'template'})
    })
  })
});
