/**
 * Created by prasanna_d on 8/3/2017.
 */

casper.test.begin('Testing Home Page', 1, function(test){
    casper.start('http://localhost:63342/HairB2B/#!/');

    casper.then(function(){
        test.assertTitle('HairB2B', 'HairB2B has correct title');
    });

    casper.run(function(){
        test.done();
    })
});