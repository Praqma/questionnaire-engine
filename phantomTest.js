const url = 'http://localhost:3000/'

var page = require('webpage').create();
page.open(url, function(status) {
  console.log("Status: " + status);
  if(status === "success") {
    // page.render('example.png');
  } else {
    console.log('Smoke detected... could not load webpage: ', url)
    return process.exit(1)
  }
  phantom.exit();
});
