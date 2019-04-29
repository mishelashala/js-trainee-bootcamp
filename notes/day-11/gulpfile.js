const { series, watch } = require("gulp");
const pug = require("gulp-pug");
const stylus = require("gulp-stylus");
const cleanCSS = require("gulp-clean-css");
const gulp = require("gulp");
const browserify = require("gulp-browserify");
const server = require("gulp-server-livereload");

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

function copyCss() {
  return gulp
    .src("src/normalize.css")
    .pipe(cleanCSS({ compatibility: "ie8" }))
    .pipe(gulp.dest("public/vendor/"));
}

function copyImages() {
  return gulp.src("src/images/*.*").pipe(gulp.dest("public/images/"));
}

function devServer() {
  return gulp.src("./public").pipe(
    server({
      livereload: true,
      open: true
    })
  );
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

exports.build = series(copyCss, copyImages, prodHtml, prodCss, prodJs);

exports.default = series(
  copyCss,
  copyImages,
  devHtml,
  devCss,
  devJs,
  devServer,
  devWatch
);
