# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [2.5.2](https://github.com/kimkwanka/niru/compare/v2.5.1...v2.5.2) (2019-12-20)


### Bug Fixes

* **deps:** upgrade packages to latest to fix vulnerabilities (snyk test) ([8bf3ed0](https://github.com/kimkwanka/niru/commit/8bf3ed0255d8f931f34d74b7b3061b4ed4f22986))

### [2.5.1](https://github.com/kimkwanka/niru/compare/v2.5.0...v2.5.1) (2019-12-19)


### Bug Fixes

* **deps:** fix package-lock.json ([e855105](https://github.com/kimkwanka/niru/commit/e855105cdbf2928fa5a8480a92026b60fe612f6a))
* **test:** update snapshot and stop using prop spreading(eslint error) ([e084358](https://github.com/kimkwanka/niru/commit/e084358cc49a35305c7bb156492c0a86286d15f7))

# [2.5.0](https://github.com/kimkwanka/niru/compare/v2.4.2...v2.5.0) (2019-02-26)


### Features

* bundle up whole server in production ([f806950](https://github.com/kimkwanka/niru/commit/f806950))



## [2.4.2](https://github.com/kimkwanka/niru/compare/v2.4.1...v2.4.2) (2019-02-24)


### Bug Fixes

* **test:** clean ./dist before running tests ([d9f1322](https://github.com/kimkwanka/niru/commit/d9f1322))



## [2.4.1](https://github.com/kimkwanka/niru/compare/v2.4.0...v2.4.1) (2019-02-23)


### Bug Fixes

* **build:** make setting env variables compatible with Windows ([cf26f00](https://github.com/kimkwanka/niru/commit/cf26f00))
* move dependencies into correct package.json category ([b731a26](https://github.com/kimkwanka/niru/commit/b731a26))
* **webpack:** move RHL webpack plugin to dev config only ([36e20ab](https://github.com/kimkwanka/niru/commit/36e20ab))



# [2.4.0](https://github.com/kimkwanka/niru/compare/v2.3.2...v2.4.0) (2019-02-22)


### Bug Fixes

* **build:** re-add cleaning step in development ([577d32a](https://github.com/kimkwanka/niru/commit/577d32a))


### Features

* transpile server using @babel/cli instead of using @babel/register in production ([31baf46](https://github.com/kimkwanka/niru/commit/31baf46))
* **webpack:** enable babel-loader caching ([8679a38](https://github.com/kimkwanka/niru/commit/8679a38))
* use aliases for nicer import paths ([7800bbc](https://github.com/kimkwanka/niru/commit/7800bbc))



## [2.3.2](https://github.com/kimkwanka/niru/compare/v2.3.1...v2.3.2) (2019-02-19)


### Bug Fixes

* apply react-dom hot patch for React 16.6+ feature compatibility ([6495d64](https://github.com/kimkwanka/niru/commit/6495d64))



## [2.3.1](https://github.com/kimkwanka/niru/compare/v2.3.0...v2.3.1) (2019-02-18)


### Bug Fixes

* **server:** replace @babel/node with @babel/register ([46b02f8](https://github.com/kimkwanka/niru/commit/46b02f8))



# [2.3.0](https://github.com/kimkwanka/niru/compare/v2.2.1...v2.3.0) (2019-02-18)


### Features

* **webpack:** enable tree shaking ([e03c1c9](https://github.com/kimkwanka/niru/commit/e03c1c9))



## [2.2.1](https://github.com/kimkwanka/niru/compare/v2.2.0...v2.2.1) (2019-02-17)


### Bug Fixes

* **changelog:** manually fix current changelog ([55d1be6](https://github.com/kimkwanka/niru/commit/55d1be6))
* **changelog:** replace standard-version with fixed fork ([966f064](https://github.com/kimkwanka/niru/commit/966f064))



# [2.2.0](https://github.com/kimkwanka/niru/compare/v2.1.0...v2.2.0) (2019-02-17)


### Bug Fixes

* **ci:** disable eslint rule to prevent lint fail in CI ([d626c1e](https://github.com/kimkwanka/niru/commit/d626c1e))
* **ci:** include snapshots in repo to make CI tests pass ([925b7ed](https://github.com/kimkwanka/niru/commit/925b7ed))
* **docs:** add missing line break ([aee346e](https://github.com/kimkwanka/niru/commit/aee346e))


### Features

* **ci:** add build testing via Travis CI ([f26f300](https://github.com/kimkwanka/niru/commit/f26f300))



# [2.1.0](https://github.com/kimkwanka/niru/compare/2.0.0...v2.1.0) (2019-02-16)


### Bug Fixes

* **docs:** small changes to README. ([457db76](https://github.com/kimkwanka/niru/commit/457db76))
* **test:** ignore ./dist folder when determining code coverage ([a79147a](https://github.com/kimkwanka/niru/commit/a79147a))
* create 'hot-ssr.js' before running tests if non-existant ([6ded0ae](https://github.com/kimkwanka/niru/commit/6ded0ae))


### Features

* add 'standard-version' to automate versioning and CHANGELOG management. ([71769a2](https://github.com/kimkwanka/niru/commit/71769a2))
