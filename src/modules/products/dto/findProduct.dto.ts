import { Exclude } from 'class-transformer';

export class findProduct {
  id: number;

  name: string;

  qty: number;

  @Exclude()
  price: number;

  constructor(partial: Partial<findProduct>) {
    Object.assign(this, partial);
  }
}
