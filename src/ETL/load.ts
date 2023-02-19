import { sequelize } from "../database/database";
import { parseData } from './loadHelper'
import { Products, Styles, Features, Photos, Skus, RelatedItems } from '../database/models'
/*
Orchestrates the load of all data into our db, and adds indexing to the db for faster, targeted queries.
*/
sequelize.sync()
  .then(async () => {
    // await parseData('products', Products)
    // await parseData('styles', Styles)
    await parseData('skus', Skus)
    // await parseData('photos', Photos)
    // await parseData('features', Features)
    // await parseData('related', RelatedItems)
  })
  .then(() => {
    console.log('All data loaded!')
    sequelize.close();
  })
  .catch((err: any) => {
    console.log('error in load :', err);
  })
  /*

parseData('products', Products)
    parseData('related', RelatedItems)
    parseData('features', Features)
    parseData('styles', Styles)
    parseData('skus', Skus)
    parseData('photos', Photos)

  */

        // sequelize.query('create index features_products_id on features(products_id);')
    // sequelize.query('create index styles_products_id on styles(products_id);')
    // sequelize.query('create index photos_styles_id on photos(styles_id);')
    // sequelize.query('create index skus_styles_id on skus(styles_id);')
    // sequelize.query('create index current_product_id on related_items(current_product_id);')