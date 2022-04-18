import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import {
  CreateProductRequestDto,
  DecreaseStockRequestDto,
  FindOneRequestDto,
} from './product.dto';
import {
  CreateProductResponse,
  DecreaseStockResponse,
  FindOneResponse,
  PRODUCT_SERVICE_NAME,
} from './product.pb';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  @Inject(ProductService)
  private readonly productService: ProductService;

  @GrpcMethod(PRODUCT_SERVICE_NAME, 'createProduct')
  private createProduct(
    payload: CreateProductRequestDto,
  ): Promise<CreateProductResponse> {
    return this.productService.createProduct(payload);
  }

  @GrpcMethod(PRODUCT_SERVICE_NAME, 'findOne')
  private findOne(payload: FindOneRequestDto): Promise<FindOneResponse> {
    return this.productService.findOne(payload);
  }

  @GrpcMethod(PRODUCT_SERVICE_NAME, 'decreaseStock')
  private decreaseStock(
    payload: DecreaseStockRequestDto,
  ): Promise<DecreaseStockResponse> {
    return this.productService.decreaseStock(payload);
  }
}
