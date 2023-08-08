import { Component, OnInit, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Person } from './../person';
import { Role } from './../../admin/role/role';
import { PersonService } from './../person.service';
import { RoleService } from './../../admin/role/role.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-person-add-edit.component',
  templateUrl: './person-add-edit.component.html',
  styleUrls: ['./person-add-edit.component.scss']
})
export class PersonAddEditComponent implements OnInit {

  personForm: FormGroup;
  person: Person;
  title: string;
  errors: Array<string>=[];
  roles: Array<Role>

  constructor(
  	private PersonService: PersonService,
  	private fb: FormBuilder,
    private personService: PersonService,
    private roleService: RoleService,
    public snackBar: MatSnackBar,
    private notifier: NotifierService,
	  public dialogRef: MatDialogRef<PersonAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
  	this.personForm = this.fb.group({
  		name: ['', Validators.required],
  		mobile: ['', [Validators.required]],
      email: [''],
      password: ['']
  	});

  	if(this.data && this.data.person){
  		this.person = this.data.person;
      this.title = "Edit " + this.data.person.n;
  	}else{
  		this.person = new Person();
      this.title = "Add New Person";
  	}

    this.roleService.getRoles().subscribe(
      roles => {
        this.roles = roles;
      }
    );
  }

  save(person){
    if(person.m.indexOf("@")<0 && person.m.length===10){
      person.m = "+91"+person.m;
    }
  	if(person.id === undefined || person.id === null){
  		this.personService.add(person)
  		.subscribe((person)=>{
        this.person = person;
        this.notifier.notify("success", person.n + " created successfully.");
        this.dialogRef.close(person); 
      }, (error) => {
        this.notifier.notify("error", error.error.msg);
  		});
  	}else{
  		this.personService.update(person)
  		.subscribe((person)=>{
        this.notifier.notify("success", "Person details updated successfully");
        this.dialogRef.close(person);  
  		}, error=>{
        this.notifier.notify("error", error.error.msg);
  		});
  	}
  }

  updatePersonPermission(person){
    this.personService.updatePermissions(person)
    .subscribe((person)=>{
      this.dialogRef.close(person);  
    }, (error) => {
      this.notifier.notify("error", "Person detail updated but failed to update permission");
    });    
  }

  selectRole(role: Role){
    this.person.r = role;
    this.person.permissions = role.permissions;
  }

  onPermissionUpdate($event){
    this.person.permissions = $event;
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000
    });
  }

  generatePassword(){
    this.person.pass = Math.random().toString(36).slice(-10);
  }

  copied(){
    this.notifier.notify("success", "Password copied to clipboard");
  }
}
