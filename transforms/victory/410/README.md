Replace `concurrently` with `builder concurrent`
================================================

This transform looks for allows `npm@2` use with Victory.

See: https://github.com/FormidableLabs/victory/pull/410

## Transform

We can try things out completely unauthenticated to make sure the repos are
appropriately transformed:

```sh
$ multibot \
  --no-auth \
  --gh-token=$TOKEN \
  --org FormidableLabs \
  --repos victory-chart victory-core victory-pie \
  --branch-dest=multibot-chore-supportNpm2 \
  --action=branch-to-pr \
  --files package.json \
  --transform="transforms/victory/410/transform.js" \
  --title=$"[multibot] Support npm v2" \
  --msg=$"$(cat transforms/victory/410/pr-message.md)" \
  --format=diff \
  --dry-run
```

This produces a diff that we can inspect to make sure that all the code changes
look sound with an imported [message](./pr-message.md).

Once we've confirmed that everything looks good, it's time for the full thing!
Replace `--gh-token=$TOKEN` with your actual GitHub auth token (or use username
and password per the documentation for multibot):

```sh
$ multibot \
  --gh-token=$TOKEN \
  --org FormidableLabs \
  --repos victory-chart victory-core victory-pie \
  --branch-dest=multibot-chore-supportNpm2 \
  --action=branch-to-pr \
  --files package.json \
  --transform="transforms/victory/410/transform.js" \
  --title=$"[multibot] Support npm v2" \
  --msg=$"$(cat transforms/victory/410/pr-message.md)" \
  --format=diff
```

And with that, we get our final output and we've opened a bunch of final form
pull requests!

## Create Pull Requests

With the above commands, `multibot` opened these handy PRs:

* https://github.com/FormidableLabs/victory-chart/pull/405
* https://github.com/FormidableLabs/victory-core/pull/161
* https://github.com/FormidableLabs/victory-pie/pull/121

Here is the output of our current run with links to all applicable PRs:

```diff
#############################################
# FormidableLabs/victory-chart/package.json #
#############################################
# - Branch Source: master
# - Branch Dest:   multibot-chore-supportNpm2
# - Branch Action: Create
# - Blob Action:   Update
# - PR URL:        https://github.com/FormidableLabs/victory-chart/pull/405
# - PR Exists:     false
# - Git SHA:       91acb92760795c7f1c6376a4e35737c322bdefbf
Index: FormidableLabs/victory-chart/package.json
===================================================================
--- FormidableLabs/victory-chart/package.json master
+++ FormidableLabs/victory-chart/package.json multibot-chore-supportNpm2
@@ -12,11 +12,10 @@
   "bugs": {
     "url": "https://github.com/formidablelabs/victory-chart/issues"
   },
   "homepage": "https://github.com/formidablelabs/victory-chart",
-  "engineStrict": true,
   "engines": {
-    "npm": ">=3.0.0"
+    "npm": ">=2.0.0"
   },
   "scripts": {
     "postinstall": "cd lib || builder run npm:postinstall",
     "preversion": "builder run npm:preversion",
@@ -25,9 +24,9 @@
     "benchmark": "builder run check-perf",
     "version": "builder run npm:version && git add dist && git commit -m \"Commit 'dist/' for publishing\""
   },
   "dependencies": {
-    "builder": "~2.9.1",
+    "builder": "^3.1.0",
     "builder-victory-component": "^3.0.0",
     "d3-voronoi": "^1.0.0",
     "lodash": "^4.12.0",
     "victory-core": "^9.0.2"


############################################
# FormidableLabs/victory-core/package.json #
############################################
# - Branch Source: master
# - Branch Dest:   multibot-chore-supportNpm2
# - Branch Action: Create
# - Blob Action:   Update
# - PR URL:        https://github.com/FormidableLabs/victory-core/pull/161
# - PR Exists:     false
# - Git SHA:       2c1a74fd97bb5f536151fa63ffe2e0faa0130e0a
Index: FormidableLabs/victory-core/package.json
===================================================================
--- FormidableLabs/victory-core/package.json  master
+++ FormidableLabs/victory-core/package.json  multibot-chore-supportNpm2
@@ -12,11 +12,10 @@
   "bugs": {
     "url": "https://github.com/FormidableLabs/victory-core/issues"
   },
   "homepage": "https://github.com/FormidableLabs/victory-core",
-  "engineStrict": true,
   "engines": {
-    "npm": ">=3.0.0"
+    "npm": ">=2.0.0"
   },
   "scripts": {
     "postinstall": "cd lib || builder run npm:postinstall",
     "preversion": "builder run npm:preversion",
@@ -24,9 +23,9 @@
     "test": "builder run check",
     "version": "builder run npm:version && git add dist && git commit -m \"Commit 'dist/' for publishing\""
   },
   "dependencies": {
-    "builder": "~2.9.1",
+    "builder": "^3.1.0",
     "builder-victory-component": "^3.0.0",
     "d3-ease": "^1.0.0",
     "d3-interpolate": "^1.1.1",
     "d3-scale": "^1.0.0",


###########################################
# FormidableLabs/victory-pie/package.json #
###########################################
# - Branch Source: master
# - Branch Dest:   multibot-chore-supportNpm2
# - Branch Action: Create
# - Blob Action:   Update
# - PR URL:        https://github.com/FormidableLabs/victory-pie/pull/121
# - PR Exists:     false
# - Git SHA:       de201103a3d26caea68631d8335370eb44eb0100
Index: FormidableLabs/victory-pie/package.json
===================================================================
--- FormidableLabs/victory-pie/package.json master
+++ FormidableLabs/victory-pie/package.json multibot-chore-supportNpm2
@@ -12,11 +12,10 @@
   "bugs": {
     "url": "https://github.com/FormidableLabs/victory-pie/issues"
   },
   "homepage": "https://github.com/FormidableLabs/victory-pie",
-  "engineStrict": true,
   "engines": {
-    "npm": ">=3.0.0"
+    "npm": ">=2.0.0"
   },
   "scripts": {
     "postinstall": "cd lib || builder run npm:postinstall",
     "preversion": "builder run npm:preversion",
@@ -26,9 +25,9 @@
     "storybook": "start-storybook -p 3001"
   },
   "dependencies": {
     "builder-victory-component": "^3.0.0",
-    "builder": "~2.9.1",
+    "builder": "^3.1.0",
     "d3-shape": "^1.0.0",
     "lodash": "^4.12.0",
     "victory-core": "^9.0.0"
   },
```
