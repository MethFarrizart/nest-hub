import { Controller, Get, Post, Req, HttpCode } from '@nestjs/common';
import { request } from 'express';

@Controller('products')
export class ProductsController {
  @Get('/get')
  get() {
    return 'fff';
  }

  @Post('/store')
  @HttpCode(204)
  // if not write @HttpCode(204) the status default is 200
  store(@Req() request: Request): number {
    return 123;
  }

  @Get('/findAll')
  async findAll(): Promise<any[]> {
    return [];
  }
}
