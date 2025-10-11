import { Controller, Get, Post, Body, Req, HttpCode } from '@nestjs/common';
import { request } from 'express';
import { ProductService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductService) {}
  @Get('/get')
  get() {
    return 'fff';
  }

  @Post('/store')
  @HttpCode(204)
  // if not write @HttpCode(204) the status default is 200
  store(@Body() dto: CreateProductDto) {
    return this.productService.create(dto);
  }

  // @Get('/findAll')
  // async findAll(): Promise<any[]> {
  //   return [];
  // }
}
