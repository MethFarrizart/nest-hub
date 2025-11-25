import { Brand } from './brand/entities/brand.entity';
import { Category } from './category/entities/category.entity';
import { Cat } from './cats/entities/cat.entity';
import { Permission } from './permission/entities/permission.entity';
import { Product } from './products/entities/products.entity';
import { Role } from './role/entities/role.entity';
import { User } from './user/entities/user.entity';

export const entityList = [
  User,
  Role,
  Permission,
  Product,
  Category,
  Brand,
  Cat,
];
