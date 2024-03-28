import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('coupons')
export class Coupon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'text',
    nullable: false,
  })
  description: string;

  @Column({
    type: 'date',
    nullable: false,
  })
  expirationDate: Date;

  @DeleteDateColumn({
    select: false,
  })
  dateUsed: string;
}
