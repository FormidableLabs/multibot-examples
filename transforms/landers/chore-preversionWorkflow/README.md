Implement an `npm version` workflow for landers
===============================================

This transform makes all landers support a publish static to `npm` registry
step via `npm version` workflow with documentation.

## Transform

We can try things out completely unauthenticated to make sure the repos are
appropriately transformed:

```sh
$ multibot \
  --no-auth \
  --gh-token=$TOKEN \
  --org FormidableLabs \
  --repos builder-docs component-playground-docs formidable-charts-docs formidable-playbook-docs radium-docs spectacle-docs spectacle-editor-docs victory-docs \
  --branch-dest=multibot-chore-preversionWorkflow \
  --action=branch-to-pr \
  --files package.json .npmignore .gitignore README.md \
  --transform="transforms/landers/chore-preversionWorkflow/transform.js" \
  --title=$"[multibot] Implement npm version workflow" \
  --msg=$"$(cat transforms/landers/chore-preversionWorkflow/pr-message.md)" \
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
  --repos builder-docs component-playground-docs formidable-charts-docs formidable-playbook-docs radium-docs spectacle-docs spectacle-editor-docs victory-docs \
  --branch-dest=multibot-chore-preversionWorkflow \
  --action=branch-to-pr \
  --files package.json .npmignore .gitignore README.md \
  --transform="transforms/landers/chore-preversionWorkflow/transform.js" \
  --title=$"[multibot] Implement npm version workflow" \
  --msg=$"$(cat transforms/landers/chore-preversionWorkflow/pr-message.md)" \
  --format=diff
```

And with that, we get our final output and we've opened a bunch of final form
pull requests!

## Create Pull Requests

With the above commands, `multibot` opened these handy PRs:

* https://github.com/FormidableLabs/builder-docs/pull/32
* https://github.com/FormidableLabs/component-playground-docs/pull/17
* https://github.com/FormidableLabs/formidable-charts-docs/pull/17
* https://github.com/FormidableLabs/formidable-playbook-docs/pull/16
* https://github.com/FormidableLabs/radium-docs/pull/39
* https://github.com/FormidableLabs/spectacle-docs/pull/40
* https://github.com/FormidableLabs/spectacle-editor-docs/pull/23
* https://github.com/FormidableLabs/victory-docs/pull/179

Here is the output of our current run with links to all applicable PRs:

```diff
############################################
# FormidableLabs/builder-docs/package.json #
############################################
# - Branch Source: master
# - Branch Dest:   multibot-chore-preversionWorkflow
# - Branch Action: Create
# - Blob Action:   Update
# - PR URL:        https://github.com/FormidableLabs/builder-docs/pull/32
# - PR Exists:     false
# - Git SHA:       e12455a811e45ec32ca7e34abd264cf048697805
Index: FormidableLabs/builder-docs/package.json
===================================================================
--- FormidableLabs/builder-docs/package.json  master
+++ FormidableLabs/builder-docs/package.json  multibot-chore-preversionWorkflow
@@ -3,11 +3,12 @@
   "version": "0.0.1",
   "description": "Marketing/documentation site for Builder",
   "main": "webpack.config.dev.js",
   "scripts": {
-    "update-project": "npm update builder",
+    "preversion": "builder run npm:preversion",
+    "start": "builder run dev",
     "test": "builder run lint",
-    "start": "builder run dev"
+    "update-project": "npm update builder"
   },
   "repository": {
     "type": "git",
     "url": "git+https://github.com/FormidableLabs/builder-docs.git"
@@ -18,13 +19,13 @@
     "url": "https://github.com/FormidableLabs/builder-docs/issues"
   },
   "homepage": "https://github.com/FormidableLabs/builder-docs#readme",
   "devDependencies": {
-    "builder-docs-archetype-dev": "^2.0.0"
+    "builder-docs-archetype-dev": "^4.2.1"
   },
   "dependencies": {
-    "builder": "FormidableLabs/builder",
-    "builder-docs-archetype": "^2.0.0",
+    "builder": "^3.1.0",
+    "builder-docs-archetype": "^4.2.1",
     "formidable-landers": "^3.0.0",
     "marked": "^0.3.5",
     "prismjs": "^1.4.1",
     "radium": "^0.17.1",


##########################################
# FormidableLabs/builder-docs/.npmignore #
##########################################
# - Branch Source: master
# - Branch Dest:   multibot-chore-preversionWorkflow
# - Branch Action: Create
# - Blob Action:   Create
# - PR URL:        https://github.com/FormidableLabs/builder-docs/pull/32
# - PR Exists:     false
# - Git SHA:       72792f6fa7d257f231392816b94abddd7af19b22
Index: FormidableLabs/builder-docs/.npmignore
===================================================================
--- FormidableLabs/builder-docs/.npmignore  master
+++ FormidableLabs/builder-docs/.npmignore  multibot-chore-preversionWorkflow
@@ -1,0 +1,14 @@
\ No newline at end of file
+\.git
+\.hg
+
+\.DS_Store
+\.project
+bower_components
+node_modules
+npm-debug\.log*
+phantomjsdriver\.log
+
+# Build
+coverage
+Procfile
+yarn.lock


##########################################
# FormidableLabs/builder-docs/.gitignore #
##########################################
# - Branch Source: master
# - Branch Dest:   multibot-chore-preversionWorkflow
# - Branch Action: Create
# - Blob Action:   Update
# - PR URL:        https://github.com/FormidableLabs/builder-docs/pull/32
# - PR Exists:     false
# - Git SHA:       b4d0bd67e7e00749c0915d0c6fa26caa6c0bf157
Index: FormidableLabs/builder-docs/.gitignore
===================================================================
--- FormidableLabs/builder-docs/.gitignore  master
+++ FormidableLabs/builder-docs/.gitignore  multibot-chore-preversionWorkflow
@@ -8,9 +8,8 @@
 npm-debug\.log*
 phantomjsdriver\.log

 # Build
-dist
-*/dist
 coverage
 Procfile
 build
+yarn.lock


#########################################
# FormidableLabs/builder-docs/README.md #
#########################################
# - Branch Source: master
# - Branch Dest:   multibot-chore-preversionWorkflow
# - Branch Action: Create
# - Blob Action:   Update
# - PR URL:        https://github.com/FormidableLabs/builder-docs/pull/32
# - PR Exists:     false
# - Git SHA:       7e32c06b1e4db32a4525c770f2bc2937a8fdaa72
Index: FormidableLabs/builder-docs/README.md
===================================================================
--- FormidableLabs/builder-docs/README.md master
+++ FormidableLabs/builder-docs/README.md multibot-chore-preversionWorkflow
@@ -29,4 +29,6 @@
 travis encrypt-file ~/.ssh/deploy_static.pem --add
 ```

 Note: Make sure the travis config does not preserve the `~/.ssh/` filepath.
+
+To release this lander, please follow the [archetype release instructions](https://github.com/FormidableLabs/builder-docs-archetype#lander-release) for our `npm version` workflow.


#########################################################
# FormidableLabs/component-playground-docs/package.json #
#########################################################
# - Branch Source: master
# - Branch Dest:   multibot-chore-preversionWorkflow
# - Branch Action: Create
# - Blob Action:   Update
# - PR URL:        https://github.com/FormidableLabs/component-playground-docs/pull/17
# - PR Exists:     false
# - Git SHA:       b95e0b2e3a75b7e9fc2975c39443211e0ed27212
Index: FormidableLabs/component-playground-docs/package.json
===================================================================
--- FormidableLabs/component-playground-docs/package.json master
+++ FormidableLabs/component-playground-docs/package.json multibot-chore-preversionWorkflow
@@ -3,10 +3,11 @@
   "version": "0.0.1",
   "description": "Documentation site for Component Playground",
   "main": "webpack.config.dev.js",
   "scripts": {
+    "dev": "webpack-dev-server --port 3000 --config node_modules/builder-docs-archetype/config/webpack/webpack.config.dev.js --history-api-fallback",
+    "preversion": "builder run npm:preversion",
     "start": "builder run dev",
-    "dev": "webpack-dev-server --port 3000 --config node_modules/builder-docs-archetype/config/webpack/webpack.config.dev.js --history-api-fallback",
     "test": "builder run lint",
     "update-project": "npm update component-playground"
   },
   "repository": {
@@ -19,16 +20,16 @@
     "url": "https://github.com/FormidableLabs/component-playground-docs/issues"
   },
   "homepage": "https://github.com/FormidableLabs/component-playground-docs#readme",
   "devDependencies": {
-    "builder-docs-archetype-dev": "^4.1.1",
+    "builder-docs-archetype-dev": "^4.2.1",
     "react-docgen": "2.7.0"
   },
   "dependencies": {
     "anchorate": "^1.1.0",
     "babel-preset-stage-1": "^6.5.0",
-    "builder": "^2.9.1",
-    "builder-docs-archetype": "^4.1.1",
+    "builder": "^3.1.0",
+    "builder-docs-archetype": "^4.2.1",
     "chai": "^3.2.0",
     "component-playground": "FormidableLabs/component-playground",
     "ecology": "^1.6.0",
     "formidable-landers": "^5.1.0",
@@ -49,7 +50,7 @@
     "react-router": "^2.0.1",
     "react-router-scroll": "^0.2.0",
     "sinon": "^1.17.2",
     "sinon-chai": "^2.8.0",
-    "victory": "^0.12.1"
+    "victory": "*"
   }
 }


#######################################################
# FormidableLabs/component-playground-docs/.npmignore #
#######################################################
# - Branch Source: master
# - Branch Dest:   multibot-chore-preversionWorkflow
# - Branch Action: Create
# - Blob Action:   Create
# - PR URL:        https://github.com/FormidableLabs/component-playground-docs/pull/17
# - PR Exists:     false
# - Git SHA:       72792f6fa7d257f231392816b94abddd7af19b22
Index: FormidableLabs/component-playground-docs/.npmignore
===================================================================
--- FormidableLabs/component-playground-docs/.npmignore master
+++ FormidableLabs/component-playground-docs/.npmignore multibot-chore-preversionWorkflow
@@ -1,0 +1,14 @@
\ No newline at end of file
+\.git
+\.hg
+
+\.DS_Store
+\.project
+bower_components
+node_modules
+npm-debug\.log*
+phantomjsdriver\.log
+
+# Build
+coverage
+Procfile
+yarn.lock


#######################################################
# FormidableLabs/component-playground-docs/.gitignore #
#######################################################
# - Branch Source: master
# - Branch Dest:   multibot-chore-preversionWorkflow
# - Branch Action: Create
# - Blob Action:   Update
# - PR URL:        https://github.com/FormidableLabs/component-playground-docs/pull/17
# - PR Exists:     false
# - Git SHA:       b4d0bd67e7e00749c0915d0c6fa26caa6c0bf157
Index: FormidableLabs/component-playground-docs/.gitignore
===================================================================
--- FormidableLabs/component-playground-docs/.gitignore master
+++ FormidableLabs/component-playground-docs/.gitignore multibot-chore-preversionWorkflow
@@ -11,4 +11,5 @@
 # Build
 coverage
 Procfile
 build
+yarn.lock


######################################################
# FormidableLabs/component-playground-docs/README.md #
######################################################
# - Branch Source: master
# - Branch Dest:   multibot-chore-preversionWorkflow
# - Branch Action: Create
# - Blob Action:   Update
# - PR URL:        https://github.com/FormidableLabs/component-playground-docs/pull/17
# - PR Exists:     false
# - Git SHA:       3c3a648fff5e28ceaec7a1c8d13ba168928eea96
Index: FormidableLabs/component-playground-docs/README.md
===================================================================
--- FormidableLabs/component-playground-docs/README.md  master
+++ FormidableLabs/component-playground-docs/README.md  multibot-chore-preversionWorkflow
@@ -1,2 +1,4 @@
 # component-playground-docs
 A component for rendering React components with editable source and live preview
+
+To release this lander, please follow the [archetype release instructions](https://github.com/FormidableLabs/builder-docs-archetype#lander-release) for our `npm version` workflow.


######################################################
# FormidableLabs/formidable-charts-docs/package.json #
######################################################
# - Branch Source: master
# - Branch Dest:   multibot-chore-preversionWorkflow
# - Branch Action: Create
# - Blob Action:   Update
# - PR URL:        https://github.com/FormidableLabs/formidable-charts-docs/pull/17
# - PR Exists:     false
# - Git SHA:       1329c6cf7a8cb22a6df5b4f1f47633c133e0c272
Index: FormidableLabs/formidable-charts-docs/package.json
===================================================================
--- FormidableLabs/formidable-charts-docs/package.json  master
+++ FormidableLabs/formidable-charts-docs/package.json  multibot-chore-preversionWorkflow
@@ -3,14 +3,15 @@
   "version": "0.0.2",
   "description": "Documentation site for Formidable Charts",
   "main": "webpack.config.dev.js",
   "scripts": {
+    "dev": "webpack-dev-server --port 3000 --config node_modules/builder-docs-archetype/config/webpack/webpack.config.dev.js --history-api-fallback",
+    "preversion": "builder run npm:preversion",
+    "server-static-prod": "ecstatic --port 8080 --baseDir /open-source/formidable-charts build",
     "start": "builder run dev",
     "test": "builder run lint",
-    "dev": "webpack-dev-server --port 3000 --config node_modules/builder-docs-archetype/config/webpack/webpack.config.dev.js --history-api-fallback",
-    "update-project": "npm update formidable-charts && npm update victory-docs",
-    "server-static-prod": "ecstatic --port 8080 --baseDir /open-source/formidable-charts build",
-    "test-func-static-prod": "TEST_FUNC_BASE_DIR=/open-source/formidable-charts builder run test-func-static"
+    "test-func-static-prod": "TEST_FUNC_BASE_DIR=/open-source/formidable-charts builder run test-func-static",
+    "update-project": "npm update formidable-charts && npm update victory-docs"
   },
   "repository": {
     "type": "git",
     "url": "git+https://github.com/FormidableLabs/formidable-charts-docs.git"
@@ -21,16 +22,16 @@
     "url": "https://github.com/FormidableLabs/formidable-charts-docs/issues"
   },
   "homepage": "https://github.com/FormidableLabs/formidable-charts-docs#readme",
   "devDependencies": {
-    "builder-docs-archetype-dev": "^4.1.1",
+    "builder-docs-archetype-dev": "^4.2.1",
     "react-docgen": "2.7.0"
   },
   "dependencies": {
     "anchorate": "^1.1.0",
     "babel-preset-stage-1": "^6.5.0",
     "builder": "^3.1.0",
-    "builder-docs-archetype": "^4.1.1",
+    "builder-docs-archetype": "^4.2.1",
     "chai": "^3.2.0",
     "ecology": "^1.6.0",
     "formidable-landers": "^5.1.1",
     "history": "~1.17.0",
@@ -47,8 +48,8 @@
     "react-router": "^2.0.1",
     "react-router-scroll": "^0.2.0",
     "sinon": "^1.17.2",
     "sinon-chai": "^2.8.0",
-    "victory-docs": "FormidableLabs/victory-docs",
-    "victory": "*"
+    "victory": "*",
+    "victory-docs": "FormidableLabs/victory-docs"
   }
 }


####################################################
# FormidableLabs/formidable-charts-docs/.npmignore #
####################################################
# - Branch Source: master
# - Branch Dest:   multibot-chore-preversionWorkflow
# - Branch Action: Create
# - Blob Action:   Create
# - PR URL:        https://github.com/FormidableLabs/formidable-charts-docs/pull/17
# - PR Exists:     false
# - Git SHA:       72792f6fa7d257f231392816b94abddd7af19b22
Index: FormidableLabs/formidable-charts-docs/.npmignore
===================================================================
--- FormidableLabs/formidable-charts-docs/.npmignore  master
+++ FormidableLabs/formidable-charts-docs/.npmignore  multibot-chore-preversionWorkflow
@@ -1,0 +1,14 @@
\ No newline at end of file
+\.git
+\.hg
+
+\.DS_Store
+\.project
+bower_components
+node_modules
+npm-debug\.log*
+phantomjsdriver\.log
+
+# Build
+coverage
+Procfile
+yarn.lock


####################################################
# FormidableLabs/formidable-charts-docs/.gitignore #
####################################################
# - Branch Source: master
# - Branch Dest:   multibot-chore-preversionWorkflow
# - Branch Action: Create
# - PR URL:        https://github.com/FormidableLabs/formidable-charts-docs/pull/17
# - PR Exists:     false
<noop>

###################################################
# FormidableLabs/formidable-charts-docs/README.md #
###################################################
# - Branch Source: master
# - Branch Dest:   multibot-chore-preversionWorkflow
# - Branch Action: Create
# - Blob Action:   Update
# - PR URL:        https://github.com/FormidableLabs/formidable-charts-docs/pull/17
# - PR Exists:     false
# - Git SHA:       84636a70cb7639611226879aa58a77459349a9c3
Index: FormidableLabs/formidable-charts-docs/README.md
===================================================================
--- FormidableLabs/formidable-charts-docs/README.md master
+++ FormidableLabs/formidable-charts-docs/README.md multibot-chore-preversionWorkflow
@@ -3,4 +3,6 @@

 [![Build Status](https://travis-ci.org/FormidableLabs/formidable-charts-docs.svg?branch=master)](https://travis-ci.org/FormidableLabs/formidable-charts-docs)

 Learn more about this site by [checking out the wiki](https://github.com/FormidableLabs/formidable-landers/wiki).
+
+To release this lander, please follow the [archetype release instructions](https://github.com/FormidableLabs/builder-docs-archetype#lander-release) for our `npm version` workflow.


########################################################
# FormidableLabs/formidable-playbook-docs/package.json #
########################################################
# - Branch Source: master
# - Branch Dest:   multibot-chore-preversionWorkflow
# - Branch Action: Create
# - Blob Action:   Update
# - PR URL:        https://github.com/FormidableLabs/formidable-playbook-docs/pull/16
# - PR Exists:     false
# - Git SHA:       2216e334d177ff411d65e0d96e2b5aa601f4e75c
Index: FormidableLabs/formidable-playbook-docs/package.json
===================================================================
--- FormidableLabs/formidable-playbook-docs/package.json  master
+++ FormidableLabs/formidable-playbook-docs/package.json  multibot-chore-preversionWorkflow
@@ -3,17 +3,18 @@
   "version": "0.0.1",
   "description": "The Formidable Playbook",
   "main": "",
   "scripts": {
-    "start": "builder run scrape-links && builder run dev",
+    "copy-assets": "cp -r static build/static && cp -r ./node_modules/formidable-playbook/examples build",
     "dev": "webpack-dev-server --port 3000 --config node_modules/builder-docs-archetype/config/webpack/webpack.config.dev.js --history-api-fallback",
-    "test": "builder run lint",
-    "copy-assets": "cp -r static build/static && cp -r ./node_modules/formidable-playbook/examples build",
-    "server-examples": "http-server examples -p 3000 .",
     "lint": "builder concurrent lint-react lint-config lint-test lint-examples",
     "lint-examples": "eslint --ext .js,.jsx examples --ignore-pattern **/dist/",
-    "update-project": "npm update formidable-playbook",
-    "scrape-links": "node scrape-links.js"
+    "preversion": "builder run npm:preversion",
+    "scrape-links": "node scrape-links.js",
+    "server-examples": "http-server examples -p 3000 .",
+    "start": "builder run scrape-links && builder run dev",
+    "test": "builder run lint",
+    "update-project": "npm update formidable-playbook"
   },
   "repository": {
     "type": "git",
     "url": "git+https://github.com/FormidableLabs/formidable-playbook-docs.git"
@@ -30,17 +31,17 @@
     "url": "https://github.com/FormidableLabs/formidable-playbook-docs/issues"
   },
   "homepage": "https://github.com/FormidableLabs/formidable-playbook-docs#readme",
   "devDependencies": {
-    "builder-docs-archetype-dev": "^4.1.1",
+    "builder-docs-archetype-dev": "^4.2.1",
     "doctoc": "^1.2.0",
     "http-server": "^0.9.0",
     "rimraf": "^2.5.2"
   },
   "dependencies": {
     "babel-preset-stage-1": "^6.5.0",
-    "builder": "^2.9.1",
-    "builder-docs-archetype": "^4.1.1",
+    "builder": "^3.1.0",
+    "builder-docs-archetype": "^4.2.1",
     "color": "^0.11.3",
     "formidable-landers": "^5.1.0",
     "formidable-playbook": "FormidableLabs/formidable-playbook",
     "history": "^2.1.0",


######################################################
# FormidableLabs/formidable-playbook-docs/.npmignore #
######################################################
# - Branch Source: master
# - Branch Dest:   multibot-chore-preversionWorkflow
# - Branch Action: Create
# - Blob Action:   Create
# - PR URL:        https://github.com/FormidableLabs/formidable-playbook-docs/pull/16
# - PR Exists:     false
# - Git SHA:       72792f6fa7d257f231392816b94abddd7af19b22
Index: FormidableLabs/formidable-playbook-docs/.npmignore
===================================================================
--- FormidableLabs/formidable-playbook-docs/.npmignore  master
+++ FormidableLabs/formidable-playbook-docs/.npmignore  multibot-chore-preversionWorkflow
@@ -1,0 +1,14 @@
\ No newline at end of file
+\.git
+\.hg
+
+\.DS_Store
+\.project
+bower_components
+node_modules
+npm-debug\.log*
+phantomjsdriver\.log
+
+# Build
+coverage
+Procfile
+yarn.lock


######################################################
# FormidableLabs/formidable-playbook-docs/.gitignore #
######################################################
# - Branch Source: master
# - Branch Dest:   multibot-chore-preversionWorkflow
# - Branch Action: Create
# - Blob Action:   Update
# - PR URL:        https://github.com/FormidableLabs/formidable-playbook-docs/pull/16
# - PR Exists:     false
# - Git SHA:       b4d0bd67e7e00749c0915d0c6fa26caa6c0bf157
Index: FormidableLabs/formidable-playbook-docs/.gitignore
===================================================================
--- FormidableLabs/formidable-playbook-docs/.gitignore  master
+++ FormidableLabs/formidable-playbook-docs/.gitignore  multibot-chore-preversionWorkflow
@@ -1,45 +1,15 @@
-### Node ###
-# Logs
-logs
-*.log
-npm-debug.log*
+\.git
+\.hg

-# Runtime data
-pids
-*.pid
-*.seed
+\.DS_Store
+\.project
+bower_components
+node_modules
+npm-debug\.log*
+phantomjsdriver\.log

-# Directory for instrumented libs generated by jscoverage/JSCover
-lib-cov
-
-# Coverage directory used by tools like istanbul
+# Build
 coverage
-
-# nyc test coverage
-.nyc_output
-
-# Grunt intermediate storage (http://gruntjs.com/creating-plugins#storing-task-files)
-.grunt
-
-# node-waf configuration
-.lock-wscript
-
-# Compiled binary addons (http://nodejs.org/api/addons.html)
-build/Release
-
-# Built site files
+Procfile
 build
-links.json
-
-# Dependency directories
-node_modules
-jspm_packages
-
-# Optional npm cache directory
-.npm
-
-# Optional REPL history
-.node_repl_history
-
-# mac
-.DS_Store
+yarn.lock


#####################################################
# FormidableLabs/formidable-playbook-docs/README.md #
#####################################################
# - Branch Source: master
# - Branch Dest:   multibot-chore-preversionWorkflow
# - Branch Action: Create
# - Blob Action:   Update
# - PR URL:        https://github.com/FormidableLabs/formidable-playbook-docs/pull/16
# - PR Exists:     false
# - Git SHA:       a3d87c0137a4dbda4dc2eca614e4642e504fb21e
Index: FormidableLabs/formidable-playbook-docs/README.md
===================================================================
--- FormidableLabs/formidable-playbook-docs/README.md master
+++ FormidableLabs/formidable-playbook-docs/README.md multibot-chore-preversionWorkflow
@@ -4,4 +4,6 @@

 This is a living document, and we intend to share our knowledge as we continue to work towards making the web a better place. Please read our [contributing guide](CONTRIBUTING.md) before submitting a pull request.

 [![Made with love by Formidable](https://formidable.surge.sh/assets/readme-foots.svg)](http://formidable.com/?utm_source=github&utm_medium=OSS&utm_campaign=repository)
+
+To release this lander, please follow the [archetype release instructions](https://github.com/FormidableLabs/builder-docs-archetype#lander-release) for our `npm version` workflow.


###########################################
# FormidableLabs/radium-docs/package.json #
###########################################
# - Branch Source: master
# - Branch Dest:   multibot-chore-preversionWorkflow
# - Branch Action: Create
# - Blob Action:   Update
# - PR URL:        https://github.com/FormidableLabs/radium-docs/pull/39
# - PR Exists:     false
# - Git SHA:       1006090b04e5b9d6523eaeca06f9f9504468ae3d
Index: FormidableLabs/radium-docs/package.json
===================================================================
--- FormidableLabs/radium-docs/package.json master
+++ FormidableLabs/radium-docs/package.json multibot-chore-preversionWorkflow
@@ -3,10 +3,11 @@
   "version": "0.0.1",
   "description": "Radium Documentation Site",
   "main": "webpack.config.dev.js",
   "scripts": {
+    "dev": "webpack-dev-server --port 3000 --config node_modules/builder-docs-archetype/config/webpack/webpack.config.dev.js --history-api-fallback",
+    "preversion": "builder run npm:preversion",
     "start": "builder run dev",
-    "dev": "webpack-dev-server --port 3000 --config node_modules/builder-docs-archetype/config/webpack/webpack.config.dev.js --history-api-fallback",
     "test": "builder run lint",
     "update-project": "rm -rf node_modules/radium && npm update radium"
   },
   "repository": {
@@ -19,14 +20,14 @@
     "url": "https://github.com/FormidableLabs/radium-docs/issues"
   },
   "homepage": "https://github.com/FormidableLabs/radium-docs#readme",
   "devDependencies": {
-    "builder-docs-archetype-dev": "^3.0.0"
+    "builder-docs-archetype-dev": "^4.2.1"
   },
   "dependencies": {
     "babel-preset-stage-1": "^6.5.0",
-    "builder": "^2.9.1",
-    "builder-docs-archetype": "^3.0.2",
+    "builder": "^3.1.0",
+    "builder-docs-archetype": "^4.2.1",
     "chai": "^3.2.0",
     "color": "^0.11.3",
     "ecology": "^1.6.1",
     "formidable-landers": "^4.0.4",


#########################################
# FormidableLabs/radium-docs/.npmignore #
#########################################
# - Branch Source: master
# - Branch Dest:   multibot-chore-preversionWorkflow
# - Branch Action: Create
# - Blob Action:   Create
# - PR URL:        https://github.com/FormidableLabs/radium-docs/pull/39
# - PR Exists:     false
# - Git SHA:       72792f6fa7d257f231392816b94abddd7af19b22
Index: FormidableLabs/radium-docs/.npmignore
===================================================================
--- FormidableLabs/radium-docs/.npmignore master
+++ FormidableLabs/radium-docs/.npmignore multibot-chore-preversionWorkflow
@@ -1,0 +1,14 @@
\ No newline at end of file
+\.git
+\.hg
+
+\.DS_Store
+\.project
+bower_components
+node_modules
+npm-debug\.log*
+phantomjsdriver\.log
+
+# Build
+coverage
+Procfile
+yarn.lock


#########################################
# FormidableLabs/radium-docs/.gitignore #
#########################################
# - Branch Source: master
# - Branch Dest:   multibot-chore-preversionWorkflow
# - Branch Action: Create
# - Blob Action:   Update
# - PR URL:        https://github.com/FormidableLabs/radium-docs/pull/39
# - PR Exists:     false
# - Git SHA:       b4d0bd67e7e00749c0915d0c6fa26caa6c0bf157
Index: FormidableLabs/radium-docs/.gitignore
===================================================================
--- FormidableLabs/radium-docs/.gitignore master
+++ FormidableLabs/radium-docs/.gitignore multibot-chore-preversionWorkflow
@@ -8,9 +8,8 @@
 npm-debug\.log*
 phantomjsdriver\.log

 # Build
-dist
-*/dist
 coverage
 Procfile
-/build
+build
+yarn.lock


########################################
# FormidableLabs/radium-docs/README.md #
########################################
# - Branch Source: master
# - Branch Dest:   multibot-chore-preversionWorkflow
# - Branch Action: Create
# - Blob Action:   Update
# - PR URL:        https://github.com/FormidableLabs/radium-docs/pull/39
# - PR Exists:     false
# - Git SHA:       c0e97b54c24130757852c9893374be5bc66daca6
Index: FormidableLabs/radium-docs/README.md
===================================================================
--- FormidableLabs/radium-docs/README.md  master
+++ FormidableLabs/radium-docs/README.md  multibot-chore-preversionWorkflow
@@ -5,4 +5,6 @@

 [Documentation site](https://formidable.com/open-source/radium/) for Radium.

 [Check out the wiki](https://github.com/FormidableLabs/formidable-landers/wiki) to learn more about this lander.
+
+To release this lander, please follow the [archetype release instructions](https://github.com/FormidableLabs/builder-docs-archetype#lander-release) for our `npm version` workflow.


##############################################
# FormidableLabs/spectacle-docs/package.json #
##############################################
# - Branch Source: master
# - Branch Dest:   multibot-chore-preversionWorkflow
# - Branch Action: Create
# - Blob Action:   Update
# - PR URL:        https://github.com/FormidableLabs/spectacle-docs/pull/40
# - PR Exists:     false
# - Git SHA:       4a6ed089130aaf58d73fa1da16ebf2aac80a4b9b
Index: FormidableLabs/spectacle-docs/package.json
===================================================================
--- FormidableLabs/spectacle-docs/package.json  master
+++ FormidableLabs/spectacle-docs/package.json  multibot-chore-preversionWorkflow
@@ -4,8 +4,9 @@
   "description": "Documentation site for Spectacle",
   "main": "webpack.config.dev.js",
   "scripts": {
     "dev": "webpack-dev-server --port 3000 --config node_modules/builder-docs-archetype/config/webpack/webpack.config.dev.js --history-api-fallback",
+    "preversion": "builder run npm:preversion",
     "start": "builder run dev",
     "test": "builder run lint",
     "update-project": "npm update spectacle"
   },
@@ -19,14 +20,14 @@
     "url": "https://github.com/FormidableLabs/spectacle-docs/issues"
   },
   "homepage": "https://github.com/FormidableLabs/spectacle-docs#readme",
   "devDependencies": {
-    "builder-docs-archetype-dev": "^4.1.1"
+    "builder-docs-archetype-dev": "^4.2.1"
   },
   "dependencies": {
     "anchorate": "^1.1.0",
-    "builder": "^2.9.1",
-    "builder-docs-archetype": "^4.1.1",
+    "builder": "^3.1.0",
+    "builder-docs-archetype": "^4.2.1",
     "formidable-landers": "^5.1.1",
     "history": "^1.17.0",
     "lodash": "^4.16.4",
     "markdown-it": "^8.0.0",


############################################
# FormidableLabs/spectacle-docs/.npmignore #
############################################
# - Branch Source: master
# - Branch Dest:   multibot-chore-preversionWorkflow
# - Branch Action: Create
# - Blob Action:   Create
# - PR URL:        https://github.com/FormidableLabs/spectacle-docs/pull/40
# - PR Exists:     false
# - Git SHA:       72792f6fa7d257f231392816b94abddd7af19b22
Index: FormidableLabs/spectacle-docs/.npmignore
===================================================================
--- FormidableLabs/spectacle-docs/.npmignore  master
+++ FormidableLabs/spectacle-docs/.npmignore  multibot-chore-preversionWorkflow
@@ -1,0 +1,14 @@
\ No newline at end of file
+\.git
+\.hg
+
+\.DS_Store
+\.project
+bower_components
+node_modules
+npm-debug\.log*
+phantomjsdriver\.log
+
+# Build
+coverage
+Procfile
+yarn.lock


############################################
# FormidableLabs/spectacle-docs/.gitignore #
############################################
# - Branch Source: master
# - Branch Dest:   multibot-chore-preversionWorkflow
# - Branch Action: Create
# - Blob Action:   Update
# - PR URL:        https://github.com/FormidableLabs/spectacle-docs/pull/40
# - PR Exists:     false
# - Git SHA:       b4d0bd67e7e00749c0915d0c6fa26caa6c0bf157
Index: FormidableLabs/spectacle-docs/.gitignore
===================================================================
--- FormidableLabs/spectacle-docs/.gitignore  master
+++ FormidableLabs/spectacle-docs/.gitignore  multibot-chore-preversionWorkflow
@@ -11,4 +11,5 @@
 # Build
 coverage
 Procfile
 build
+yarn.lock


###########################################
# FormidableLabs/spectacle-docs/README.md #
###########################################
# - Branch Source: master
# - Branch Dest:   multibot-chore-preversionWorkflow
# - Branch Action: Create
# - Blob Action:   Update
# - PR URL:        https://github.com/FormidableLabs/spectacle-docs/pull/40
# - PR Exists:     false
# - Git SHA:       fc878755a97ed9318a14c137a81d2f2755154939
Index: FormidableLabs/spectacle-docs/README.md
===================================================================
--- FormidableLabs/spectacle-docs/README.md master
+++ FormidableLabs/spectacle-docs/README.md multibot-chore-preversionWorkflow
@@ -33,4 +33,6 @@
 travis encrypt-file ~/.ssh/deploy_static.pem --add
 ```

 Make sure the travis config does not preserve the `~/.ssh/` filepath.
+
+To release this lander, please follow the [archetype release instructions](https://github.com/FormidableLabs/builder-docs-archetype#lander-release) for our `npm version` workflow.


#####################################################
# FormidableLabs/spectacle-editor-docs/package.json #
#####################################################
# - Branch Source: master
# - Branch Dest:   multibot-chore-preversionWorkflow
# - Branch Action: Create
# - Blob Action:   Update
# - PR URL:        https://github.com/FormidableLabs/spectacle-editor-docs/pull/23
# - PR Exists:     false
# - Git SHA:       ed66f0586d4cf29960430b3da1725c3f026960b1
Index: FormidableLabs/spectacle-editor-docs/package.json
===================================================================
--- FormidableLabs/spectacle-editor-docs/package.json master
+++ FormidableLabs/spectacle-editor-docs/package.json multibot-chore-preversionWorkflow
@@ -3,8 +3,9 @@
   "version": "0.0.1",
   "description": "Documentation site for Spectacle Editor",
   "main": "webpack.config.dev.js",
   "scripts": {
+    "preversion": "builder run npm:preversion",
     "start": "builder run dev",
     "test": "builder run lint"
   },
   "repository": {
@@ -17,14 +18,14 @@
     "url": "https://github.com/FormidableLabs/spectacle-editor-docs/issues"
   },
   "homepage": "https://github.com/FormidableLabs/spectacle-editor-docs#readme",
   "devDependencies": {
-    "builder-docs-archetype-dev": "^3.0.0"
+    "builder-docs-archetype-dev": "^4.2.1"
   },
   "dependencies": {
     "babel-preset-stage-1": "^6.5.0",
-    "builder": "^2.9.1",
-    "builder-docs-archetype": "^3.0.0",
+    "builder": "^3.1.0",
+    "builder-docs-archetype": "^4.2.1",
     "chai": "^3.2.0",
     "formidable-landers": "^3.3.3",
     "history": "~1.17.0",
     "lodash": "^4.6.1",


###################################################
# FormidableLabs/spectacle-editor-docs/.npmignore #
###################################################
# - Branch Source: master
# - Branch Dest:   multibot-chore-preversionWorkflow
# - Branch Action: Create
# - Blob Action:   Create
# - PR URL:        https://github.com/FormidableLabs/spectacle-editor-docs/pull/23
# - PR Exists:     false
# - Git SHA:       72792f6fa7d257f231392816b94abddd7af19b22
Index: FormidableLabs/spectacle-editor-docs/.npmignore
===================================================================
--- FormidableLabs/spectacle-editor-docs/.npmignore master
+++ FormidableLabs/spectacle-editor-docs/.npmignore multibot-chore-preversionWorkflow
@@ -1,0 +1,14 @@
\ No newline at end of file
+\.git
+\.hg
+
+\.DS_Store
+\.project
+bower_components
+node_modules
+npm-debug\.log*
+phantomjsdriver\.log
+
+# Build
+coverage
+Procfile
+yarn.lock


###################################################
# FormidableLabs/spectacle-editor-docs/.gitignore #
###################################################
# - Branch Source: master
# - Branch Dest:   multibot-chore-preversionWorkflow
# - Branch Action: Create
# - Blob Action:   Update
# - PR URL:        https://github.com/FormidableLabs/spectacle-editor-docs/pull/23
# - PR Exists:     false
# - Git SHA:       b4d0bd67e7e00749c0915d0c6fa26caa6c0bf157
Index: FormidableLabs/spectacle-editor-docs/.gitignore
===================================================================
--- FormidableLabs/spectacle-editor-docs/.gitignore master
+++ FormidableLabs/spectacle-editor-docs/.gitignore multibot-chore-preversionWorkflow
@@ -11,4 +11,5 @@
 # Build
 coverage
 Procfile
 build
+yarn.lock


##################################################
# FormidableLabs/spectacle-editor-docs/README.md #
##################################################
# - Branch Source: master
# - Branch Dest:   multibot-chore-preversionWorkflow
# - Branch Action: Create
# - Blob Action:   Update
# - PR URL:        https://github.com/FormidableLabs/spectacle-editor-docs/pull/23
# - PR Exists:     false
# - Git SHA:       132939ad9f0cfb91aa998f4ef5b9302875727b87
Index: FormidableLabs/spectacle-editor-docs/README.md
===================================================================
--- FormidableLabs/spectacle-editor-docs/README.md  master
+++ FormidableLabs/spectacle-editor-docs/README.md  multibot-chore-preversionWorkflow
@@ -3,4 +3,6 @@

 [![Build Status](https://travis-ci.org/FormidableLabs/spectacle-editor-docs.svg?branch=master)](https://travis-ci.org/FormidableLabs/spectacle-editor-docs)

 [Check out the wiki](https://github.com/FormidableLabs/formidable-landers/wiki)
+
+To release this lander, please follow the [archetype release instructions](https://github.com/FormidableLabs/builder-docs-archetype#lander-release) for our `npm version` workflow.


############################################
# FormidableLabs/victory-docs/package.json #
############################################
# - Branch Source: master
# - Branch Dest:   multibot-chore-preversionWorkflow
# - Branch Action: Create
# - Blob Action:   Update
# - PR URL:        https://github.com/FormidableLabs/victory-docs/pull/179
# - PR Exists:     false
# - Git SHA:       e3010495a80dd1c2b88e75e435f3a4303144ad36
Index: FormidableLabs/victory-docs/package.json
===================================================================
--- FormidableLabs/victory-docs/package.json  master
+++ FormidableLabs/victory-docs/package.json  multibot-chore-preversionWorkflow
@@ -3,14 +3,15 @@
   "version": "0.0.2",
   "description": "Documentation site for Victory",
   "main": "webpack.config.dev.js",
   "scripts": {
+    "dev": "webpack-dev-server --port 3000 --config node_modules/builder-docs-archetype/config/webpack/webpack.config.dev.js --history-api-fallback",
+    "preversion": "builder run npm:preversion",
+    "server-static-prod": "ecstatic --port 8080 --baseDir /open-source/victory build",
     "start": "builder run dev",
     "test": "builder run lint",
-    "dev": "webpack-dev-server --port 3000 --config node_modules/builder-docs-archetype/config/webpack/webpack.config.dev.js --history-api-fallback",
-    "update-project": "npm update victory",
-    "server-static-prod": "ecstatic --port 8080 --baseDir /open-source/victory build",
-    "test-func-static-prod": "TEST_FUNC_BASE_DIR=/open-source/victory builder run test-func-static"
+    "test-func-static-prod": "TEST_FUNC_BASE_DIR=/open-source/victory builder run test-func-static",
+    "update-project": "npm update victory"
   },
   "repository": {
     "type": "git",
     "url": "git+https://github.com/FormidableLabs/victory-docs.git"
@@ -21,18 +22,16 @@
     "url": "https://github.com/FormidableLabs/victory-docs/issues"
   },
   "homepage": "https://github.com/FormidableLabs/victory-docs#readme",
   "devDependencies": {
-    "builder-docs-archetype-dev": "^4.1.1",
-    "builder-react-component-dev": "^0.3.5",
+    "builder-docs-archetype-dev": "^4.2.1",
     "react-docgen": "2.7.0"
   },
   "dependencies": {
     "anchorate": "^1.1.0",
     "babel-preset-stage-1": "^6.5.0",
-    "builder": "^2.10.1",
-    "builder-docs-archetype": "^4.1.1",
-    "builder-react-component": "^0.3.5",
+    "builder": "^3.1.0",
+    "builder-docs-archetype": "^4.2.1",
     "chai": "^3.2.0",
     "ecology": "^1.6.0",
     "formidable-landers": "^5.1.1",
     "history": "~1.17.0",
@@ -52,7 +51,7 @@
     "react-router": "^2.5.0",
     "react-router-scroll": "^0.3.2",
     "sinon": "^1.17.2",
     "sinon-chai": "^2.8.0",
-    "victory": "0.13.1"
+    "victory": "*"
   }
 }


##########################################
# FormidableLabs/victory-docs/.npmignore #
##########################################
# - Branch Source: master
# - Branch Dest:   multibot-chore-preversionWorkflow
# - Branch Action: Create
# - Blob Action:   Create
# - PR URL:        https://github.com/FormidableLabs/victory-docs/pull/179
# - PR Exists:     false
# - Git SHA:       72792f6fa7d257f231392816b94abddd7af19b22
Index: FormidableLabs/victory-docs/.npmignore
===================================================================
--- FormidableLabs/victory-docs/.npmignore  master
+++ FormidableLabs/victory-docs/.npmignore  multibot-chore-preversionWorkflow
@@ -1,0 +1,14 @@
\ No newline at end of file
+\.git
+\.hg
+
+\.DS_Store
+\.project
+bower_components
+node_modules
+npm-debug\.log*
+phantomjsdriver\.log
+
+# Build
+coverage
+Procfile
+yarn.lock


##########################################
# FormidableLabs/victory-docs/.gitignore #
##########################################
# - Branch Source: master
# - Branch Dest:   multibot-chore-preversionWorkflow
# - Branch Action: Create
# - PR URL:        https://github.com/FormidableLabs/victory-docs/pull/179
# - PR Exists:     false
<noop>

#########################################
# FormidableLabs/victory-docs/README.md #
#########################################
# - Branch Source: master
# - Branch Dest:   multibot-chore-preversionWorkflow
# - Branch Action: Create
# - Blob Action:   Update
# - PR URL:        https://github.com/FormidableLabs/victory-docs/pull/179
# - PR Exists:     false
# - Git SHA:       54af15acde0d8a70cf4fb7145c080e2491280465
Index: FormidableLabs/victory-docs/README.md
===================================================================
--- FormidableLabs/victory-docs/README.md master
+++ FormidableLabs/victory-docs/README.md multibot-chore-preversionWorkflow
@@ -5,4 +5,6 @@

 [Documentation site](https://formidable.com/open-source/victory/) for Victory.

 [Check out the wiki](https://github.com/FormidableLabs/formidable-landers/wiki)
+
+To release this lander, please follow the [archetype release instructions](https://github.com/FormidableLabs/builder-docs-archetype#lander-release) for our `npm version` workflow.

```
