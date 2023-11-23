export class OrderValid {

		// Цеховой номер
	validTaskNo(taskNo : string) : boolean{ return (/^\d+$/.test(taskNo) )}
		
		// Офисный номер
	validOrderNo (orderNo: string ) : boolean { return ( orderNo.indexOf('-') >= 0 && orderNo.indexOf(' ') < 0) }

}