# Obsolete!!!11!

I landed a [PR in Yeti](https://github.com/yui/yeti/commit/de201e8474b7138aab00a6810165ad3d3c5f6824) to add built-in support for Mocha, Jasmine and better output for QUnit. If you grab >= 0.2.14 you don't need adaptors anymore.

# Some specific hints to make sure your tests run correctly

## QUnit

In order for Yeti or Bunyip to collect results you may need to add this code block to your test suite.

```js
if("$yetify" in window) {
	QUnit.config.autostart = false;
}
```

Sometimes QUnit will autorun before Yeti can attach to the QUnit logging events. There is a known issue with `asyncTest()` see [#117](http://yuilibrary.com/projects/yeti/ticket/117)

## Jasmine

Same goes for Jasmine tests, Yeti will kick of the tests when it's ready so wrap your execute call in this block.

```js
if(!("$yetify" in window)) {
	jasmineEnv.execute();
}
```

Where `jasmineEnv` is a reference to `jasmine.getEnv()`.

## Mocha

Mocha, like Jasmine, should only trigger a run when not being fed through Yeti/Bunyip.

```js
if(!("$yetify" in window)) {
    var runner = mocha.run();
}
```

# Yeti adaptors

A collection of adaptors so you can use Yahoo's [Yeti](https://github.com/yui/yeti) tool with other unit testing frameworks.

To find out how you can use them navigate to the unit testing framework you use.

## Contribute

I've only done adaptors for jasmine and QUnit, but if you use another framework feel free to fork and add it in the same style as the other examples.