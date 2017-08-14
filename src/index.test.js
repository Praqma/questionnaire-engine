import { expect } from 'chai';
//import { getAllUsers } from './index';
import cheerio from 'cheerio';
import fs from 'fs';

describe('My first test', () => {
  it('Should pass', () => {
    expect(true).to.equal(true);
  });
});

describe('index.html', () => {
  it('Should say hello', (done) => {
    const index = fs.readFileSync('./src/index.html', 'utf-8');
    const $ = cheerio.load(index);
    expect($("h1").text()).to.equal('Users');
    done();
  });
  /*it('should get users', (done) => {
    const index = fs.readFileSync('./src/index.html', 'utf-8');
    const $ = cheerio.load(index);
    expect($("table tbody tr").length).to.above(1);
    done();
  });*/
});
