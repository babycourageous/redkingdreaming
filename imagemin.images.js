//https://github.com/imagemin/imagemin/issues/191#issuecomment-434868105

const imagemin = require('imagemin')
const imageminMozjpeg = require('imagemin-mozjpeg')
const imageminPngquant = require('imagemin-pngquant')
const imageminSvgo = require('imagemin-svgo')
const imageminGifsicle = require('imagemin-gifsicle')
const { lstatSync, readdirSync } = require('fs')
const { join } = require('path')

/**
 * @description
 * Script for compressing all our static images.
 * Currently, reads images from static/{images_sub_folder}
 * and outputs them into static/compressed/{images_sub_folder}
 *
 * ie. static/images  => static/compressed/static/images
 * ie. static/img     => static/compressed/static/img
 */

/**
 * Output directory
 * Where all the compressed images will go
 */
const OUTPUT_DIR = '_site/assets'

/**
 * List of input directories
 */
const INPUT_DIRS = ['_assets/images']

/**
 * Imagemin Options
 *
 * @see https://github.com/imagemin/imagemin
 */
const options = {
  /**
   * JPEG compression plugin options
   *
   * @see https://github.com/imagemin/imagemin-mozjpeg
   */
  mozjpegOptions: {
    progressive: true,
    quality: 90,
  },
  /**
   * PNG compression plugin options
   *
   * @see https://github.com/imagemin/imagemin-pngquant
   */

  /**
   * SVG compression plugin
   *
   * @see https://github.com/imagemin/imagemin-svgo
   */
  svgoOptions: {
    removeViewBox: true,
  },
  /**
   * GIF compression plugin options
   *
   * @see https://github.com/imagemin/imagemin-gifsicle
   */
  gifOptions: {
    optimizationLevel: 3,
  },
}

/**
 * Helper functions to get directories / sub-directories
 *
 * @see https://stackoverflow.com/a/40896897/4364074
 */
const isDirectory = source => lstatSync(source).isDirectory()
const getDirectories = source =>
  readdirSync(source)
    .map(name => join(source, name))
    .filter(isDirectory)
const getDirectoriesRecursive = source => [
  source,
  ...getDirectories(source)
    .map(getDirectoriesRecursive)
    .reduce((a, b) => a.concat(b), []),
]

try {
  console.log('Beginning image compression...')
  ;(async () => {
    let imageDirs = []

    INPUT_DIRS.map(
      dirname =>
        (imageDirs = imageDirs.concat(getDirectoriesRecursive(dirname)))
    )

    /**
     * Loop through all subfolders, and recursively run imagemin,
     * outputting to the same subfolders inside OUTPUT_DIR folder
     */
    for (let i in imageDirs) {
      // store reference to directory string (imageDirs[i])
      const dir = imageDirs[i]
      // without leading "_assets/"
      const dir2 = dir.slice(String('_assets/').length)

      await imagemin([`${dir}/*.{jpg,png,svg,gif}`], join(OUTPUT_DIR, dir2), {
        plugins: [
          imageminMozjpeg(options['mozjpegOptions']),
          imageminPngquant(),
        ],
      })
      console.log(`...${(((+i + 1) / imageDirs.length) * 100).toFixed(0)}%`)
    }

    console.log('Finished compressing all images!')
  })()
} catch (e) {
  console.log(e)
}
