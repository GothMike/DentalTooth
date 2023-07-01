const { src, dest, watch, parallel, series } = require("gulp");

const scss = require("gulp-sass")(require("sass"));
const concat = require("gulp-concat");
const uglify = require("gulp-uglify-es").default;
const browserSync = require("browser-sync").create();
const autoPrefixer = require("gulp-autoprefixer");
const avif = require("gulp-avif");
const webp = require("gulp-webp");
const imagemin = require("gulp-imagemin");
const newer = require("gulp-newer");
const fonter = require("gulp-fonter");
const ttf2woff2 = require("gulp-ttf2woff2");
const include = require("gulp-include");
const htmlmin = require("gulp-htmlmin");

function pages() {
  return src("src/pages/*.html")
    .pipe(
      include({
        includePaths: "src/components",
      })
    )
    .pipe(dest("src"))
    .pipe(browserSync.stream());
}

function html() {
  return src("src/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest("dist/"))
    .pipe(browserSync.stream());
}

function fonts() {
  return src("src/fonts/src/*.*")
    .pipe(
      fonter({
        formats: ["woff", "ttf"],
      })
    )
    .pipe(src("src/fonts/*.ttf"))
    .pipe(ttf2woff2())
    .pipe(dest("dist/fonts"));
}

function images() {
  return src(["src/img/src/**/*.*", "!src/img/src/**/*.svg"])
    .pipe(newer("src/img/dist"))
    .pipe(avif({ quality: 90 }))

    .pipe(src("src/img/src/**/*.*"))
    .pipe(newer("src/img/dist"))
    .pipe(webp())

    .pipe(src("src/img/src/**/*.*"))
    .pipe(newer("src/img/dist"))
    .pipe(imagemin())

    .pipe(dest("dist/img"));
}

function scripts() {
  return src("src/js/main.js")
    .pipe(concat("main.min.js"))
    .pipe(uglify())
    .pipe(dest("dist/js"))

    .pipe(browserSync.stream());
}

function styles() {
  return src("src/scss/**/*.+(scss|sass)")
    .pipe(autoPrefixer({ overrideBrowsersList: ["last 5 version"] }))
    .pipe(concat("style.min.css"))
    .pipe(scss({ outputStyle: "compressed" }))
    .pipe(dest("dist/css"))
    .pipe(browserSync.stream());
}

function watching() {
  browserSync.init({
    server: {
      baseDir: "dist/",
    },
  });
  watch(["src/scss/**/*.+(scss|sass)"], styles);
  watch(["src/img/src"], images);
  watch(["src/js/main.js"], scripts);
  watch(["src/components/*", "src/pages/*"], pages);
  watch(["src/*.html"], html);
  watch(["src/*.html"]).on("change", browserSync.reload);
}

exports.styles = styles;
exports.scripts = scripts;
exports.fonts = fonts;
exports.html = html;
exports.pages = pages;
exports.watching = watching;
exports.images = images;
exports.default = parallel(styles, scripts, fonts, images, pages, html, watching);
