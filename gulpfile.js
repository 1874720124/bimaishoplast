const gulp=require('gulp'),
     uglify=require('gulp-uglify'),
    minifyCss =require('gulp-minify-css'),
    gulpSass=require('gulp-sass'),
    htmlmin=require('gulp-htmlmin'),
    babel=require('gulp-babel'),
    connect=require('gulp-connect')
    ;

    gulp.task('default',()=>{
        console.log("default");
    })
    gulp.task('css',()=>{
        // gulp.src可以取源文件
        gulp.src('src/css/**/*.scss')
            .pipe(gulpSass())
            .pipe(minifyCss())
            // 将加工完的css放在dist的css中
            .pipe(gulp.dest('dist/css'))
            .pipe(connect.reload());

    })
    // 制定html任务
    gulp.task("html", function(){
        gulp.src("src/**/*.html")
            .pipe(htmlmin({
                   removeComments: true,//清除HTML注释
                   collapseWhitespace: true,//压缩HTML
                   collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
                   removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
                   removeScriptTypeAttributes: false,//删除<script>的type="text/javascript"
                   removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
                //    minifyJS: true,压缩页面JS
                //    minifyCSS: true压缩页面CSS 
               })
            )
            .pipe(gulp.dest("dist"))
            .pipe(connect.reload());
    })   
    // 制定js任务
    gulp.task('js',()=>{
        gulp.src('src/js/**/*.js')
        // .pipe(babel({
        //     presets: ['@babel/env']
        // }))
        // .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(connect.reload());
    })
    // 制定libs任务
    gulp.task('libs',()=>{
        gulp.src('src/libs/**/*')
        .pipe(gulp.dest('dist/libs'))
    })
// 制定images任务
gulp.task('images',()=>{
    gulp.src('src/images/**/*')
    .pipe(gulp.dest('dist/images'))
})
 // 制定开启服务器的任务
 gulp.task('server',()=>{
    connect.server({
        root: "dist",
        port:1902,
        livereload: true //热更新
      });
 })
//  制定监听任务
gulp.task('watch',()=>{
    // 监听所有html，当html修改时候，重新执行html任务，后面数组里的是重新执行的任务
    gulp.watch('src/**/*.html',['html']);
    gulp.watch('src/js/**/*.js',['js']);
    gulp.watch('src/css/**/*.scss',['css']);
    // libs和images一般不用重新修改,不用监听
})
// 任务一次性执行
gulp.task('default',["html","js","css","libs","images","server","watch"]);