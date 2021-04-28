import {schema} from 'normalizr'

const productSchema = new schema.Entity(
    'product'
)

export const productListSchema = [productSchema]