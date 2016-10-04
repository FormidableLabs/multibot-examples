Replace `concurrently` with `builder concurrent`
================================================

This transform looks for uses of `concurrently` to concurrently run npm tasks
and replaces them with `builder concurrent` commands instead.

Our basic heuristic is finding when `concurrently` is **only** used for multiple
`npm run <task>` invocations. We'll skip using concurrent to execute straight
bash commands because `builder concurrent` only works with tasks.

## Repos at issue

We do a basic query (using the wonderful [`jq`](https://stedolan.github.io/jq/)
JSON query helper):

```
$ curl -s "https://api.github.com/search/code?q=org%3AFormidableLabs+concurrently+filename%3Apackage.json" \
  | jq ".items[] | .repository.name"
"formidable-react-native-app-boilerplate"
"victory-standalone"
"redux-little-router"
"radium"
"spectacle-editor"
"measure-text"
"ecology"
"converter-react"
```

_Side Note_: The online GitHub query corresponding to this is: https://github.com/search?q=org%3AFormidableLabs+concurrently+filename%3Apackage.json&ref=searchresults&type=Code

This gives us a starting point of the world for our `multibot` transform.

After dry running the transforms below, our current efforts are:

* **Automatically convert**: `formidable-react-native-app-boilerplate
  victory-standalone spectacle-editor measure-text ecology converter-react` with
  `multibot`.
* **Manually convert**: `radium redux-little-router` because they have shell
  exec strings instead of `npm` tasks.

## Transform

We're only looking for `concurrently` invocations of the form:

```
concurrently 'npm run <task1>' 'npm run <task2>'
```

and not raw shell commands like:

```
concurrently 'echo foo' 'eslint lib'
```

If we find only the form uses, then our transform will:

1. Remove `concurrently` dependencies if completely unused.
2. Replace any `concurrently` dependencies in `dependencies` or
   `devDependencies` with `builder` if `concurrently` is used.
3. Mutate any npm tasks to switch `concurrently` to the `builder concurrent`
   analog.
4. Also sorts `dependencies` and `devDependencies` for cleaner diffs and
   because our projects should be doing this anyways.

The [`transform.js`](./transform.js) script has a few precautionary errors to
guarantee we limit the repos we act upon to just those meeting the heuristic.

We can try things out completely unauthenticated to make sure the repos are
appropriately transformed:

```sh
$ multibot \
  --no-auth \
  --org FormidableLabs \
  --repos formidable-react-native-app-boilerplate victory-standalone spectacle-editor measure-text ecology converter-react \
  --action=read \
  --files package.json \
  --transform="transforms/builder-concurrent/transform.js" \
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
  --repos formidable-react-native-app-boilerplate victory-standalone spectacle-editor measure-text ecology converter-react \
  --branch-dest=multibot-chore-convertConcurrently \
  --action=branch-to-pr \
  --files package.json \
  --transform="transforms/builder-concurrent/transform.js" \
  --title=$"[multibot] Replace \`concurrently\` in npm tasks with \`builder concurrent\`" \
  --msg=$"$(cat transforms/builder-concurrent/pr-message.md)" \
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
  --repos formidable-react-native-app-boilerplate victory-standalone spectacle-editor measure-text ecology converter-react \
  --branch-dest=multibot-chore-convertConcurrently \
  --action=branch-to-pr \
  --files package.json \
  --transform="transforms/builder-concurrent/transform.js" \
  --title=$"[multibot] Replace \`concurrently\` in npm tasks with \`builder concurrent\`" \
  --msg=$"$(cat transforms/builder-concurrent/pr-message.md)" \
  --format=diff
```

And with that, we get our final output and we've opened a bunch of final form
pull requests!

## Create Pull Requests

With the above commands, `multibot` opened these handy PRs:

* https://github.com/FormidableLabs/converter-react/pull/60
* https://github.com/FormidableLabs/ecology/pull/51
* https://github.com/FormidableLabs/formidable-react-native-app-boilerplate/pull/12
* https://github.com/FormidableLabs/measure-text/pull/3
* https://github.com/FormidableLabs/spectacle-editor/pull/211
* https://github.com/FormidableLabs/victory-standalone/pull/1

Here is the output of our current run with links to all applicable PRs:

```diff
#######################################################################
# FormidableLabs/formidable-react-native-app-boilerplate/package.json #
#######################################################################
# - Branch Source: master
# - Branch Dest:   multibot-chore-convertConcurrently
# - Branch Action: Create
# - Blob Action:   Update
# - PR URL:        https://github.com/FormidableLabs/formidable-react-native-app-boilerplate/pull/12
# - PR Exists:     false
# - Git SHA:       0f3b95dd7331f2b6c36635b9255357fccb6ab23d
Index: FormidableLabs/formidable-react-native-app-boilerplate/package.json
===================================================================
--- FormidableLabs/formidable-react-native-app-boilerplate/package.json master
+++ FormidableLabs/formidable-react-native-app-boilerplate/package.json multibot-chore-convertConcurrently
@@ -15,9 +15,8 @@
     "redux-logger": "^2.0.1",
     "redux-thunk": "^1.0.0"
   },
   "devDependencies": {
-    "concurrently": "^0.1.1",
     "eslint": "^1.6.0",
     "eslint-config-defaults": "^7.0.1",
     "eslint-plugin-filenames": "^0.1.2",
     "eslint-plugin-react": "^3.5.1"


##################################################
# FormidableLabs/victory-standalone/package.json #
##################################################
# - Branch Source: master
# - Branch Dest:   multibot-chore-convertConcurrently
# - Branch Action: Create
# - Blob Action:   Update
# - PR URL:        https://github.com/FormidableLabs/victory-standalone/pull/1
# - PR Exists:     false
# - Git SHA:       aa1e548488d3c0d17a2bde904736adc8b686ab93
Index: FormidableLabs/victory-standalone/package.json
===================================================================
--- FormidableLabs/victory-standalone/package.json  master
+++ FormidableLabs/victory-standalone/package.json  multibot-chore-convertConcurrently
@@ -14,9 +14,9 @@
     "clean-dist": "rimraf dist",
     "lint-source": "eslint --color --ext .js,.jsx src",
     "lint-config": "eslint --color --ext .js config",
     "lint-test": "eslint --color --ext .js,.jsx test",
-    "lint": "concurrently --kill-others 'npm run lint-source' 'npm run lint-config' 'npm run lint-test'"
+    "lint": "builder concurrent lint-source lint-config lint-test"
   },
   "author": "Matt Hink <matt.hink@formidable.com>",
   "license": "MIT",
   "devDependencies": {
@@ -27,9 +27,9 @@
     "babel-plugin-syntax-jsx": "^6.13.0",
     "babel-plugin-transform-react-display-name": "^6.8.0",
     "babel-plugin-transform-react-jsx": "^6.8.0",
     "babel-preset-es2015": "^6.14.0",
-    "concurrently": "^2.2.0",
+    "builder": "^3.1.0",
     "eslint": "^1.10.3",
     "eslint-config-defaults": "^7.0.1",
     "eslint-plugin-filenames": "^0.1.2",
     "eslint-plugin-mocha": "^1.1.0",


################################################
# FormidableLabs/spectacle-editor/package.json #
################################################
# - Branch Source: master
# - Branch Dest:   multibot-chore-convertConcurrently
# - Branch Action: Create
# - Blob Action:   Update
# - PR URL:        https://github.com/FormidableLabs/spectacle-editor/pull/211
# - PR Exists:     false
# - Git SHA:       6e72d19b7cf438a2c54aa942f6d006cdf6c2f1a0
Index: FormidableLabs/spectacle-editor/package.json
===================================================================
--- FormidableLabs/spectacle-editor/package.json  master
+++ FormidableLabs/spectacle-editor/package.json  multibot-chore-convertConcurrently
@@ -14,9 +14,9 @@
     "build": "npm run build-main && npm run build-renderer",
     "start": "cross-env NODE_ENV=production electron ./",
     "start-hot": "cross-env HOT=1 NODE_ENV=development electron -r babel-register ./app/main.development",
     "postinstall": "install-app-deps && node node_modules/fbjs-scripts/node/check-dev-engines.js package.json",
-    "dev": "concurrently --kill-others \"npm run hot-server\" \"npm run start-hot\"",
+    "dev": "builder concurrent hot-server start-hot",
     "release": "npm run build && npm run package-all",
     "package-all": "build -mwl",
     "package-mac": "build -m",
     "package-win": "build -w",
@@ -37,13 +37,13 @@
     "babel-preset-react": "^6.5.0",
     "babel-preset-react-hmre": "^1.1.1",
     "babel-preset-stage-0": "^6.5.0",
     "babel-register": "^6.7.2",
+    "builder": "^3.1.0",
     "chai": "^3.5.0",
     "chromedriver": "2.21.2",
     "classnames": "^2.2.5",
     "co-mocha": "^1.1.2",
-    "concurrently": "^2.0.0",
     "cross-env": "^1.0.7",
     "css-loader": "^0.23.1",
     "css-modules-require-hook": "^4.0.0",
     "del": "^2.2.0",


############################################
# FormidableLabs/measure-text/package.json #
############################################
# - Branch Source: master
# - Branch Dest:   multibot-chore-convertConcurrently
# - Branch Action: Create
# - Blob Action:   Update
# - PR URL:        https://github.com/FormidableLabs/measure-text/pull/3
# - PR Exists:     false
# - Git SHA:       d33193d3b5b9fc87e179a63c99373da71eb59a91
Index: FormidableLabs/measure-text/package.json
===================================================================
--- FormidableLabs/measure-text/package.json  master
+++ FormidableLabs/measure-text/package.json  multibot-chore-convertConcurrently
@@ -27,9 +27,9 @@
     "build": "npm run-script build-lib && npm run-script build-dist",
     "lint-server": "eslint --color -c config/eslint/.eslintrc-server *.js",
     "lint-client": "eslint --color --ext .js,.jsx -c config/eslint/.eslintrc-client src demo/*.jsx",
     "lint-client-test": "eslint --color --ext .js,.jsx -c config/eslint/.eslintrc-client-test src test/client",
-    "lint": "concurrent 'npm run-script lint-server' 'npm run-script lint-client' 'npm run-script lint-client-test'",
+    "lint": "builder concurrent lint-server lint-client lint-client-test",
     "test-frontend": "karma start config/karma/karma.conf.js",
     "test-frontend-ci": "karma start --browsers PhantomJS,Firefox config/karma/karma.conf.coverage.js",
     "test-frontend-cov": "karma start config/karma/karma.conf.coverage.js",
     "test-frontend-dev": "karma start config/karma/karma.conf.dev.js",
@@ -70,10 +70,10 @@
     "babel-eslint": "^5.0.0-beta6",
     "babel-polyfill": "^6.5.0",
     "babel-preset-es2015": "^6.5.0",
     "babel-register": "^6.5.1",
+    "builder": "^3.1.0",
     "chai": "^3.2.0",
-    "concurrently": "^1.0.0",
     "coveralls": "^2.11.6",
     "eslint": "^1.10.1",
     "eslint-config-defaults": "^8.0.2",
     "eslint-plugin-filenames": "^0.2.0",


#######################################
# FormidableLabs/ecology/package.json #
#######################################
# - Branch Source: master
# - Branch Dest:   multibot-chore-convertConcurrently
# - Branch Action: Create
# - Blob Action:   Update
# - PR URL:        https://github.com/FormidableLabs/ecology/pull/51
# - PR Exists:     false
# - Git SHA:       5e13d810649fd16764853e02060d2df8463a0b06
Index: FormidableLabs/ecology/package.json
===================================================================
--- FormidableLabs/ecology/package.json master
+++ FormidableLabs/ecology/package.json multibot-chore-convertConcurrently
@@ -28,13 +28,13 @@
     "build": "npm run build-lib && npm run build-dist",
     "server-dev": "webpack-dev-server --port 3000 --config demo/webpack.config.dev.js --colors --content-base demo",
     "server-hot": "webpack-dev-server --port 3000 --config demo/webpack.config.hot.js --colors --hot --inline --content-base demo",
     "server-test": "webpack-dev-server --port 3001 --config webpack.config.test.js --colors",
-    "dev": "concurrent -kr 'npm run server-dev' 'npm run server-test'",
-    "hot": "concurrent -kr 'npm run server-hot' 'npm run server-test'",
+    "dev": "builder concurrent server-dev server-test",
+    "hot": "builder concurrent server-hot server-test",
     "open-demo": "opener http://127.0.0.1:3000",
-    "open-dev": "concurrent -kr 'npm run dev' 'npm run open-demo'",
-    "open-hot": "concurrent -kr 'npm run hot' 'npm run open-demo'",
+    "open-dev": "builder concurrent dev open-demo",
+    "open-hot": "builder concurrent hot open-demo",
     "lint-server": "eslint -c .eslintrc-server *.js demo/webpack.*.js",
     "lint-client": "eslint --ext .js,.jsx -c .eslintrc-client src demo/*.jsx",
     "lint-client-test": "eslint --ext .js,.jsx -c .eslintrc-client-test src test/client",
     "lint": "npm run lint-server && npm run lint-client && npm run lint-client-test",
@@ -75,10 +75,10 @@
   },
   "devDependencies": {
     "autoprefixer-loader": "^3.1.0",
     "babel-eslint": "^5.0.0",
+    "builder": "^3.1.0",
     "chai": "^3.2.0",
-    "concurrently": "^1.0.0",
     "eslint": "^1.10.1",
     "eslint-config-defaults": "^4.2.0",
     "eslint-plugin-filenames": "^0.1.2",
     "eslint-plugin-react": "^2.6.4",


###############################################
# FormidableLabs/converter-react/package.json #
###############################################
# - Branch Source: master
# - Branch Dest:   multibot-chore-convertConcurrently
# - Branch Action: Create
# - Blob Action:   Update
# - PR URL:        https://github.com/FormidableLabs/converter-react/pull/60
# - PR Exists:     false
# - Git SHA:       eba2b570b01a72915481aa3d60ecc4ab831aab63
Index: FormidableLabs/converter-react/package.json
===================================================================
--- FormidableLabs/converter-react/package.json master
+++ FormidableLabs/converter-react/package.json multibot-chore-convertConcurrently
@@ -40,11 +40,11 @@
     "server-wds-hot": "webpack-dev-server --config webpack.config.hot.js --hot --progress --colors --port 2992 --inline",
     "server-wds-test": "webpack-dev-server --port 3001 --config webpack.config.test.js --colors",
     "sources": "http-server -p 3001 .",
     "watch": "webpack --watch --colors",
-    "prod": "concurrent -kr 'npm run watch' 'npm run server' 'npm run sources'",
-    "dev": "concurrent -kr 'npm run server-wds-test' 'npm run server-wds-dev' 'npm run server-dev'",
-    "hot": "concurrent -kr 'npm run server-wds-test' 'npm run server-wds-hot' 'npm run server-hot'",
+    "prod": "builder concurrent watch server sources",
+    "dev": "builder concurrent server-wds-test server-wds-dev server-dev",
+    "hot": "builder concurrent server-wds-test server-wds-hot server-hot",
     "build": "webpack",
     "install-dev": "selenium-standalone install",
     "postinstall": "node heroku/scripts/not-heroku.js || (node heroku/scripts/install.js && npm run build)"
   },
@@ -96,10 +96,10 @@
     "webpack-stats-plugin": "0.1.0"
   },
   "devDependencies": {
     "babel-eslint": "^4.0.10",
+    "builder": "^3.1.0",
     "chai": "^3.2.0",
-    "concurrently": "^0.1.1",
     "coveralls": "^2.11.4",
     "eslint": "^1.2.1",
     "eslint-config-defaults": "^4.2.0",
     "eslint-plugin-filenames": "^0.1.2",
```
