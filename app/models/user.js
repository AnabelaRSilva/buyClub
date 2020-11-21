// Example model
import {BaseEntity, EntitySchema} from "typeorm";

export class User extends BaseEntity{ 
  id;
  email;
  firstName;
  lastName;
  password;
}

export const userScheme = new EntitySchema({
  name: "User",
  target: User,
  columns: {
      id: {
          primary: true,
          type: "int",
          generated: true
      },
      email: {
          type: "varchar"
      },
      firstName: {
          type: "varchar"
      },
      lastName: {
        type: "varchar"
      },
      password: {
        type: "varchar"
      }
  },
})
