import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { Item } from '../entity/item.entity';
import { OrderValid } from '../validation/order.valid';
import { ScanData } from '../entity/scanData.entity';
import { itemInfo, resultOrdersDto} from '../dto/sinobot.dto';


@Injectable()
export class OrderService {
	constructor (


		@InjectRepository(Item)
		private readonly itemRepos: Repository<Item>,

		@InjectRepository(ScanData)
		private readonly scanDataRepos: Repository<ScanData>,

		private readonly orderValid: OrderValid,
	){}

	private orderInfo = [] as itemInfo[]
	private statusobj = {
		"9001101" : "БРАК: БОЙ СПУ", "9001102" : "БРАК: Бой при остеклении", "9001103" : "БРАК: Незначительный брак",
		"9001201" : "БРАК: Створка: фурнитура смещ/отсутс/недокр","9001202" : "БРАК: Створка: мех. повреждения","9001203" : "БРАК: Створка: сварной шов","9001204" : "БРАК: Створка: незначительный брак","9001205" : "БРАК: Створка: штапик","9001206" : "БРАК: Створка: другое",
		"9001250" : "БРАК: Рама: фурнитура смещ/отсутс/недокр","9001251" : "БРАК: Рама: мех повреждения","9001252" : "БРАК: Рама: сварной шов","9001253" : "БРАК: Рама: другое",
		"9001260" : "БРАК: Бой на складе","9001265" : "БРАК: Бой при транспортировке","9001300" : "БРАК: Стеклопакет: царапина",
		"9001301" : "БРАК: Грязь 1 линия (галочка)","9001302" : "БРАК: Грязь 2 линия ","9001303" : "БРАК: грязь 3 линия (точка)","9001304" : "БРАК: Брак стекла","9001305" : "БРАК: Дист рамка, смещ стекло","9001306" : "БРАК: Стеклопакет: пленка ","9001307" : "БРАК: Декор раскладка","9001308" : "БРАК: Стеклопакет: другое",
		"9001999" : "ПРИНЯТО ОТК",
		"9002000" : "Ремонт"
	}


	private async findOrderByOrderNo (){
		
	}


	private async findStatusByItemId (item : itemInfo){
		let fetchData = [] as ScanData[]
		try {
			fetchData =  await this.scanDataRepos.find({ where: { ItemId: item.ItemId }});
		} catch (error) {
			console.error("Error while fetching data:", error);
		} finally {
			let tmpDate = new Date (0)
			// логика фильтрациии статусов
			fetchData.forEach(status => {
				if (status.User.indexOf('otk') >= 0 && tmpDate.getTime() <= status.ScanDate.getTime()){
					tmpDate = status.ScanDate
					item.ScanDate = status.ScanDate
					item.ScanStatus = status.Status
				}
			})
			return item
		}
	}

	private async findByOrderNo(orderNo: string){
		let fetchData = [] as Item[]
		try {
			if (this.orderValid.validTaskNo(orderNo)){
				fetchData =  await this.itemRepos.find({ where: { TaskNo: +orderNo } });
			} else if (this.orderValid.validOrderNo){
				fetchData = await this.itemRepos.find({ where: { OrderNo: orderNo } });
			}
		} catch (error) {
			console.error("Error while fetching data:", error);
		} finally {
			// Логика фильтрации главенствующих позиций
			this.orderInfo = fetchData.filter(item => {
				return item.ItemId == item.FrameId
			})
			for (let i = 0; i < this.orderInfo.length; i++){
				await this.findStatusByItemId(this.orderInfo[i]).then(data => {
					this.orderInfo[i] = data
				})
			}
		}
	}

	
	async getOrderInfo(orderNo: string){
		await this.findByOrderNo(orderNo)
		const nowDate = new Date().getTime()
		let resultTxt = ''
		if (this.orderInfo.length <= 0) {
			return  {text : 'Заказ не найден :thinking:'} 
		} 
		
		console.log(this.orderInfo);

		const map = this.orderInfo.reduce((acc, item)=>{
			// Заказы в архиве --------------------------------------------
			if (nowDate - item.ShipDate.getTime() >= 7884000000) {
				const id = `*Заказ ${item.OrderNo} / ${item.TaskNo} в архиве*`
				acc[id] = acc[id] || {
					title : id,
				}
				return acc
			}
			// ____________________________________________________________

			// Заказы не принятые в работу --------------------------------
			if (item.WorkDate.getTime() - 50400000 >= nowDate) {
				const id = `*Заказ ${item.OrderNo} / ${item.TaskNo} не принят в работу*`
				acc[id] = acc[id] || {
					title : id,
				}
				return acc
			}
			// ____________________________________________________________

			// Перегруппировка заказов по номерам заказов и статусу -------
			const id = `*Заказ ${item.OrderNo} / ${item.TaskNo}:*`
			acc[id] = acc[id] || {
				title : id,
				items: []
			}

			acc[id].items.push({
				name: item.Name,
				size: item.Size,
				pos: item.Position,
				scanDate: item.ScanDate ? item.ScanDate : null,
				scanStatus: item.ScanStatus ? item.ScanStatus: null
			});
			return acc;
		},{})
			
		var resultOrders = [] as resultOrdersDto[]
		resultOrders = Object.values(map)
		console.log(resultOrders);
		// ______________________________________________________________

		if (resultOrders.length <= 0) return {text: ':warning: Непредвиденная ошибка, обратитесь с системному администратору'}

		resultTxt += `Нашел :grin:\n`
		resultOrders.forEach(order => {
			resultTxt += `- ${order.title}\n`
			if (order.items){
				order.items.forEach(item => {
					resultTxt += `    `
					if (item.pos) resultTxt += `${item.pos} `
					if (item.name) resultTxt += `${item.name} `
					if (item.size) resultTxt += `\n        Размер: ${item.size}`

					resultTxt += `\n    `

					if (item.scanDate && item.scanDate != null) {
						const formatDate = `${item.scanDate.getDate()}.${item.scanDate.getMonth()+1}.${item.scanDate.getFullYear()} г.`
						resultTxt += `    Статус: ${formatDate} `

						if (item.scanStatus){
							resultTxt += this.statusobj[item.scanStatus] ? this.statusobj[item.scanStatus] : 'Неизвестный статус (ОТК), уточните у отдела ОТК'
						}
						resultTxt += '\n'
					} else resultTxt += `    Статус: На этапе производства \n`
				})
			}
			resultTxt += '\n'
		})

		return {text: resultTxt}
	}
}


