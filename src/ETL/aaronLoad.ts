import { sequelize } from '../database/database'
import { productLoader } from './aaronLoaders/productLoader'
import { relatedLoader } from './aaronLoaders/relatedLoader'
import { featuresLoader } from './aaronLoaders/featuresLoader'
import { stylesLoader } from './aaronLoaders/stylesLoader'
import { skusLoader } from './aaronLoaders/skusLoader'
import { photosLoader } from './aaronLoaders/photosLoader'


 sequelize.sync({alter: true})
  .then(async () => {
    await productLoader('products.csv')
    await relatedLoader('related.csv')
    await featuresLoader( 'features.csv')
    await stylesLoader('styles.csv')
    await skusLoader('skus.csv')
    await photosLoader('photos.csv')
    // sequelize.query('create index features_products_id on features(products_id);')
    // sequelize.query('create index styles_products_id on styles(products_id);')
    // sequelize.query('create index photos_styles_id on photos(styles_id);')
    // sequelize.query('create index skus_styles_id on skus(styles_id);')
    // sequelize.query('create index current_product_id on related_items(current_product_id);')
  })
  .then(() => {
    console.log('Success! All data loaded')
  })
  .catch((err)=> {
    console.log(err)
  })