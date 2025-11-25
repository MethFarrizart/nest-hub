import { Exclude, Expose } from 'class-transformer';

export class findProduct {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  qty: number;

  @Exclude()
  price: number;

  constructor(partial: Partial<findProduct>) {
    Object.assign(this, partial);
  }
}
