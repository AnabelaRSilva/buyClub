// Order model
import typeorm from 'typeorm';
import { Product } from "./product.js";
import { User } from "./user.js";

const {BaseEntity, EntitySchema} = typeorm;

export class Order extends BaseEntity { 
  id;
  date;
  buyerId;
  supplierId;
  products;
}

export class OrderProduct extends BaseEntity{
    id;
    productId;
    quantity;
    price;
    order;
}

export const orderScheme = new EntitySchema({
  name: "Order",
  target: Order,
  columns: {
      id: {
          primary: true,
          type: "int",
          generated: true
      },
      date: {
          type: "date"
      },
      buyerId: {
        type: "int"
      },
      supplierId: {
        type: "int"
      }
  },
  relations: {
    products: {
      target: () => OrderProduct,
      type: 'one-to-many',
      cascade: true,
      inverseSide: 'order'
    },
    supplier: {
        target: () => User,
        type: "many-to-one",
    },
    buyer: {
        target: () => User,
        type: "many-to-one",
    },
  }
})

export const orderProductScheme = new EntitySchema({
    name: "OrderProduct",
    target: OrderProduct,
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        quantity:{
            type: "int",
        },
        price:{
            type: "int",
        },
        orderId: {
            type: "int"
        },
        productId: {
            type: "int"
        }
    },
    relations:{
        order: {
            target: () => Order,
            type: "many-to-one",
            inverseSide: 'products'
        },
        product: {
            target: () => Product,
            type: "many-to-one",
        }
    }
  })