/* -------------------------------------------------------------------------- */
/*                               Schema Offers                                */
/* -------------------------------------------------------------------------- */

import { schema } from 'normalizr';


export const offer = new schema.Entity(
  'offers',
);
export const offers = new schema.Array(offer);