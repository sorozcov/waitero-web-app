import {schema} from 'normalizr'

const menuSchema = new schema.Entity(
    'menu'
)

export const menuListSchema = [menuSchema]