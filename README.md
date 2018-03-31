[![npm][npm]][npm-url]
[![node][node]][node-url]
[![deps][deps]][deps-url]

# demo-react-app-blog

Demo Blog App utilizing:
* React
* Redux
  * Duck Pattern
* Webpack
  * Path resolution
  * Code-splitting
  * Hot Module Reloading (Dev server)
* BlueprintJS (UI Component Library)
* SASS Modules
* JWT Middleware
* AWS
  * S3

## Development Setup

1. First clone the repository: `git@github.com:miasua/demo-react-app-blog.git`
2. Change directories: `cd demo-react-app-blog`
3. Install Dependencies: `yarn install`
4. Start the dev server: `yarn start`
5. go to [http://localhost:8080/](http://localhost:8080/) in your browser

## Building

To build react-app-scaffolding run `yarn build` - This will empty the `/dist` folder and webpack will build new artifacts.

## Deploying

You can deploy to S3 from the command line:

1. Copy `bin/config.example.js` to `bin/config.js`
2. Update the `bin/config.js` file with your AWS credentials. (AWS credentials are used to deploy to S3 only, and aren't required for development)

- `yarn deploy-dev` deploys to the bucket set for `development`
- `yarn deploy-qa` depploys to `staging`
- `yarn deploy-prod` deploys to `production`

## Dependencies

- [Yarn](https://yarnpkg.com/en/)
- [React](https://facebook.github.io/react/docs/hello-world.html)
- [React Router 4](https://reacttraining.com/react-router/web/guides/quick-start)
- [Redux](http://redux.js.org/)
- [Webpack 2](https://webpack.js.org/configuration/)

[npm]: https://img.shields.io/npm/v/style-loader.svg
[npm-url]: https://npmjs.com/package/style-loader

[node]: https://img.shields.io/node/v/style-loader.svg
[node-url]: https://nodejs.org

[deps]: https://david-dm.org/webpack/style-loader.svg
[deps-url]: https://david-dm.org/webpack/file-loader
