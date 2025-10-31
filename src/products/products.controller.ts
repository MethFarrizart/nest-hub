import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthGuard } from 'src/common/guard/auth.guard';

@Controller('products')
@UseGuards(new AuthGuard())
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

  @Post('get_expire_product')
  expireProduct() {
    return this.productService.expireProduct();
  }
}
