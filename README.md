# niru
Universal / isomorphic fullstack boilerplate with React, React-Router, React-Redux and more!

## What is niru?
Niru (*japanese: 'to boil'*) is a somewhat opinionated React boilerplate to make app creation as fast as possible.

Although primarily written for my own needs I want to share it so people can use it directly or maybe just have a reference on how to accomplish some of the weirder things in the React ecosystem.

Unlike most boilerplates it comes with its own 2 mini CSS frameworks to not only make apps look pleasing right from the beginning but also leverage functional / atomic css to speed up development.

### Main Features
+ State management via React Redux (with prehydrated store)
+ Uses Redux devtools if installed and logs state changes to console (in development mode)
+ Action creators are prebound to dispatch()
+ Routing via React-Router V4
+ Server side rendering
+ Hot reloading (redux state preserving) on client and server side
+ Dynamic document ```<head>``` via React-Helmet
+ Able to use 'preact' instead of 'React' by just changing a variable
+ Automatic cache invalidation via use of hash based bundle filenames
+ AirBnB ESLint profile for use with your favorite Code Editor's ESLint plugin
+ ES6 on the server side
+ A sticky footer :)

### CSS Features:
+ Stylus support
+ Mini Styleguide page
+ Autoprefixer and auto minification
+ Includes normalize.css by default
+ 'Sutairu' - minimalistic CSS framework based on http://milligram.io/
+ 'Atomiku' - functional CSS framework inspired by http://tachyons.io/
+ Easily extendable and customizable via variables
+ [PurifyCSS](https://github.com/purifycss/purifycss) (custom fork) to remove all unused CSS classes from your .css.

## Installation
It is recommended to use [yarn](https://yarnpkg.com/lang/en/) for package management instead of npm. 

So assuming you have cloned the niru repository and got yarn installed, 'cd' into the niru directory and type:
```
yarn
```
to install all the dependencies.
## Development mode
To run niru in development mode:
```
yarn dev
```
Open your browser on ```localhost:8080``` to see the running app.
## Production mode
To run niru in production mode:
```
yarn build:start
```
This will first build all assets and then run the server.
By default niru will run on ```localhost:8080``` even in production. To change the production port, you need to provide an
environment variable ```PORT``` or just edit the following line in ```/src/server/index.js``` directly:
```
const PORT = process.env.PORT || 8080; // Change to whatever you want!
```
## Build only
To build for production without running:
```
yarn build
```
## Start only
To start the server in production mode after everything was built using ```yarn build```:
```
yarn start
```
### Notes on deployment on Heroku
By default heroku just runs "yarn start" after installing the dependencies but as you have seen before, doing so just runs the server without building the assets.
Although one could include the build step into the "yarn start" script it would mean that each time your app is starting up from heroku's "hibernation", it would also run the lengthy build step again. Apart from making your app take longer to start up this can also lead to a memory issue that makes your app unable to even start up.
Therefore, for deployment on heroku a ```heroku-postbuild``` script is included which automatically builds all the assets after installing the dependencies. This way everything is already built and ready to be run, even after hibernation.
## Other commands
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
### Folder structure
    .
    ├── ...
    ├── src                     
    │   ├── assets              # Images, etc.
    │   ├── client              
    │   │   ├── actions         # Redux action creators
    │   │   ├── components      # React components
    │   │   │   └── shared      # Shared React components like <Header />
    │   │   ├── reducers        # Redux reducers
    │   │   └── style           # Stylus files + CSS frameworks
    │   │   index.js            # Client entry point
    │   │   App.jsx             # Main app component
    │   ├── server              
    │   │   index.js            # Server entry point
    │   │   reactRoutes.js      # Server side rendering
    │   │   server.js           # Main server file
    │   └── shared              # Code shared by client and server
    │       routes.js           # React-Router route definitions
    │       store.js            # Redux store
    ...
### The mysterious /dist folder and assets
The ```/dist``` folder gets automatically deleted and recreated when starting niru so you should never put files in there manually. If you want to add assets like images, etc. put them into ```/src/assets``` and restart niru if it is running. This will recreate the ```/dist``` folder and copy the assets into the correct folder for serving. Assets are then accessible at ```/``` in your app. So if say you added ```lolcat.jpg``` you could use it like 
```
<img src="/lolcat.jpg" />
```
in your code / CSS.
If you create subfolders in ```/assets``` they will be preserved.

### Adding a new page
Niru uses a ```routes.js``` file to define all routes that are used. So in order to hook up any new page components you create you will have to add it to routes.js. Just take a look how the default pages are used in that file and do the same for your new page.
Be sure to also add a link to your page in ```Header.jsx``` inside ```/src/client/components/shared``` or you'd have to manually type in the url in order to see it.

**Note:**
If you add a page to routes.js while ```yarn dev``` is running you will have to restart it for the server side to catch up with the changes.

### Express server routing flow
Niru's express server first tries to resolve any routes as a React-Router route. If the route is defined in ```routes.js``` the appropriate
React component page will be rendered on the server and served as HTML. 

If you however requested ```/api``` for example which is not defined in there, ```reactRoutes.jsx``` middleware will pass
on the request via ```next()``` so that express can try to find another matching middleware / route to fulfill the request. 
To try this out I added a really simple example API in ```api.js``` that can be accessed on ```/api```.
If you want to add your own API just edit ```api.js``` or replace it with something more fitting for your needs.

When the route is neither defined in ```routes.js``` nor in any other middleware, the server will just respond with HTTP STATUS CODE ```404```.

### Using stylus / CSS
Niru comes with stylus support out of the box so in order to edit the app's style just edit the ```style.styl``` file.

Unlike SASS it doesn't care if you want to write normal CSS, SCSS or the really short indented syntax. Mix and match however you like - use columns, semicolons, curly braces or don't - stylus doesn't care.
Even though Stylus is a lot like SASS/SCSS there are a few minor syntax differences. For more information on stylus check: http://stylus-lang.com/

### Normalize.CSS
By default [normalize.css](https://necolas.github.io/normalize.css/) is included but if you for some reason don't want to use it just comment out or delete
```
@import '../../../node_modules/normalize.css'
```
in ```/style/sutairu/index.styl```.

### Sutairu
Sutairu is a really minimal CSS framework I created that gives niru some default styling to make you not want to gouge your eyes out. The easiest way to customize it is to overwrite its default variables in ```style.styl```, right above(!) the import statements. If you put the overwrites below the imports it won't work. All possible variables can be found in ```/style/sutairu/base/_defaultVars.styl```.
If for example you want to overwrite the primary color to sexy red and the button font size to 96px, you'd add the following lines at the beginning of ```style.styl```:
```
$primaryColor = red
$buttonFontSize = 96px
```
Although you COULD directly edit the variables inside ```/style/sutairu/base/_defaultVars.styl``` I'd recommend not touching them but instead overwriting them inside ```style.styl``` like I showed you, so that you have the defaults always available should you mess up.

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
To see which functional css bits are available, have a look at the files inside ```/atomiku```. Feel free to add more bits if you need them.

For a more thorough introduction to functional CSS check out https://marcelosomers.com/writing/rationalizing-functional-css/.

Like sutairu, atomiku can be somewhat customized by overwriting its default variables which you can find in ```/style/atomiku/_defaultVars.styl```. The same "rules" apply here.

The cool thing about functional CSS is that you don't have to use it everywhere. You can easily just use it in addition to your regular BEM / SMACCS or whatever CSS to cut down on the number of classes you need to manually create.

If you don't want to use atomiku at all though, just remove its import in ```style.styl``` by commenting out / deleting
```
@import './atomiku'
```

### PurifyCSS
When you run in production mode with ```yarn build:start``` or just build for production with ```yarn build``` PurifyCSS will automatically remove all unused CSS from the resulting .css file.

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
