const { series, watch } = require("gulp");
const pug = require("gulp-pug");
const stylus = require("gulp-stylus");
var gulpCopy = require("gulp-copy");
const gulp = require("gulp");

/**
 * Build for development
 * speed
 * readability
 */
function devWatch() {
  watch(["src/styles/**/*.styl"], devCss);
  watch(["src/views/**/*.pug"], devHtml);
}

function devHtml() {
  return gulp
    .src("src/views/*.pug")
    .pipe(pug())
    .pipe(gulp.dest("public"));
}

function devCss() {
  return gulp
    .src("src/styles/*.styl")
    .pipe(stylus())
    .pipe(gulp.dest("public"));
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

exports.build = series(prodHtml, prodCss);

exports.default = series(devHtml, devCss, devWatch);
