const { series, watch } = require("gulp");
const pug = require("gulp-pug");
const stylus = require("gulp-stylus");
const browserify = require("gulp-browserify");
const gulp = require("gulp");

/**
 * Build for development
 * speed
 * readability
 */
function devWatch() {
  watch(["src/styles/**/*.styl"], devCss);
  watch(["src/views/**/*.pug"], devHtml);
  watch(["src/scripts/**/*.js"], devJs);
}

function devHtml() {
  return gulp
    .src("src/views/*.pug")
    .pipe(pug())
    .pipe(gulp.dest("public"));
}

// nodejs streams
function devCss() {
  return gulp
    .src("src/styles/*.styl")
    .pipe(stylus())
    .pipe(gulp.dest("public"));
}

function devJs() {
  return gulp
    .src("src/scripts/app.js")
    .pipe(
      browserify({
        insertGlobals: false,
        debug: true
      })
    )
    .pipe(gulp.dest("./public/js"));
}

/**
 * Build for production
 * performance
 */
function prodHtml() {
  return gulp
    .src("src/views/*.pug")
    .pipe(
      pug({
        verbose: false
      })
    )
    .pipe(gulp.dest("public"));
}

// nodejs streams
function prodCss() {
  return gulp
    .src("src/styles/*.styl")
    .pipe(
      stylus({
        compress: true
      })
    )
    .pipe(gulp.dest("public"));
}

function prodJs() {
  return gulp
    .src("src/scripts/app.js")
    .pipe(
      browserify({
        insertGlobals: false,
        debug: false
      })
    )
    .pipe(gulp.dest("./public/js"));
}

exports.build = series(prodHtml, prodCss, prodJs);

exports.default = series(devHtml, devCss, devJs, devWatch);
