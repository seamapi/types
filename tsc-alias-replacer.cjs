// UPSTREAM: tsc-alias does not replace paths which start with @.

const path = require('path')

const pkg = require('./package.json')
const tsconfig = require('./tsconfig.json')

const {
  compilerOptions: { paths = {} },
} = tsconfig

module.exports.default = ({ orig, file }) => {
  if (orig.startsWith(`from '${pkg.name}`)) {
    const key = orig.split("from '")[1].slice(0, -1)
    const tsPath = paths[key]?.[0]
    if (tsPath == null) return orig
    const target = path
      .relative(file, tsPath)
      .replace('./src', '')
      .replace('.././', '../')
      .replace('.ts', '.js')
    if (path != null) return `from '${target}'`
  }
  return orig
}
