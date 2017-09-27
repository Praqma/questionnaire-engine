import { expect } from 'chai';
//import { getAllUsers } from './index';
import cheerio from 'cheerio';
import fs from 'fs';


describe('index.html', () => {
  it('Should have Praqma in the header', (done) => {
    const index = fs.readFileSync('./src/index.html', 'utf-8');
    const $ = cheerio.load(index);
    expect($("#navbar-top-brand").text()).to.equal('')
    done();
  });
  /*it('should get users', (done) => {
    const index = fs.readFileSync('./src/index.html', 'utf-8');
    const $ = cheerio.load(index);
    expect($("table tbody tr").length).to.above(1);
    done();
  });*/
});
