export class Gateway{
	id: string;
	name: string;
	status: string;

	constructor(){
		this.name="";
		this.status = "ACTIVE";
	}

	static fromJSON(data: any){
		var gateway = new Gateway();
		gateway.id = data['id'];
		gateway.name = data['name'];
		gateway.status = data['status'];
		return gateway;
	}

	static fromJSONArray(dataArray: Array<any>){
		var gateways = [];

		dataArray.forEach(ele=>{
			gateways.push(this.fromJSON(ele))
		});

		return gateways;
	}
}