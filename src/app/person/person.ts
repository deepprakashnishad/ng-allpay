import {Role} from './../admin/role/role';
import {Permission} from '../admin/permission/permission';

export class Person{
	id: string;
	n: string;
	m: string;
	e: string;
	r: Role;
	permissions: Permission[];
	s: string;
	pass: string;
	pic:any
	

	constructor(){
		this.e = "";
		this.m = "";
		this.n = "";
		this.permissions = [];
		this.s = "";
		this.r = new Role();
		this.pass = "";
  }

  static fromJSON(data) {
    var person = new Person();
    person.id = data['id'];
    person.n = data['n'];
    person.m = data['m'];
    person.e = data['e'];
    person.r = data['r'];
    person.permissions = data['permissions'];
    person.s = data['s'];
    return person;
  }

  static fromJSONArray(arrJson: Array<any>) {
    var persons: Array<Person> = [];
    for (var data of arrJson) {
      persons.push(this.fromJSON(data));
    }

    return persons;
  }
}
