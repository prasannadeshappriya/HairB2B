/**
 * Created by prasanna_d on 8/2/2017.
 */
var casper = require('casper').create();
casper.start('https://google.lk');

casper.then(function() {
    this.echo(this.getTitle());
});

casper.thenOpen('http://phantomjs.org', function() {
    this.echo('Second Page: ' + this.getTitle());
});

casper.run();