# File upload service by node.js and AWS S3 storage

As a file upload API demo.

## Pre-install

```sh
npm install -g mocha pm2 apidoc concurrently
```

## Install

```sh
npm install
```

## Development

```sh
npm start # local dev environment
npm run doc # generate apidoc files
npm test # exec mocha test files(*.spec.js)
npm run deploy:test # git push to test branch and deploy to test server
npm run log # show local process logs
npm run log:test # show remote process logs(test server)
```
