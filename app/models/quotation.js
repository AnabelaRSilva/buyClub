// Example model
import { Product } from "./product.js";
import { User } from "./user.js";

import typeorm from 'typeorm';
import { ProductResponse } from "./quotation-response.js";
const {BaseEntity, EntitySchema} = typeorm;

export class Quotation extends BaseEntity { 
  // primary key
  id;
  // quotation name
  name;
  // quotation date
  date;
  // state 'new' | 'published' | 'closed'
  state
}


export class QuotationProduct extends BaseEntity{ 
    id;
    product;
    productId;  
    quotation;
    quotationId;
    buyer;
    buyerId;
    quantity;
  }

  
export const quotationScheme = new EntitySchema({
  name: "Quotation",
  target: Quotation,
  columns: {
      id: {
        primary: true,
        type: "int",
        generated: true
      },
      name: { type: "varchar" },
      date: { type: "date" },
      state:{
        type: "enum",
        enum: ["new", "published", "closed"],
        default: "new"
      }
  },
  relations: {
    products: {
      target: () => QuotationProduct,
      type: 'one-to-many',
      cascade: true,
      inverseSide: 'quotation'
    },
  }
})




export const quotationProductScheme = new EntitySchema({
    name: "QuotationProduct",
    target: QuotationProduct,
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        quantity:{
            type: "int",
        },
        buyerId: { type: "int" },
        productId: { type: "int" },
        quotationId: { type: "int" }
    },
    relations:{
        quotation: {
            target: () => Quotation,
            type: "many-to-one",
            inverseSide: 'products'
        },
        buyer: {
            target: () => User,
            type: "many-to-one",
        },
        product: {
            target: () => Product,
            type: "many-to-one",
        }
    }
  })