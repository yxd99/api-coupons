import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Coupon } from './entities/coupon.entity';
import { Repository } from 'typeorm';
import { CustomResponse } from '@shared/interfaces';

@Injectable()
export class CouponsService {
  constructor(
    @InjectRepository(Coupon)
    private readonly couponRepository: Repository<Coupon>,
  ){}
  create(createCouponDto: CreateCouponDto) {
    return this.couponRepository.save(createCouponDto);
  }

  findAll() {
    return this.couponRepository.find();
  }

  async findOne(id: number): Promise<CustomResponse<Coupon>> {
    const coupon = await this.couponRepository.findOneBy({ id });
    if (!coupon) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Coupon not found'
      }
    }
    return {
      statusCode: HttpStatus.OK,
      data: coupon,
    }
  }

  async update(id: number, updateCouponDto: UpdateCouponDto): Promise<CustomResponse<Coupon>> {
    const coupon =  await this.findOne(id);
    if (coupon.statusCode !== HttpStatus.OK) {
      return coupon;
    }
    await this.couponRepository.update(id, updateCouponDto);
    return {
      statusCode: HttpStatus.OK,
      message: `coupon ${id} has been modified`
    }
  }

  async remove(id: number): Promise<CustomResponse<Coupon>>{
    const coupon = await this.findOne(id);
    if (!coupon.data) {
      return coupon;
    }
    const now = new Date(coupon.data.expirationDate);
    if (now.getTime() < (new Date().getTime())) {
      return {
        statusCode: HttpStatus.GONE,
        message: 'Coupon expired',
      }
    } 
    await this.couponRepository.softDelete(id);

    return {
      statusCode: HttpStatus.OK,
      message: `Coupon ${id} has been used successfully`
    }
  }
}
