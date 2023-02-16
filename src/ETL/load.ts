import { sequelize } from '../database/database'
// NEED TO CREATE ETL PROCESS TO USE THE BELOW
// import { productLoader } from '../loaders/productLoader'
// import { relatedLoader } from '../loaders/relatedLoader'
// import { featuresLoader } from '../loaders/featuresLoader'
// import { stylesLoader } from '../loaders/stylesLoader'
// import { skusLoader } from '../loaders/skusLoader'
// import { photosLoader } from '../loaders/photosLoader'


 sequelize.sync({alter: true})
  .then(async () => {
    // await productLoader('product.csv')
    // await relatedLoader('related.csv')
    // await featuresLoader( 'features.csv')
    // await stylesLoader('styles.csv')
    // await skusLoader('skus.csv')
    // await photosLoader('photos.csv')
    sequelize.query('create index features_products_id on features(products_id);')
    sequelize.query('create index styles_products_id on styles(products_id);')
    sequelize.query('create index photos_styles_id on photos(styles_id);')
    sequelize.query('create index skus_styles_id on skus(styles_id);')
    sequelize.query('create index current_product_id on related_items(current_product_id);')
  })
  .then(() => {
    console.log('Success! All data loaded')
  })
  .catch((err)=> {
    console.log(err)
  })