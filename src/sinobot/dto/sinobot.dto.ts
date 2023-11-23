export class commandSinoBot {
	token?: string;
	user_id?: string;
	username?: string;
	text: string;
	status?: null | number
}

export class itemInfo {
	ItemId: string;
	OrderID: number;
	OrderNo: string;
	FrameId: string;
	TaskNo: number;
	Position: string;
	Name: string;
	Size: string;
	ScanStatus?: string;
	ScanDate? : Date;
	WorkDate?: Date;
	ShipDate?: Date;
}

export class resultOrdersDto {
	title : string;
	items? : resultItemDto[]
}

export class resultItemDto {
	name: string;
	size: string;
	pos: string;
	scanDate: Date | null;
	scanStatus: string | null
}