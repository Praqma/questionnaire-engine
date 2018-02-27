var system = require('system');
var args = system.args;

if (args.length === 1) {
  console.error('Try to pass some arguments when invoking this script!');
}
const url = 'http://' + args[1]

var page = require('webpage').create();
page.open(url, function(status) {
  console.log("Status: " + status);
  if(status === "success") {
    // page.render('example.png');
  } else {
    console.error('Smoke detected... could not load webpage: ', url)
  }
  phantom.exit();
});
