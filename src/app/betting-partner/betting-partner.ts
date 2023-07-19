export class BettingPartner{
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
		var bettingpartner = new BettingPartner();
		bettingpartner.id = data['id'];
		bettingpartner.name = data['name'];
		bettingpartner.status = data['status'];
		bettingpartner.website = data['website'];

		return bettingpartner;
	}

	static fromJSONArray(dataArray: Array<any>){
		var bettingpartners = [];

		dataArray.forEach(ele=>{
			bettingpartners.push(this.fromJSON(ele))
		});

		return bettingpartners;
	}
}