export class Merchant{
	id: string;
	name: string;
	website: string;
	status: string;

	constructor(){
		this.name="";
		this.status = "ACTIVE";
		this.website = "";
	}

	static fromJSON(data: any){
		var merchant = new Merchant();
		merchant.id = data['id'];
		merchant.name = data['name'];
		merchant.status = data['status'];
		merchant.website = data['website'];

		return merchant;
	}

	static fromJSONArray(dataArray: Array<any>){
		var merchants = [];

		dataArray.forEach(ele=>{
			merchants.push(this.fromJSON(ele))
		});

		return merchants;
	}
}