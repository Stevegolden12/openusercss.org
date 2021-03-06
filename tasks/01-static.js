import gulp from 'gulp'
import pump from 'pump'
import merge from 'merge-stream'
import buffer from 'gulp-buffer'
import filter from 'gulp-filter'
import path from 'path'
import remember from 'gulp-remember'
import cached from 'gulp-cached'

// IMAGES
import imagemin from 'gulp-imagemin'
import jpegRecompress from 'imagemin-jpeg-recompress'
import jimp from 'gulp-jimp-resize'

// SASS
import sass from 'gulp-ruby-sass'

// POSTCSS
import postcss from 'gulp-postcss'

// OTHER
import concat from 'gulp-concat'
import flatten from 'gulp-flatten'
import {
  iconSizes,
  bgSizes,
  sizes,
  postCssPluginsProd,
} from './shared/css'

const sources = {
  'email': [
    'app/scss/email.scss',
  ],
  'emailTemplates': [
    'client/emails/**/*.pug',
    'client/email-views/**/*.pug',
  ],
  'icons': [
    'client/img/*.icon.*',
  ],
  'elements': [
    'client/img/**/*',
  ],
  'backgrounds': [
    'client/img/**/*.bg.*',
  ],
  'vectors': [
    'client/img/**/*.svg',
  ],
}

const filters = {
  'bitmap': [
    '**/*.{png,jpg,jpeg,gif}',
  ],
  'element': [
    '!**/*.{icon|bg}*',
  ],
}

const destination = (dest) => {
  if (!dest) {
    return path.resolve('./app/static/')
  }

  return path.resolve('./app/static/', dest)
}

gulp.task('static:prod', (done) => {
  const iconStream = pump([
    gulp.src(sources.icons),
    filter(filters.bitmap),
    jimp({
      'sizes': iconSizes,
    }),
  ])

  const elementStream = pump([
    gulp.src(sources.elements),
    filter(filters.bitmap),
    jimp({
      sizes,
    }),
  ])

  const backgroundsStream = pump([
    gulp.src(sources.backgrounds),
    filter(filters.bitmap),
    jimp({
      'sizes': bgSizes,
    }),
  ])

  return pump([
    merge(backgroundsStream, iconStream, elementStream, gulp.src(sources.vectors)),
    imagemin([
      imagemin.gifsicle({
        'interlaced':        true,
        'optimizationLevel': 3,
      }),
      jpegRecompress(),
      imagemin.optipng({
        'optimizationLevel': 5,
      }),
      imagemin.svgo({
        'plugins': [
          {
            'removeViewBox': true,
          },
        ],
      }),
    ]),
    flatten(),
    gulp.dest(destination('img')),
  ])
})

gulp.task('static:fast', (done) => {
  const iconStream = pump([
    gulp.src(sources.icons),
    filter(filters.bitmap),
    cached('icons'),
    jimp({
      'sizes': iconSizes,
    }),
  ])

  const elementStream = pump([
    gulp.src(sources.elements),
    filter(filters.bitmap),
    cached('elements'),
    filter([
      '**/*.{png,jpg,jpeg,gif}',
      '!**/*.bg*',
    ]),
    jimp({
      sizes,
    }),
  ])

  const backgroundsStream = pump([
    gulp.src(sources.backgrounds),
    filter(filters.bitmap),
    cached('backgrounds'),
    jimp({
      'sizes': bgSizes,
    }),
  ])

  const vectorStream = pump([
    gulp.src(sources.vectors),
    cached('vectors'),
  ])

  return pump([
    merge(backgroundsStream, iconStream, elementStream, vectorStream),
    flatten(),
    merge(
      remember('icons'),
      remember('elements'),
      remember('backgrounds'),
      remember('vectors'),
    ),
    gulp.dest(destination('img')),
  ])
})

gulp.task('static:email', () => {
  return pump([
    sass(sources.email),
    buffer(),
    concat('email.min.css'),
    postcss(postCssPluginsProd),
    flatten(),
    gulp.dest(destination('css')),
  ])
})

gulp.task('static:email-templates', () => {
  return pump([
    gulp.src(sources.emailTemplates),
    gulp.dest(path.resolve('./build/emails')),
  ])
})

gulp.task('static:watch', () => {
  gulp.watch('client/client/img/**/*', gulp.series('static:fast'))
  gulp.watch([
    'app/scss/email.scss',
  ], gulp.series('static:email'))
  gulp.watch([
    'client/email-views/**/*',
    'client/emails/**/*',
  ], gulp.series('static:email-templates'))
})
