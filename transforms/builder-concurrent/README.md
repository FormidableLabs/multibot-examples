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

1. Replace any `concurrently` dependencies in `dependencies` or
   `devDependencies` with `builder`.
2. Mutate any npm tasks to switch `concurrently` to the `builder concurrent`
   analog.

The [`transform.js`](./transform.js) script has a few precautionary errors to
guarantee we limit the repos we act upon to just those meeting the heuristic.

We can try things out completely unauthenticated to make sure the repos are
appropriately transformed:

```sh
$ multibot \
  --no-auth \
  --org FormidableLabs \
  --repos formidable-react-native-app-boilerplate victory-standalone redux-little-router radium spectacle-editor measure-text ecology converter-react \
  --action=read \
  --files package.json \
  --transform="transforms/builder-concurrent/transform.js" \
  --format=diff \
  --dry-run
```

