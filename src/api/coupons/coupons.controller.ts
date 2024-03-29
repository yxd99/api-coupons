import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, NotFoundException, HttpStatus, HttpException } from '@nestjs/common';
import { CouponsService } from './coupons.service';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { Public } from '@common/guards/public.guard';
import { type CustomResponse } from '@shared/interfaces';

@Controller('coupons')
export class CouponsController {
  constructor(private readonly couponsService: CouponsService) {}

  @Post()
  create(@Body() createCouponDto: CreateCouponDto) {
    return this.couponsService.create(createCouponDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.couponsService.findAll();
  }

  @Public()
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const coupon = await this.couponsService.findOne(id);
    if (coupon.statusCode !== HttpStatus.OK) {
      throw new HttpException(coupon, coupon.statusCode);
    }
    return coupon;
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateCouponDto: UpdateCouponDto) {
    const response = await this.couponsService.update(id, updateCouponDto);
    if (response.statusCode !== HttpStatus.OK) {
      throw new HttpException(response, response.statusCode);
    }
    return response;
  }

  @Public()
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const response = await this.couponsService.remove(id);

    if (response.statusCode !== HttpStatus.OK) {
      throw new HttpException(response, response.statusCode);
    }
    return response;
  }
}
