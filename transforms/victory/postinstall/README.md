Remove `scripts.postinstall` on npm publishing
==============================================

This transform removes `scripts.postinstall` on npm publishing, which is only
needed on `git`-based installs.

## Transform

We can try things out completely unauthenticated to make sure the repos are
appropriately transformed:

```sh
$ multibot \
  --no-auth \
  --gh-token=$TOKEN \
  --org FormidableLabs \
  --repos victory victory-chart victory-pie victory-core \
  --branch-dest=multibot-chore-remove-postinstall \
  --action=branch-to-pr \
  --files package.json \
  --transform="transforms/victory/postinstall/transform.js" \
  --title=$"[multibot] Remove 'scripts.postinstall' on npm publishing" \
  --msg=$"$(cat transforms/victory/postinstall/pr-message.md)" \
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
  --repos victory victory-chart victory-pie victory-core \
  --branch-dest=multibot-chore-remove-postinstall \
  --action=branch-to-pr \
  --files package.json \
  --transform="transforms/victory/postinstall/transform.js" \
  --title=$"[multibot] Remove 'scripts.postinstall' on npm publishing" \
  --msg=$"$(cat transforms/victory/postinstall/pr-message.md)" \
  --format=diff
```

And with that, we get our final output and we've opened a bunch of final form
pull requests!

## Create Pull Requests

With the above commands, `multibot` opened these handy PRs:

* https://github.com/FormidableLabs/victory/pull/599
* https://github.com/FormidableLabs/victory-chart/pull/473
* https://github.com/FormidableLabs/victory-pie/pull/145
* https://github.com/FormidableLabs/victory-core/pull/248

Here is the output of our current run with links to all applicable PRs:

```diff
#######################################
# FormidableLabs/victory/package.json #
#######################################
# - Branch Source: master
# - Branch Dest:   multibot-chore-remove-postinstall
# - Branch Action: Create
# - Blob Action:   Update
# - PR URL:        https://github.com/FormidableLabs/victory/pull/599
# - PR Exists:     false
# - Git SHA:       3e49e40bde24cd71274e19d117477b3ff3b0b4a9
Index: FormidableLabs/victory/package.json
===================================================================
--- FormidableLabs/victory/package.json master
+++ FormidableLabs/victory/package.json multibot-chore-remove-postinstall
@@ -32,15 +32,15 @@
     "version": "builder run npm:version"
   },
   "dependencies": {
     "builder": "^3.2.1",
-    "builder-victory-component": "^4.0.0",
+    "builder-victory-component": "^4.0.2",
     "victory-chart": "^19.1.1",
     "victory-core": "^15.1.0",
     "victory-pie": "^11.1.0"
   },
   "devDependencies": {
-    "builder-victory-component-dev": "^4.0.0",
+    "builder-victory-component-dev": "^4.0.2",
     "chai": "^3.5.0",
     "lodash": "^4.17.4",
     "mocha": "^3.0.2",
     "prop-types": "^15.5.8",
@@ -55,7 +55,10 @@
       "^builder"
     ],
     "files": {
       ".npmignore": ".npmignore.publishr"
+    },
+    "scripts": {
+      "postinstall": ""
     }
   }
 }


#############################################
# FormidableLabs/victory-chart/package.json #
#############################################
# - Branch Source: master
# - Branch Dest:   multibot-chore-remove-postinstall
# - Branch Action: Create
# - Blob Action:   Update
# - PR URL:        https://github.com/FormidableLabs/victory-chart/pull/473
# - PR Exists:     false
# - Git SHA:       91ef36012429dc93f666bf991623714eaf2a58c6
Index: FormidableLabs/victory-chart/package.json
===================================================================
--- FormidableLabs/victory-chart/package.json master
+++ FormidableLabs/victory-chart/package.json multibot-chore-remove-postinstall
@@ -27,15 +27,15 @@
     "version": "builder run npm:version"
   },
   "dependencies": {
     "builder": "^3.2.1",
-    "builder-victory-component": "^4.0.0",
+    "builder-victory-component": "^4.0.2",
     "d3-voronoi": "^1.1.2",
     "lodash": "^4.17.4",
     "victory-core": "^15.1.0"
   },
   "devDependencies": {
-    "builder-victory-component-dev": "^4.0.0",
+    "builder-victory-component-dev": "^4.0.2",
     "chai": "^3.5.0",
     "d3-scale": "^1.0.0",
     "d3-shape": "^1.0.0",
     "enzyme": "^2.4.1",
@@ -52,7 +52,10 @@
       "^builder"
     ],
     "files": {
       ".npmignore": ".npmignore.publishr"
+    },
+    "scripts": {
+      "postinstall": ""
     }
   }
 }


###########################################
# FormidableLabs/victory-pie/package.json #
###########################################
# - Branch Source: master
# - Branch Dest:   multibot-chore-remove-postinstall
# - Branch Action: Create
# - Blob Action:   Update
# - PR URL:        https://github.com/FormidableLabs/victory-pie/pull/145
# - PR Exists:     false
# - Git SHA:       36242d72b94d20e3604cd91be3b7bf82f193c66c
Index: FormidableLabs/victory-pie/package.json
===================================================================
--- FormidableLabs/victory-pie/package.json master
+++ FormidableLabs/victory-pie/package.json multibot-chore-remove-postinstall
@@ -27,16 +27,16 @@
     "storybook": "start-storybook -p 3001"
   },
   "dependencies": {
     "builder": "^3.2.1",
-    "builder-victory-component": "^4.0.0",
+    "builder-victory-component": "^4.0.2",
     "d3-shape": "^1.0.0",
     "lodash": "^4.17.4",
     "victory-core": "^15.1.0"
   },
   "devDependencies": {
     "@kadira/storybook": "^1.25.0",
-    "builder-victory-component-dev": "^4.0.0",
+    "builder-victory-component-dev": "^4.0.2",
     "chai": "^3.5.0",
     "chai-enzyme": "0.4.1",
     "enzyme": "^2.4.1",
     "mocha": "^3.0.2",
@@ -52,7 +52,10 @@
       "^builder"
     ],
     "files": {
       ".npmignore": ".npmignore.publishr"
+    },
+    "scripts": {
+      "postinstall": ""
     }
   }
 }


############################################
# FormidableLabs/victory-core/package.json #
############################################
# - Branch Source: master
# - Branch Dest:   multibot-chore-remove-postinstall
# - Branch Action: Create
# - Blob Action:   Update
# - PR URL:        https://github.com/FormidableLabs/victory-core/pull/248
# - PR Exists:     false
# - Git SHA:       86bb5a6bb9459ac3d57f325b137977cd939df2ce
Index: FormidableLabs/victory-core/package.json
===================================================================
--- FormidableLabs/victory-core/package.json  master
+++ FormidableLabs/victory-core/package.json  multibot-chore-remove-postinstall
@@ -26,18 +26,18 @@
     "version": "builder run npm:version"
   },
   "dependencies": {
     "builder": "^3.2.1",
-    "builder-victory-component": "^4.0.0",
+    "builder-victory-component": "^4.0.2",
     "d3-ease": "^1.0.0",
     "d3-interpolate": "^1.1.1",
     "d3-scale": "^1.0.0",
     "d3-shape": "^1.0.0",
     "d3-timer": "^1.0.0",
     "lodash": "^4.17.4"
   },
   "devDependencies": {
-    "builder-victory-component-dev": "^4.0.0",
+    "builder-victory-component-dev": "^4.0.2",
     "chai": "^3.5.0",
     "enzyme": "^2.4.1",
     "mocha": "^3.0.2",
     "prop-types": "^15.5.8",
@@ -52,7 +52,10 @@
       "^builder"
     ],
     "files": {
       ".npmignore": ".npmignore.publishr"
+    },
+    "scripts": {
+      "postinstall": ""
     }
   }
 }
```
