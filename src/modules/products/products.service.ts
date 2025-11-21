import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/products.entity';
import { Repository } from 'typeorm';
import { UpdateProductDto } from './dto/update-product.dto';
import { DataSource } from 'typeorm';
import { findProduct } from './dto/findProduct.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepo: Repository<Product>,
    private dataSource: DataSource,
  ) {}

  async create(dto: CreateProductDto): Promise<Product> {
    const product = this.productRepo.create(dto);
    return await this.productRepo.save(product);
  }
  async findAll(): Promise<Product> {
    // return await this.productRepo.find();
    return await this.dataSource.query<Product>('SELECT * FROM products');
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepo.findOne({ where: { id } });
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async findProduct(body: findProduct): Promise<{ product: findProduct }> {
    const product = await this.productRepo.findOneBy({ id: body.id });
    if (!product) throw new NotFoundException('Product not found');
    return {
      product: new findProduct(product),
    };
  }

  async update(id: number, dto: UpdateProductDto): Promise<Product> {
    await this.productRepo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const product = await this.findOne(id);
    await this.productRepo.remove(product);
  }
}
