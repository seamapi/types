import { defineConfig } from 'tsup'

export default defineConfig({
  tsconfig: 'tsconfig.build.json',
  entry: ['src/index.ts', 'src/connect.ts', 'src/devicedb.ts'],
  format: ['cjs'],
  treeshake: true,
  dts: true,
  sourcemap: true,
  clean: true,
})
