// Example model
import typeorm from 'typeorm';
const {BaseEntity, EntitySchema} = typeorm;

export class Product extends BaseEntity{ 
  id;
  name;
  brand;
  model;
  size;
}
export const productScheme = new EntitySchema({
  name: "Product",
  target: Product,
  columns: {
      id: {
          primary: true,
          type: "int",
          generated: true
      },
      name: {
          type: "varchar"
      },
      brand: {
        type: "varchar"
      },
      model: {
        type: "varchar",
        nullable: true,
      },
      size: {
        type: "varchar",
        nullable: true,
      }
  },
})
