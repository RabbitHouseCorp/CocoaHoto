const ColorUtils = require('../../utils/ColorUtils')
module.exports = class ColorResolver {
  /**
     * @param color {string} The color to be resolved
     * @returns {string | Error}
     */
  static resolve(color) {
    if (typeof (color) !== 'string') throw new Error(`Unexpected type ${typeof color} while building the embed`)
    color = color.toUpperCase()

    if (!color) color = null
    if (ColorUtils[color]) {
      return ColorUtils[color]
    }

    return parseInt(color.replace('#', ''), 16)
  }
}