import {schema} from 'normalizr'

const restaurant = new schema.Entity(
    'restaurants'
)

export const restaurants = new schema.Array(restaurant);