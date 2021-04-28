import {schema} from 'normalizr'

const branch = new schema.Entity(
    'branches'
)

export const branches = new schema.Array(branch);