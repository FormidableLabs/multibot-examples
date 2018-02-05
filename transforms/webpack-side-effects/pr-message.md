`webpack@4` / `webpack@next` will support `package.json:sideEffects: false` wherein libraries can indicate their ESM re-exports are side effect free and can be much more efficiently removed for smaller, faster final bundles.

Lodash has already rolled out this change in
https://unpkg.com/lodash-es@4.17.5/package.json

## Issues

This was originally uncovered / discussed at length in:

* https://github.com/webpack/webpack/issues/1750

This PR should resolve the issues discussed in:

* https://github.com/FormidableLabs/victory/issues/549
* https://github.com/FormidableLabs/redux-little-router/issues/262

## Changes

* Add `sideEffects: false` to `package.json` to allow webpack4 tree-shaking to actually remove all unused code.

> This PR has been automatically opened by your friendly [`multibot`](https://github.com/FormidableLabs/multibot/). The transform code and documentation is available at: https://github.com/FormidableLabs/multibot-examples/tree/master/transforms/webpack-side-effects
