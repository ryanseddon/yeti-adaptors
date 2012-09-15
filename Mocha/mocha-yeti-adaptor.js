/*
 * - BUNYIP - http://github.com/ryanseddon/bunyip
 * Yeti Mocha adaptor, drop this in a test suite that will run through Yeti.
 * See readme.md for specific instructions.
 * MIT License - Copyright (c) 2012 Ryan Seddon
 * http://github.com/ryanseddon/yeti-adpators
*/

var BUNYIP = BUNYIP || {};

(function(win, undef){

    var testsuite = {}, spec,
        tostring = {}.toString, tests = {},
        passed = 0, failed = 0, total = 0;
    
    BUNYIP = testsuite;
    
    /* Yeti uses socket.io and emits a results event when test suite has completed */
    function complete(results) {
        if (win.$yetify !== undef) {
            $yetify.tower.emit("results", results);
        }
    }
    
    BUNYIP.hookup = function(runner) {
        
        var BUNYIP = {}, tests = {},
            passed = 0, failed = 0, total = 0;

        runner.on('test end', function(test){
            var suiteName = test.title;

            tests[suiteName] = {
                message: (test.state === 'failed') ? test.err.message : "",
                result: (test.state === 'passed') ? true : "fail",
                name: suiteName
                //actual: test.err.actual,
                //expected: test.err.expected
            };

            passed = (test.state === 'passed') ? passed+1 : passed;
            failed = (test.state === 'failed') ? failed+1 : failed;
            total = total+1;
        });


        runner.on('suite end', function(module){
            if(module.suites.length === 0) {
                var suiteName = module.fullTitle();

                BUNYIP[suiteName] = {
                    name: suiteName,
                    passed: passed,
                    failed: failed,
                    total: total
                };

                for (var i in tests) {
                    BUNYIP[suiteName][tests[i].name] = {
                        result: tests[i].result,
                        message: tests[i].message,
                        name: tests[i].name
                    };
                }

                tests = {};
                passed = failed = total = 0;
            }
        });
        runner.on('end', function(test){
            var results = BUNYIP;
            
            results.passed = (runner.total - runner.failures) || 0;
            results.failed = runner.failures || 0;
            results.total = runner.total;
            // TODO: How do I get the test suite runtime?
            results.duration = 0;
            results.name = document.title;

            // Delete the hookup prop once complete
            delete results.hookup;

            complete(results);
        });
    };

})(this);