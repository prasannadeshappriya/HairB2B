/**
 * Created by prasanna_d on 8/11/2017.
 */

describe('angularjs homepage todo list', function() {
    var mail = 'prasannadeshappriya@gmail.com';
    var password = '12345678';

    var EC = protractor.ExpectedConditions;
    it('should have the title', function() {
        browser.get('http://localhost:4000/HairB2B/index.html#!/');
        expect(browser.getTitle()).toEqual('HairB2B');
    });

    it('should sign in the user', function() {
        browser.get('http://localhost:4000/HairB2B/index.html#!/');

        var btn_sign_in = element(by.id('signin'));
        btn_sign_in.click();

        var uemail= element(by.id('uemail'));
        browser.wait(EC.visibilityOf(uemail), 5000);
        var upassword= element(by.id('upassword'));
        browser.wait(EC.visibilityOf(upassword), 5000);

        uemail.sendKeys(mail);
        upassword.sendKeys(password);

        element(by.id("usign_in_btn")).click();
    });

    it('should go to user profile', function(){
        var drop_down = element(by.id('user_dropdown'));
        browser.wait(EC.visibilityOf(drop_down), 5000);
        drop_down.click();
        element(by.id('myprofile')).click();
    });

    it('should check username and email', function(){
        name = element(by.id('u_p_title')).getText();
        expect(name).toEqual('Malaka Fernando');

        email = element(by.id('u_p_email')).getText();
        expect(email).toEqual('prasannadeshappriya@gmail.com')
    });
});