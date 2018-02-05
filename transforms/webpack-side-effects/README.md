Add `sideEffects: false` to `package.json`
==========================================

This transform adds `sideEffects: false` to `package.json`s so webpack4 tree shaking actually works completely.

## Repos at issue

See: [repos](./repos.txt)

## Transform

The [`transform.js`](./transform.js) script has a few precautionary errors to
guarantee we limit the repos we act upon to just those meeting the heuristic.

We can try things out completely unauthenticated to make sure the repos are
appropriately transformed:

```sh
$ multibot \
  --no-auth \
  --org FormidableLabs \
  --repos $(cat transforms/webpack-side-effects/repos.txt | tr '\n' ' ') \
  --action=read \
  --files package.json \
  --transform="transforms/webpack-side-effects/transform.js" \
  --format=diff \
  --dry-run
```

This produces a diff that we can inspect to make sure that all the code changes
look sound. Once we agree this is the right course of action, we try a dry
run of the full code change - branch - pull request, using an imported
[message](./pr-message.md):

```sh
$ multibot \
  --no-auth \
  --org FormidableLabs \
  --repos $(cat transforms/webpack-side-effects/repos.txt | tr '\n' ' ') \
  --branch-dest=multibot-chore-webpackSideEffects \
  --action=branch-to-pr \
  --files package.json \
  --transform="transforms/webpack-side-effects/transform.js" \
  --title=$"[multibot] Add \`sideEffects: false\` to `package.json`" \
  --msg=$"$(cat transforms/webpack-side-effects/pr-message.md)" \
  --format=diff \
  --dry-run
```

Once we've confirmed that everything looks good, it's time for the full thing!
Replace `--gh-token=$TOKEN` with your actual GitHub auth token (or use username
and password per the documentation for multibot):

```sh
$ multibot \
  --gh-token=$TOKEN \
  --org FormidableLabs \
  --repos $(cat transforms/webpack-side-effects/repos.txt | tr '\n' ' ') \
  --branch-dest=multibot-chore-webpackSideEffects \
  --action=branch-to-pr \
  --files package.json \
  --transform="transforms/webpack-side-effects/transform.js" \
  --title=$"[multibot] Add \`sideEffects: false\` to `package.json`" \
  --msg=$"$(cat transforms/webpack-side-effects/pr-message.md)" \
  --format=diff
```

And with that, we get our final output and we've opened a bunch of final form
pull requests!

## Create Pull Requests

With the above commands, `multibot` opened these handy PRs:

* TODO

Here is the output of our current run with links to all applicable PRs:

```diff
TODO
```
