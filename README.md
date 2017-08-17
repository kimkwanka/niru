# niru
Universal / isomorphic fullstack boilerplate with React, React-Router, React-Redux and more!

## What is niru?
Niru (*japanese: 'to boil'*) is a somewhat opinionated React boilerplate to make app creation as fast as possible.

Although primarily written for my own needs I want to share it so people can use it directly or maybe just have a reference on how to accomplish some more complicated things in the React ecosystem.

Unlike most boilerplates it comes with its own 2 mini CSS frameworks to not only make apps look pleasing right from the beginning but also leverage functional / atomic css to speed up development.

### JS Features
+ State management via React Redux
+ Uses Redux devtools if installed and logs state changes to console (in development mode)
+ Action creators are prebound to dispatch()
+ Routing via React-Router V4
+ Server side rendering
+ Hot reloading (redux state preserving) on client and server side
+ Dynamic document <head> via React-Helmet
+ Able to use 'preact' instead of 'React' by just changing a variable
+ Automatic cache invalidation via use of hash based bundle filenames
+ AirBnB ESLint profile for use with your favorite Code Editor's ESLint plugin

### CSS Features:
+ Stylus support
+ Mini Styleguide page
+ Autoprefixer and auto minification
+ Includes normalize.css by default
+ 'Sutairu' - minimalistic CSS framework based on http://milligram.io/
+ 'Atomiku' - functional CSS framework inspired by http://tachyons.io/
+ Easily extendable and customizable via variables

## Installation
It is recommended to use [yarn](https://yarnpkg.com/lang/en/) for package management instead of npm. 

So assuming you have cloned the niru repository and got yarn installed, 'cd' into the niru directory and type:
```
yarn
```
to install all the dependencies.

To run niru in development mode:
```
yarn dev
```
To run niru in production mode:
```
yarn start
```
To build for production without running:
```
yarn build
```

The ```dev``` and ```build``` commands can also be used to only start / build either client or server side like:
```
yarn dev:client
```
```
yarn dev:server
```
```
yarn build:client
```
```
yarn build:server
```
But most of the time you shouldn't need those.

## How to use niru
Niru uses a ```routes.js``` file to define all routes that are used. So in order to hook up any new pages you create you will have to add it to routes.js. Just take a look how the default pages are used in that file and do the same for your new page.
Be sure to also add a link to your page in ```Header.jsx``` inside ```/src/client/components/shared``` or you'd have to manually type the url in order to see it.

**Note:**
If you add a page to routes.js while ```yarn dev``` is running you will have to restart it for the server side to catch up with the changes.

## Preact
Niru is able to use the smaller (and sometimes faster) [preact](https://preactjs.com/) instead of React out of the box. To enable preact, open ```webpack.config.client.js``` (be sure to stop niru) and change
```
const usePreact = false;
```
to
```
const usePreact = true;
```
Now add preact and preact-compat packages via:
```
yarn add preact preact-compat
```
Niru should now use preact.