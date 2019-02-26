# niru
[![Build Status](https://travis-ci.org/kimkwanka/niru.svg?branch=master)](https://travis-ci.org/kimkwanka/niru)
[![Dependency Status](https://david-dm.org/kimkwanka/niru.svg)](https://david-dm.org/kimkwanka/niru)
[![Dev Dependency Status](https://david-dm.org/kimkwanka/niru/dev-status.svg)](https://david-dm.org/kimkwanka/niru?type=dev)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-green.svg)](https://conventionalcommits.org)

Universal / isomorphic fullstack boilerplate with React, React-Router, React-Redux and more!

# Attention!
Niru has been rewritten from the ground up and even though it is pretty similar to the old version, there's still quite a few differences.

So if you're looking for the old version you can find it here: [niruV1](https://github.com/kimkwanka/niruV1).

## What is niru?
Niru (*japanese: 'to boil'*) is a somewhat opinionated React boilerplate to make app creation as fast as possible.

Although primarily written for my own needs I want to share it so people can use it directly or maybe just have a reference on how to accomplish some of the weirder things in the React ecosystem.

Unlike most boilerplates it comes with its own 2 mini CSS frameworks to not only make apps look pleasing right from the beginning but also leverage functional / atomic css to speed up development.

### Main Features
+ Minimal [Webpack V4](https://github.com/webpack/webpack) config
+ State management via [React Redux](https://redux.js.org/basics/usage-with-react) (with prehydrated store)
+ Uses [Redux devtools](https://github.com/reduxjs/redux-devtools) if installed and logs state changes to console (in development mode)
+ Routing via [React-Router V4](https://github.com/ReactTraining/react-router)
+ [Server side rendering (SSR)](https://reactjs.net/features/server-side-rendering.html)
+ [Hot module replacement (HMR)](https://webpack.js.org/concepts/hot-module-replacement/) on client side
+ Server hot reloads when SSR parts are concerned, otherwise automatically restarts and reloads browser (via [nodemon](https://github.com/remy/nodemon)  and [reload](https://github.com/alallier/reload)
+ Unit tests and coverage via [Jest](https://github.com/facebook/jest), [Enzyme](https://github.com/airbnb/enzyme) and [SuperTest](https://github.com/visionmedia/supertest)
+ Dynamic document ```<head>``` via [React Helmet](https://github.com/nfl/react-helmet)
+ Automatic [cache invalidation](https://webpack.js.org/guides/caching/) via use of hash based bundle filenames
+ AirBnB [ESLint](https://github.com/eslint/eslint) profile for use with your favorite code editor's ESLint plugin or the command line version
+ ES6 on the server side
+ Custom favicon.ico and 404 page
+ Automated versioning and CHANGELOG generation via [standard-version](https://github.com/conventional-changelog/standard-version)
+ A sticky footer :)

### CSS Features:
+ [Stylus](http://stylus-lang.com/) support
+ Mini Styleguide page
+ Autoprefixer and auto minification
+ Includes normalize.css by default
+ 'Sutairu' - minimalistic CSS framework based on http://milligram.io/
+ 'Atomiku' - functional CSS framework inspired by http://tachyons.io/
+ Easily extendable and customizable via variables
+ [Purgecss](https://github.com/FullHuman/purgecss) to remove all unused CSS classes from your .css.

## Installation
Assuming you have cloned the niru repository 'cd' into the niru directory and type either
```
yarn
```
or
```
npm install
```
depending on your prefered package manager to install all dependencies.  
## Development mode
To run niru in development mode:
```
yarn dev
```
or
```
npm run dev
```
### Accessing the app locally or on your network
When started, the server will output 2 urls to access the running app:
```
Express server running in development mode
Local:            http://localhost:8080/
On Your Network:  http://192.168.1.6:8080/    <------ JUST AN EXAMPLE!!!!

```
(Note that the second one above is just a sample and will look differently on your machine.)
  

Open your browser on either ```http://localhost:8080/``` or the one that looks similar to ```http://192.168.1.6:8080/``` to see the running app.
The second url can be opened on any machine / mobile / whatever on your local network. This can be pretty handy to test the app on a variety of devices / OSes.

### HMR (Hot module replacement)
When files in the ```./client``` folder change, hot module replacement is triggered on **both** the client and server to instantly reflect those changes.

### Nodemon autorestart and browser reload
Changes to files in the ```./server``` folder don't trigger HMR but instead make nodemon restart the server and then trigger a hard refresh in the browser.

## Production mode
To run niru in production mode use either
```
yarn start
```
or
```
npm start
```
This will clean the ```./dist``` folder, build all assets and then run the express server.
  

By default niru will run on ```localhost:8080``` even in production. To change the production port, you need to provide an
environment variable ```PORT``` or just edit the following line in ```./server/server.js``` directly:
```
const PORT = process.env.PORT || 8080; // Change to whatever you want!
```
## Build only
To only build for production without running:
```
yarn build
```
or
```
npm run build
```
## Testing
### Where is the test folder, where are the snapshots?
Following the idea to group files _by domain_ there is neither a tests or snapshots folder. Instead the test and snapshot files are directly grouped with their corresponding source file.
#### Example
```
    ...
    ├── Home                         # <Home /> component folder
    │        Home.jsx                # Source file
    │        Home.test.jsx           # Test file
    │        Home.test.jsx.snap      # Snapshot file
    ...
```
### Run tests once
To run all included tests once and show code coverage:
```
yarn test
```
or
```
npm test
```
(When using yarn, you can add ```--verbose``` to show each individual test's output. If you use npm, add ```-- --verbose``` instead.)
### Run tests continuously
To run all included tests continuously, rerunning them automatically when test files change:
```
yarn test:watch
```
or
```
npm test:watch
```
## Linting
It is recommended to use ESLint directly in your favorite code editor via plugins like [VSCode ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint), [Atom ESLint](https://atom.io/packages/eslint) or similar.
### On the command line
Since many code editors only lint the currently opened files automatically, it can be helpful to run ESLint on the command line:
```
yarn lint
```
or
```
npm run lint
```
This will lint all client and server source files.

## Automatic versioning and changelog creation
If you follow the [Conventional Commits Specification](https://conventionalcommits.org/) you can let [standard-version](https://github.com/conventional-changelog/standard-version) automatically version your project and create / update a CHANGELOG.md from your commit messages.
### Dry mode
Running standard-version in dry mode via
```
yarn release:dry
```
or
```
npm run release:dry
```
allows you to see what commands would be run, without actually updating any files or commiting to git yet.
### Publish a new release
If you like what you see and are ready to publish a new release run:
```
yarn release
```
or
```
npm run release
```
to bump up the version, create/update CHANGELOG.md, commit to git and tag a new release.

After that it's only a matter of
```
git push --follow-tags origin master
```
to finalize publishing process.
### More information
Check out [standard-version](https://github.com/conventional-changelog/standard-version)'s github page for more indepth information on CLI usage, etc.
## How to use niru
### Folder structure
    .
    ├── client                  # Client source files
    │   ├── actions             # Redux action creators
    │   ├── components          # React components
    │   ├── reducers            # Redux reducers
    |   └── stylus              # Stylus files + CSS frameworks
    │       index.js            # Client entry point
    │       routes.js           # React-Router route definitions
    │       store.js            # Redux store
    |
    ├── public                  # Static assets like images, favicon.ico, etc.
    |
    ├── server                  # Server source files
    ...

### The mysterious /dist folder and static assets
Even though its contents are served by the server, the ```./dist``` folder gets automatically deleted and recreated when starting niru. That's why you should never put files in there manually. If you want to add static assets like images, etc. put them into ```./public``` instead and restart niru if it is running. Assets are then accessible at ```/``` in your app. 

So if say you added ```lolcat.jpg``` you could use it like 
```
<img src="/lolcat.jpg" />
```
in your code / CSS.
If you create subfolders in ```./public``` they will be preserved.

### Adding a new page
Niru uses a ```routes.js``` file to define all routes that are used. So in order to hook up any new page components you create you will have to add it to routes.js. Just take a look how the default pages are used in that file and do the same for your new page.
Be sure to also add a link to your page in ```Header.jsx``` inside ```./client/components/App/Header/``` or you'd have to manually type in the url in order to see it.

### Express server routing flow
Niru's express server will try to resolve any requests in this order:
1. Static assets in ```./public``` or ```./dist```
2. ```/api``` sample route
3. React Router routes defined in ```./client/routes.js```
3. 404 for everything else

Note that instead of just returning 404 for requests that couldn't be resolved, it will also render a custom 404 page (```./client/components/NotFound404```).

### Using stylus / CSS
Niru comes with stylus support out of the box so in order to edit the app's style just edit the ```style.styl``` file.

Unlike SASS it doesn't care if you want to write normal CSS, SCSS or the really short indented syntax. Mix and match however you like - use columns, semicolons, curly braces or don't - stylus doesn't care.
Even though Stylus is a lot like SASS/SCSS there are a few minor syntax differences. For more information on stylus check: http://stylus-lang.com/

### Normalize.CSS
By default [normalize.css](https://necolas.github.io/normalize.css/) is included but if you for some reason don't want to use it just comment out or delete
```
@import '../../node_modules/normalize.css'
```
in ```./client/stylus/style.styl```.

### Sutairu
Sutairu is a really minimal CSS framework I created that gives niru some default styling to make you not want to gouge your eyes out. The easiest way to customize it is to overwrite its default variables in ```style.styl```, right above(!) the import statements. If you put the overwrites below the imports it won't work. All possible variables can be found in ```./client/stylus/sutairu/base/_defaultVars.styl```.
If for example you want to overwrite the primary color to sexy red and the button font size to 96px, you'd add the following lines at the beginning of ```style.styl```:
```
$primaryColor = red
$buttonFontSize = 96px
```
Although you COULD directly edit the variables inside ```./client/stylus/sutairu/base/_defaultVars.styl``` I'd recommend not touching them but instead overwriting them inside ```style.styl``` like I showed you, so that you have the defaults always available should you mess up.

If you don't want to use sutairu just remove its import in ```style.styl``` by commenting out / deleting
```
@import './sutairu'
```
### Atomiku
Atomiku is my functional CSS mini framework which gives you small css "modifiers" that you can directly apply to your components to make speed up app development.
The idea is instead of writing the same CSS over and over again for 1000 different classes you only write it once and then compose.
An example of such usage can be seen in ```Home.jsx``` where the ```<div>``` is defined like this:
```
<div className="flex-column items-center margin-top-big">
```
So instead of coming up with some weird name like "home-button-outer-div" and then writing the CSS normally its styling is directly applied via those functional bits.
```flex-column``` makes the div a ```display: flex;``` container with ```flex-direction: column;```, ```items-center``` applies ```align-items: center;``` to horizontally center its children and ```margin-top-big``` just adds some big margin to the top.
To see which functional css bits are available, have a look at the files inside ```./client/stylus/atomiku/```. Feel free to add more bits if you need them.

For a more thorough introduction to functional CSS check out https://marcelosomers.com/writing/rationalizing-functional-css/.

Like sutairu, atomiku can be somewhat customized by overwriting its default variables which you can find in ```./client/stylus/atomiku/_defaultVars.styl```. The same "rules" apply here.

The cool thing about functional CSS is that you don't have to use it everywhere. You can easily just use it in addition to your regular BEM / SMACCS or whatever CSS to cut down on the number of classes you need to manually create.

If you don't want to use atomiku at all though, just remove its import in ```style.styl``` by commenting out / deleting
```
@import './atomiku'
```

### Purgecss
When you run in production mode with ```yarn start``` / ```npm start``` or just build for production with ```yarn build``` / ```npm run build```Purgecss will automatically remove all unused CSS from the resulting .css file.
