/**
 * Created by prasanna_d on 8/3/2017.
 */
casper.test.begin('Testing Home Page', 7, function(test){
    casper.start('http://localhost:63342/HairB2B/#!/');

    //To get the x path
    var x = require('casper').selectXPath;

    //User is not logged in to the system
    //Check all the fields are exist in the home page

    //Authentication
    //Check for Sigh Up button
    casper.then(function() {
        this.test.assertExists(x('//*[@id="signup"]'), 'Sign up button exist');
    });
    //Check for Sign In button
    casper.then(function() {
        this.test.assertExists(x('//*[@id="signin"]'), 'Sign in button exist')
    });

    //Search box
    //Check for search jobtype dropdown list
    casper.then(function() {
        this.test.assertExists(x('//*[@id="jobtype"]'), 'Jobtype dropdown for search is exist');
    });
    //Check for search skill dropdown list
    casper.then(function() {
        this.test.assertExists(x('//*[@id="skill"]'), 'Skill dropdown for search is exist');
    });
    //Check for Search button
    casper.then(function() {
        this.test.assertExists(x('/html/body/div[2]/div[2]/div/div/div[2]/input'), 'Search button is exist');
    });

    //Check for models [Signin/Signup]
    casper.then(function() {
        this.test.assertExists(x('//*[@id="signin_model"]/div/div/div'), 'Sign In model is exist');
        this.test.assertExists(x('//*[@id="signup_model"]/div/div/div'), 'Sign Up model is exist');
    });

    casper.then(function() {
        // this.clickLabel('Log in', 'a');
        // this.clickLabel('TEST', 'a');
        // this.click(x('//*[@id="signin"]'));
        this.wait(200);
        this.capture('jashdfasfhasjidfh.png');
        //.click('a[data-lp-signin-nav="1"]');
    });
    casper.then(function() {
        this.capture('modal.png');
        this.sendKeys('#email', "prasannadeshappriya@gmail.com");
        this.sendKeys('#password', "12345678");
        // this.click(x('//*[@id="signin_model"]/div/div/div/div/form/div[4]/input'));
        // this.clickLabel('TEST', 'a');
    });
    casper.then(function() {
        this.wait(3000);
        this.capture('logged_in.png');
    });

    // casper.then(function() {
    //     this.click(x('//*[@id="signin"]'));
    //     this.wait(200);
    //     this.capture('aaaaaaa.png');
    //
    //     this.clickLabel('Log in','a');
    //     this.sendKeys('#email', 'prasannadeshappriya@gmail.com');
    //     this.sendKeys('#password', 'aaaaaa');
    //     this.click(x('//*[@id="signin_model"]/div/div/div/div/form/div[4]/input'));
    //     //Give timeout and take screenshots
    //     this.wait(3000);
    //     this.capture('sample.png');
    // });

    casper.run(function(){
        test.done();
    })
});

