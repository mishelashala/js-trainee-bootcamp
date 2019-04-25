# Portfolio

This is an example of how to build modern web pages using tools like: gulp, browserify, pug, stylus and more.

## Installation

First you must have `node` and `npm` installed on your machine (we recomend the LTS version).

To install the dependencies run the following:

```
$ npm install
```

## Development

To start the project you must run:

```
$ npm start
```

That will run `gulp` with the default task: pug and stylus into html and css respectively. The build will be located at `public` directory.

If you make any change to the `pug`, `stylus` or files `gulp` will trigger the build proccess again.

## Production Build

To build for production run:

```
$ npm run build
```

This command will trigger the `gulp build` task. The build will be located at `public` directory.
Every `css` and `html` result file will be minified.
