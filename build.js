var fs = require("fs");
var browserify = require("browserify");

['./main.js', './scene.js'].forEach((path) => {
    browserify(path)
        .transform("babelify", {presets: ["es2015", "react"]})
        .bundle()
        .pipe(fs.createWriteStream( path.replace(/\.\w+$/, '.bundle.js')));
});


