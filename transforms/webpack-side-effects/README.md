Add `sideEffects: false` to \`package.json\`
==========================================

This transform adds `sideEffects: false` to \`package.json\`s so webpack4 tree shaking actually works completely.

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
  --title=$"[multibot] Add \`sideEffects: false\` to \`package.json\`" \
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
  --title=$"[multibot] Add \`sideEffects: false\` to \`package.json\`" \
  --msg=$"$(cat transforms/webpack-side-effects/pr-message.md)" \
  --format=diff
```

And with that, we get our final output and we've opened a bunch of final form
pull requests!

## Create Pull Requests

With the above commands, `multibot` opened these handy PRs:

* https://github.com/FormidableLabs/radium/pull/965
* https://github.com/FormidableLabs/spectacle/pull/465
* https://github.com/FormidableLabs/urql/pull/38
* https://github.com/FormidableLabs/victory-chart/pull/560
* https://github.com/FormidableLabs/victory-core/pull/337
* https://github.com/FormidableLabs/victory-pie/pull/167
* https://github.com/FormidableLabs/victory/pull/918
* https://github.com/FormidableLabs/freactal/pull/96
* https://github.com/FormidableLabs/component-playground/pull/121
* https://github.com/FormidableLabs/formidable-charts/pull/14
* https://github.com/FormidableLabs/nuka-carousel/pull/281
* https://github.com/FormidableLabs/radium-grid/pull/79
* https://github.com/FormidableLabs/react-animations/pull/24
* https://github.com/FormidableLabs/react-game-kit/pull/59
* https://github.com/FormidableLabs/react-live/pull/55
* https://github.com/FormidableLabs/react-music/pull/51
* https://github.com/FormidableLabs/react-progressive-image/pull/17
* https://github.com/FormidableLabs/react-shuffle/pull/33
* https://github.com/FormidableLabs/redux-little-router/pull/265

Here is the output of our current run with links to all applicable PRs:

```diff
######################################
# FormidableLabs/radium/package.json #
######################################
# - Branch Source: master
# - Branch Dest:   multibot-chore-webpackSideEffects
# - Branch Action: Create
# - Blob Action:   Update
# - PR URL:        https://github.com/FormidableLabs/radium/pull/965
# - PR Exists:     false
# - Git SHA:       45498a37f56f155ff770333d5c523b1a419da992
Index: FormidableLabs/radium/package.json
===================================================================
--- FormidableLabs/radium/package.json	master
+++ FormidableLabs/radium/package.json	multibot-chore-webpackSideEffects
@@ -115,6 +115,7 @@
     },
     "scripts": {
       "postinstall": ""
     }
-  }
+  },
+  "sideEffects": false
 }


#########################################
# FormidableLabs/spectacle/package.json #
#########################################
# - Branch Source: master
# - Branch Dest:   multibot-chore-webpackSideEffects
# - Branch Action: Create
# - Blob Action:   Update
# - PR URL:        https://github.com/FormidableLabs/spectacle/pull/465
# - PR Exists:     false
# - Git SHA:       cc4faa9117b2a0281da02314b819f169cfa1a7d5
Index: FormidableLabs/spectacle/package.json
===================================================================
--- FormidableLabs/spectacle/package.json	master
+++ FormidableLabs/spectacle/package.json	multibot-chore-webpackSideEffects
@@ -108,6 +108,7 @@
     "setupFiles": [
       "raf/polyfill",
       "<rootDir>/jest-setup.js"
     ]
-  }
+  },
+  "sideEffects": false
 }


####################################
# FormidableLabs/urql/package.json #
####################################
# - Branch Source: master
# - Branch Dest:   multibot-chore-webpackSideEffects
# - Branch Action: Create
# - Blob Action:   Update
# - PR URL:        https://github.com/FormidableLabs/urql/pull/38
# - PR Exists:     false
# - Git SHA:       10418295a65b6ddf1c96cca55d44da46eaf8eddb
Index: FormidableLabs/urql/package.json
===================================================================
--- FormidableLabs/urql/package.json	master
+++ FormidableLabs/urql/package.json	multibot-chore-webpackSideEffects
@@ -9,25 +9,22 @@
   "scripts": {
     "coverage": "jest --coverage",
     "clean-lib": "rimraf lib",
     "build-babel": "babel src --extensions \".ts,.tsx\"",
-    "build-lib":
-      "npm run clean-lib && builder run --env \"{\\\"BABEL_ENV\\\":\\\"commonjs\\\"}\" build-babel -- -d lib",
+    "build-lib": "npm run clean-lib && builder run --env \"{\\\"BABEL_ENV\\\":\\\"commonjs\\\"}\" build-babel -- -d lib",
     "clean-es": "rimraf es",
     "build-es": "npm run clean-es && builder run build-babel -- -d es",
     "watch-es": "watch \"npm run build-es\" src/ -d",
     "clean-types": "rimraf types",
     "build-types": "npm run clean-types && tsc -p tsconfig.dts.json",
     "build": "builder concurrent --buffer build-lib build-es build-types",
     "demo:start:graphql-server": "node example/src/server/index.js",
-    "demo:start:app":
-      "webpack-dev-server --hot --inline --config \"example/webpack.config.js\"",
+    "demo:start:app": "webpack-dev-server --hot --inline --config \"example/webpack.config.js\"",
     "demo:start": "builder concurrent demo:start:app demo:start:graphql-server",
     "type-check": "tsc",
     "lint": "tslint 'src/**/*.{ts, tsx}'",
     "test": "jest",
-    "prettier":
-      "prettier --write \"{,!(node_modules|custom-typings|types)/**/}*.{js,jsx,ts,tsx,json,md}\"",
+    "prettier": "prettier --write \"{,!(node_modules|custom-typings|types)/**/}*.{js,jsx,ts,tsx,json,md}\"",
     "precommit": "lint-staged"
   },
   "author": "Ken Wheeler",
   "license": "MIT",
@@ -53,12 +50,22 @@
       "!src/**/hash.*",
       "!src/**/typenames.*"
     ],
     "testRegex": "(src/tests/.*(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
-    "moduleFileExtensions": ["ts", "tsx", "js", "jsx", "json", "node"]
+    "moduleFileExtensions": [
+      "ts",
+      "tsx",
+      "js",
+      "jsx",
+      "json",
+      "node"
+    ]
   },
   "lint-staged": {
-    "*.{js,jsx,ts,tsx,json,md}": ["prettier --write", "git add"]
+    "*.{js,jsx,ts,tsx,json,md}": [
+      "prettier --write",
+      "git add"
+    ]
   },
   "devDependencies": {
     "@babel/cli": "^7.0.0-beta.38",
     "@babel/core": "^7.0.0-beta.38",
@@ -113,6 +120,7 @@
   "dependencies": {
     "create-react-context": "^0.1.3",
     "graphql": "0.13.0-rc.1",
     "uuid": "^3.2.1"
-  }
+  },
+  "sideEffects": false
 }


#############################################
# FormidableLabs/victory-chart/package.json #
#############################################
# - Branch Source: master
# - Branch Dest:   multibot-chore-webpackSideEffects
# - Branch Action: Create
# - Blob Action:   Update
# - PR URL:        https://github.com/FormidableLabs/victory-chart/pull/560
# - PR Exists:     false
# - Git SHA:       9f97040f23c15ec7872ab56621b039cd55767e98
Index: FormidableLabs/victory-chart/package.json
===================================================================
--- FormidableLabs/victory-chart/package.json	master
+++ FormidableLabs/victory-chart/package.json	multibot-chore-webpackSideEffects
@@ -61,6 +61,7 @@
     },
     "scripts": {
       "postinstall": ""
     }
-  }
+  },
+  "sideEffects": false
 }


############################################
# FormidableLabs/victory-core/package.json #
############################################
# - Branch Source: master
# - Branch Dest:   multibot-chore-webpackSideEffects
# - Branch Action: Create
# - Blob Action:   Update
# - PR URL:        https://github.com/FormidableLabs/victory-core/pull/337
# - PR Exists:     false
# - Git SHA:       361b2010f8220152f4eaed6d68edf9b74f2889b5
Index: FormidableLabs/victory-core/package.json
===================================================================
--- FormidableLabs/victory-core/package.json	master
+++ FormidableLabs/victory-core/package.json	multibot-chore-webpackSideEffects
@@ -61,6 +61,7 @@
     },
     "scripts": {
       "postinstall": ""
     }
-  }
+  },
+  "sideEffects": false
 }


###########################################
# FormidableLabs/victory-pie/package.json #
###########################################
# - Branch Source: master
# - Branch Dest:   multibot-chore-webpackSideEffects
# - Branch Action: Create
# - Blob Action:   Update
# - PR URL:        https://github.com/FormidableLabs/victory-pie/pull/167
# - PR Exists:     false
# - Git SHA:       d203ce52fedc1b44a26f2df4f97376a3e4a157bc
Index: FormidableLabs/victory-pie/package.json
===================================================================
--- FormidableLabs/victory-pie/package.json	master
+++ FormidableLabs/victory-pie/package.json	multibot-chore-webpackSideEffects
@@ -59,6 +59,7 @@
     },
     "scripts": {
       "postinstall": ""
     }
-  }
+  },
+  "sideEffects": false
 }


#######################################
# FormidableLabs/victory/package.json #
#######################################
# - Branch Source: master
# - Branch Dest:   multibot-chore-webpackSideEffects
# - Branch Action: Create
# - Blob Action:   Update
# - PR URL:        https://github.com/FormidableLabs/victory/pull/918
# - PR Exists:     false
# - Git SHA:       63aa167227c160c16ff3ebce082fe255cf36ddb7
Index: FormidableLabs/victory/package.json
===================================================================
--- FormidableLabs/victory/package.json	master
+++ FormidableLabs/victory/package.json	multibot-chore-webpackSideEffects
@@ -60,6 +60,7 @@
     },
     "scripts": {
       "postinstall": ""
     }
-  }
+  },
+  "sideEffects": false
 }


########################################
# FormidableLabs/freactal/package.json #
########################################
# - Branch Source: master
# - Branch Dest:   multibot-chore-webpackSideEffects
# - Branch Action: Create
# - Blob Action:   Update
# - PR URL:        https://github.com/FormidableLabs/freactal/pull/96
# - PR Exists:     false
# - Git SHA:       05d892811af0359e10763d352f0fe004c63cd331
Index: FormidableLabs/freactal/package.json
===================================================================
--- FormidableLabs/freactal/package.json	master
+++ FormidableLabs/freactal/package.json	multibot-chore-webpackSideEffects
@@ -57,6 +57,7 @@
     "sinon-chai": "^2.9.0"
   },
   "dependencies": {
     "prop-types": "15.6.0"
-  }
+  },
+  "sideEffects": false
 }


####################################################
# FormidableLabs/component-playground/package.json #
####################################################
# - Branch Source: master
# - Branch Dest:   multibot-chore-webpackSideEffects
# - Branch Action: Create
# - Blob Action:   Update
# - PR URL:        https://github.com/FormidableLabs/component-playground/pull/121
# - PR Exists:     false
# - Git SHA:       ba6c071c9a3469a3108bbebe5af87854d91a3558
Index: FormidableLabs/component-playground/package.json
===================================================================
--- FormidableLabs/component-playground/package.json	master
+++ FormidableLabs/component-playground/package.json	multibot-chore-webpackSideEffects
@@ -134,6 +134,7 @@
     },
     "files": {
       ".npmignore": ".npmignore.publishr"
     }
-  }
+  },
+  "sideEffects": false
 }


#################################################
# FormidableLabs/formidable-charts/package.json #
#################################################
# - Branch Source: master
# - Branch Dest:   multibot-chore-webpackSideEffects
# - Branch Action: Create
# - Blob Action:   Update
# - PR URL:        https://github.com/FormidableLabs/formidable-charts/pull/14
# - PR Exists:     false
# - Git SHA:       cf490618b1e089467773c9ddfba5c40aadda1c35
Index: FormidableLabs/formidable-charts/package.json
===================================================================
--- FormidableLabs/formidable-charts/package.json	master
+++ FormidableLabs/formidable-charts/package.json	multibot-chore-webpackSideEffects
@@ -60,6 +60,7 @@
     ],
     "files": {
       ".npmignore": ".npmignore.publishr"
     }
-  }
+  },
+  "sideEffects": false
 }


#############################################
# FormidableLabs/nuka-carousel/package.json #
#############################################
# - Branch Source: master
# - Branch Dest:   multibot-chore-webpackSideEffects
# - Branch Action: Create
# - Blob Action:   Update
# - PR URL:        https://github.com/FormidableLabs/nuka-carousel/pull/281
# - PR Exists:     false
# - Git SHA:       c18937a94a527724767f2058b0cc75febc8fdcfb
Index: FormidableLabs/nuka-carousel/package.json
===================================================================
--- FormidableLabs/nuka-carousel/package.json	master
+++ FormidableLabs/nuka-carousel/package.json	multibot-chore-webpackSideEffects
@@ -80,6 +80,7 @@
   "license": "MIT",
   "bugs": {
     "url": "https://github.com/kenwheeler/nuka-carousel/issues"
   },
-  "homepage": "https://github.com/kenwheeler/nuka-carousel"
+  "homepage": "https://github.com/kenwheeler/nuka-carousel",
+  "sideEffects": false
 }


###########################################
# FormidableLabs/radium-grid/package.json #
###########################################
# - Branch Source: master
# - Branch Dest:   multibot-chore-webpackSideEffects
# - Branch Action: Create
# - Blob Action:   Update
# - PR URL:        https://github.com/FormidableLabs/radium-grid/pull/79
# - PR Exists:     false
# - Git SHA:       2f6853852ee6140274df1f49f579a283626a2a0b
Index: FormidableLabs/radium-grid/package.json
===================================================================
--- FormidableLabs/radium-grid/package.json	master
+++ FormidableLabs/radium-grid/package.json	multibot-chore-webpackSideEffects
@@ -45,6 +45,7 @@
     "radium": "^0.18.1",
     "react": "^0.14.0 || ^15.0.0-0",
     "react-dom": "^0.14.0 || ^15.0.0-0"
   },
-  "author": "Tyler Thompson"
+  "author": "Tyler Thompson",
+  "sideEffects": false
 }


################################################
# FormidableLabs/react-animations/package.json #
################################################
# - Branch Source: master
# - Branch Dest:   multibot-chore-webpackSideEffects
# - Branch Action: Create
# - Blob Action:   Update
# - PR URL:        https://github.com/FormidableLabs/react-animations/pull/24
# - PR Exists:     false
# - Git SHA:       c19876a225d2cec38c7455fab752265143f4fba8
Index: FormidableLabs/react-animations/package.json
===================================================================
--- FormidableLabs/react-animations/package.json	master
+++ FormidableLabs/react-animations/package.json	multibot-chore-webpackSideEffects
@@ -48,6 +48,7 @@
     "react-dom": "^15.3.2",
     "rimraf": "^2.5.4",
     "webpack": "^2.1.0-beta.25",
     "webpack-dev-server": "^1.16.1"
-  }
+  },
+  "sideEffects": false
 }


##############################################
# FormidableLabs/react-game-kit/package.json #
##############################################
# - Branch Source: master
# - Branch Dest:   multibot-chore-webpackSideEffects
# - Branch Action: Create
# - Blob Action:   Update
# - PR URL:        https://github.com/FormidableLabs/react-game-kit/pull/59
# - PR Exists:     false
# - Git SHA:       4e0c13f1a8f733befe4a676b9dfc39728acbe6e5
Index: FormidableLabs/react-game-kit/package.json
===================================================================
--- FormidableLabs/react-game-kit/package.json	master
+++ FormidableLabs/react-game-kit/package.json	multibot-chore-webpackSideEffects
@@ -59,6 +59,7 @@
     "rimraf": "^2.5.4",
     "style-loader": "^0.19.0",
     "webpack": "^3.6.0",
     "webpack-dev-server": "^2.9.1"
-  }
+  },
+  "sideEffects": false
 }


##########################################
# FormidableLabs/react-live/package.json #
##########################################
# - Branch Source: master
# - Branch Dest:   multibot-chore-webpackSideEffects
# - Branch Action: Create
# - Blob Action:   Update
# - PR URL:        https://github.com/FormidableLabs/react-live/pull/55
# - PR Exists:     false
# - Git SHA:       d5b2c68ea365466266f73e2b6e989b9f6713107a
Index: FormidableLabs/react-live/package.json
===================================================================
--- FormidableLabs/react-live/package.json	master
+++ FormidableLabs/react-live/package.json	multibot-chore-webpackSideEffects
@@ -80,6 +80,7 @@
     "react live"
   ],
   "jest": {
     "rootDir": "./src"
-  }
+  },
+  "sideEffects": false
 }


###########################################
# FormidableLabs/react-music/package.json #
###########################################
# - Branch Source: master
# - Branch Dest:   multibot-chore-webpackSideEffects
# - Branch Action: Create
# - Blob Action:   Update
# - PR URL:        https://github.com/FormidableLabs/react-music/pull/51
# - PR Exists:     false
# - Git SHA:       53732c70780574962763fef47df54ab19485f1de
Index: FormidableLabs/react-music/package.json
===================================================================
--- FormidableLabs/react-music/package.json	master
+++ FormidableLabs/react-music/package.json	multibot-chore-webpackSideEffects
@@ -57,6 +57,7 @@
     "rimraf": "^2.5.4",
     "style-loader": "^0.13.1",
     "webpack": "^1.13.1",
     "webpack-dev-server": "^1.15.0"
-  }
+  },
+  "sideEffects": false
 }


#######################################################
# FormidableLabs/react-progressive-image/package.json #
#######################################################
# - Branch Source: master
# - Branch Dest:   multibot-chore-webpackSideEffects
# - Branch Action: Create
# - Blob Action:   Update
# - PR URL:        https://github.com/FormidableLabs/react-progressive-image/pull/17
# - PR Exists:     false
# - Git SHA:       f517e0261a66b5896921d3319239e1e42b5393cd
Index: FormidableLabs/react-progressive-image/package.json
===================================================================
--- FormidableLabs/react-progressive-image/package.json	master
+++ FormidableLabs/react-progressive-image/package.json	multibot-chore-webpackSideEffects
@@ -57,6 +57,7 @@
   },
   "peerDependencies": {
     "react": "^15.0.0-0 || ^16.0.0-0",
     "react-dom": "^15.0.0-0 || ^16.0.0-0"
-  }
+  },
+  "sideEffects": false
 }


#############################################
# FormidableLabs/react-shuffle/package.json #
#############################################
# - Branch Source: master
# - Branch Dest:   multibot-chore-webpackSideEffects
# - Branch Action: Create
# - Blob Action:   Update
# - PR URL:        https://github.com/FormidableLabs/react-shuffle/pull/33
# - PR Exists:     false
# - Git SHA:       244de8d9d59433aca327c3d75ce3d444e60ae30a
Index: FormidableLabs/react-shuffle/package.json
===================================================================
--- FormidableLabs/react-shuffle/package.json	master
+++ FormidableLabs/react-shuffle/package.json	multibot-chore-webpackSideEffects
@@ -74,6 +74,7 @@
   "license": "MIT",
   "bugs": {
     "url": "https://github.com/FormidableLabs/react-shuffle/issues"
   },
-  "homepage": "https://github.com/FormidableLabs/react-shuffle"
+  "homepage": "https://github.com/FormidableLabs/react-shuffle",
+  "sideEffects": false
 }


###################################################
# FormidableLabs/redux-little-router/package.json #
###################################################
# - Branch Source: master
# - Branch Dest:   multibot-chore-webpackSideEffects
# - Branch Action: Create
# - Blob Action:   Update
# - PR URL:        https://github.com/FormidableLabs/redux-little-router/pull/265
# - PR Exists:     false
# - Git SHA:       dbc3ee8fbf51cddbae84a1d9f8cfac55983d65e3
Index: FormidableLabs/redux-little-router/package.json
===================================================================
--- FormidableLabs/redux-little-router/package.json	master
+++ FormidableLabs/redux-little-router/package.json	multibot-chore-webpackSideEffects
@@ -146,6 +146,7 @@
     "*.js": [
       "prettier --write",
       "git add"
     ]
-  }
+  },
+  "sideEffects": false
 }

```
