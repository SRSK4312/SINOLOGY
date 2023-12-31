import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: 'Items'})
export class Item {
	@PrimaryGeneratedColumn({name: "Id"})
	ItemId: string;

  @Column({name: "OrderId"})
  OrderID: number;

	@Column({name: "OrderNo"})
	OrderNo: string;
	
  @Column({name : "TaskOrderNo"})
  TaskNo: number;

	@Column({name: "PosNo"})
	Position: string

	@Column({name: "Name"})
	Name: string

	@Column ({name: 'DimTxt'})
	Size: string

	@Column ({name: 'FrameId'})
	FrameId: string

	@Column ({name: "WorkDate"})
	WorkDate: Date

	@Column ({name: "ShipDate"})
	ShipDate: Date
}