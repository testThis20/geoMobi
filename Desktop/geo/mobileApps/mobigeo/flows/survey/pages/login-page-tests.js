define(['vb/test/TestUtils'], function(TestUtils) {
    'use strict';

    describe('mobileApps/mobigeo/flows/survey/pages/login-page', function() {

        describe('UsernameInput', function() {

            it('Test 1', async function() {
                const context = await TestUtils.getContext(this);
                const mocks = await TestUtils.getMocks(this);
                const results = await TestUtils.run(this, context, mocks);
                const expectations = await TestUtils.getExpectations(this);
                await TestUtils.verifyExpectations(this, results, expectations);
            });

        });

        describe('SignIn', function() {

        });

    });
});