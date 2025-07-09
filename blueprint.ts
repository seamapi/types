import { writeFile } from 'node:fs/promises'
import { join } from 'node:path'

import { createBlueprint, TypesModuleSchema } from '@seamapi/blueprint'

import * as types from '@seamapi/types'

const typesModule = TypesModuleSchema.parse(types)

const blueprint = await createBlueprint(typesModule)

const content = JSON.stringify(blueprint, null, 2)

const output = join('tmp', 'connect-blueprint.json')

await writeFile(output, Buffer.from(content))

// eslint-disable-next-line no-console
console.log(`  Blueprint written to ${output}`)
