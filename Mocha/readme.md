# Mocha Yeti adaptor

Super simple adaptor you can drop straight into your Mocha test suite. Place the `mocha-yeti-adaptor.js` file right after the mocha.js file.

In order for Yeti to know what to pass back and if any tests failed etc you need to do a small bit of setup code.

```js
var runner = mocha.run();
        
BUNYIP.hookup(runner);
```

You'll need to get the runner environment and pass it into the `BUNYIP.hookup` method.

Now when you run your test suite through yeti it'll work!