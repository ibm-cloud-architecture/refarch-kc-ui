# Backend For Frontend Server for the  KC Solution

The nodejs / expressjs application is developed using Typescripts and javascripts. The entry point is the `server.ts` file.

The test driven approach is done using [mocha](https://mochajs.org/) as test runner and [chai](https://www.chaijs.com) for assertion library and Typescript. Which means those tools were installed with the command:
```
$ npm install mocha chai ts-node --save-dev
# and install the supporting types for Typescript
# npm install @types/chai @types/mocha --save-dev
```
So the package.json reflects those changes.

To execute the unit tests run `npm test`.

