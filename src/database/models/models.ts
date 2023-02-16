import { Model, CreationOptional, InferAttributes, InferCreationAttributes, DataTypes } from 'sequelize'
import { sequelize } from '../database'

interface ProductModel extends Model<InferAttributes<ProductModel>, InferCreationAttributes<ProductModel>> {
  id: CreationOptional<number>;
  name: string;
  slogan: string;
  description: string;
  category: string;
  default_price: string;
}
/*
interface SkusModel extends Model<InferAttributes<SkusModel>, InferCreationAttributes<SkusModel>> {
  id: CreationOptional<number>;
  size: string;
  quantity: number;
  styles_id: number;
}

interface FeaturesModel extends Model<InferAttributes<FeaturesModel>, InferCreationAttributes<FeaturesModel>> {
  id: CreationOptional<number>;
  feature: string,
  value: string | null,
  products_id: number,
}

interface PhotosModel extends Model<InferAttributes<PhotosModel>, InferCreationAttributes<PhotosModel>> {
  id: CreationOptional<number>;
  url: string,
  thumbnail_url: string,
  styles_id: number
}

interface StylesModel extends Model<InferAttributes<StylesModel>, InferCreationAttributes<StylesModel>> {
  id: CreationOptional<number>;
  name: string;
  sale_price: string;
  original_price: string;
  default_style: boolean;
  products_id: number;
}


interface RelatedModel extends Model<InferAttributes<RelatedModel>, InferCreationAttributes<RelatedModel>> {
  id: CreationOptional<number>;
  current_product_id: number,
  related_product_id: number
}
*/
export const Products = sequelize.define<ProductModel>('Products', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING
  },
  slogan: {
    type: DataTypes.TEXT
  },
  description: {
    type: DataTypes.TEXT
  },
  category: {
    type: DataTypes.STRING
  },
  default_price: {
    type: DataTypes.STRING
  },
},
{timestamps: false}
)

/*
export const Styles = sequelize.define<StylesModel>('styles', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING
  },
  sale_price: {
    type: DataTypes.STRING
  },
  original_price: {
    type: DataTypes.STRING
  },
  default_style: {
    type: DataTypes.BOOLEAN
  },
  products_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    references: {
      model: Products,
      key: 'products_id'
    }
  }
},
{timestamps: false}
)
Products.hasMany(Styles, {foreignKey: 'products_id'})
Styles.belongsTo(Products, {foreignKey: 'products_id'})

export const Features = sequelize.define<FeaturesModel>('features', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
  },
  feature: {
    type: DataTypes.STRING
  },
  value: {
    type: DataTypes.STRING
  },
  products_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    references: {
      model: Products,
      key: 'id'
    }
  }
},
{timestamps: false}
)

Products.hasMany(Features, {foreignKey: 'products_id'})
Features.belongsTo(Products, {foreignKey: 'products_id'})

export const Photos = sequelize.define<PhotosModel>('photos', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true
  },
  url: {
    type: DataTypes.STRING
  },
  thumbnail_url: {
    type: DataTypes.STRING
  },
  styles_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    references: {
      model: Styles,
      key: 'id'
    }
  }
},
{timestamps: false}
)

Styles.hasMany(Photos, {foreignKey: 'styles_id'})
Photos.belongsTo(Styles, {foreignKey: 'styles_id'})

export const Skus = sequelize.define<SkusModel>('skus', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true
  },
  size: {
    type: DataTypes.STRING
  },
  quantity: {
    type: DataTypes.INTEGER
  },
  styles_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    references: {
      model: Styles,
      key: 'id'
    }
  }
},
{timestamps: false}
)

Styles.hasMany(Skus, {foreignKey: 'styles_id'} )
Skus.belongsTo(Styles, {foreignKey: 'styles_id'})


export const RelatedItems = sequelize.define<RelatedModel>('related_items', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
  },
  current_product_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    references: {
      model: Products,
      key: 'id'
    }
  },
  related_product_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    references: {
      model: Products,
      key: 'id'
    }
  }
},
{timestamps: false}
)

Products.hasMany(RelatedItems, {foreignKey: 'current_product_id'})
Products.hasMany(RelatedItems, {foreignKey: 'related_product_id'})
RelatedItems.belongsTo(Products, {foreignKey: 'current_product_id'})
RelatedItems.belongsTo(Products, {foreignKey: 'related_product_id'})
*/


sequelize.sync();