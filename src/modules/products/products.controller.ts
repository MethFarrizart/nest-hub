import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { ProductService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthGuard } from 'src/common/guard/auth.guard';
import { findProduct } from './dto/findProduct.dto';
import { SkipThrottle } from '@nestjs/throttler';
import { Roles } from 'src/common/decorator/role.decorator';
import { RolesGuard } from 'src/common/guard/role.guard';

@SkipThrottle()
@Controller('products')
@UseGuards(AuthGuard, RolesGuard)
export class ProductsController {
  constructor(private readonly productService: ProductService) {}
  @Post('store')
  create(@Body() dto: CreateProductDto) {
    return this.productService.create(dto);
  }

  @Get('get')
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    return this.productService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }

  @Post('find_product')
  @Roles('admin')
  async findProduct(
    @Body() body: findProduct) {
    const data = await this.productService.findProduct(body);
    return {
      data: data.product,
      status: HttpStatus.OK,
    };
  }
}
