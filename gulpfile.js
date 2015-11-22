var gulp = require('gulp');
	jshint = require('gulp-jshint'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat'),
	minify = require('gulp-minify-css'),
	inject = require('gulp-inject'),
	templateCache = require('gulp-angular-templatecache');
	
gulp.task('default',function(){
	gulp.start('build');
})
	
gulp.task('build',['jshint','index','inject'])

gulp.task('inject',['appClass','appScript','templatecache','assets'],function(){
return gulp.src('dist/index.html')
  .pipe(inject(gulp.src(['dist/**/*.css','dist/**/*.js'], {read: false}), {relative: true}))
  .pipe(gulp.dest('dist'));
})

gulp.task('templatecache',function(){
	return gulp.src('src/app/**/*.html')
	.pipe(templateCache({ module: 'templateModule', standalone: true }))
	.pipe(gulp.dest('dist'));
})
	
gulp.task('appScript',function(){
	return gulp.src('src/app/**/*.js')
	.pipe(concat('all.js'))
	//.pipe(uglify({mangle:false}))
	.pipe(gulp.dest('dist/script'))
})

gulp.task('appClass',function(){
	return gulp.src('src/app/**/*.css')
	.pipe(concat('all.css'))
	.pipe(minify())
	.pipe(gulp.dest('dist/style'))
})
	
gulp.task('index',function(){
	return gulp.src('src/index.html')
	.pipe(gulp.dest('dist'))
})

gulp.task('assets',function(){
	return gulp.src('src/app/images/*.jpg')
	.pipe(gulp.dest('dist/app/images'))
})

gulp.task('jshint',function(){
	return gulp.src('src/app/**/*.js')
	.pipe(jshint())
	.pipe(jshint.reporter('default'))
})