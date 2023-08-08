import { Component, ViewChild, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {PersonService} from './../person.service';
import { NotifierService } from 'angular-notifier';
import { PersonAddEditComponent } from './../person-add-edit/person-add-edit.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ResetPasswordComponent } from './../reset-password/reset-password.component';
import { MatPaginator } from '@angular/material/paginator';
import {
  MatBottomSheet,
  MatBottomSheetModule,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { Person} from './../person';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss']
})
export class PersonListComponent implements OnInit {

  persons: Array<Person> = [];
  displayedColumns: string[] = ['name', 'email', 'actions'];

  dataSource: MatTableDataSource<any>;

  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(
    private pService: PersonService,
    private _bottomSheet: MatBottomSheet,
    private dialog: MatDialog,
    private notifier: NotifierService 
  ){

  }

  ngOnInit() {
    this.fetchUsers();
  }

  sortData(sort: MatSort) { 
    var persons = this.persons.sort(function(a, b) {
      var keyA = a[sort['active']],
      keyB = b[sort['active']];
      if(sort['active']==="bp" || sort['active']==="m"){
        keyA = keyA['name'];
        keyB = keyB['name'];
      }
      if(sort['direction']==="asc"){
        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
      }else if(sort['direction']==="desc"){
        if (keyA < keyB) return 1;
        if (keyA > keyB) return -1;
      }
      return 0;
    });
    this.dataSource.data = persons; 
  }

  fetchUsers(){
    this.pService.get().subscribe(results=>{
      this.persons = results;

      this.dataSource = new MatTableDataSource<any>(this.persons)
      this.dataSource.sort = this.sort;
    });
  }

  onAddClick(){
    const dialogRef = this.dialog.open(PersonAddEditComponent);

    dialogRef.afterClosed().subscribe((result) => {
      this.persons.push(result);

      this.dataSource.data = this.persons;
    });
  }

  onEditClick(person, i){
    const dialogRef = this.dialog.open(PersonAddEditComponent, {
      data: {
        "person": person
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if(result){
        this.persons[i] = result;
        this.notifier.notify("success", result.n+" updated successfully");
        // this.openSnackBar(this.selectedPerson.name+" updated successfully", "Dismiss");
      }
      
    });
  }

  deletePerson(person, i){
    this.pService.delete(person.id).subscribe(result=>{
      if(result['success']){
        this.notifier.notify("success", `${person.n} deleted successfully`);
        this.persons.splice(i, 1);
        this.dataSource.data = this.persons;
      }
    });
  }

  openResetPasswordDialog(person, i){
    const dialogRef = this.dialog.open(
      ResetPasswordComponent,{
        data: {personId: person.id}
      }
    );

    dialogRef.afterClosed().subscribe(result=>{
      if(result['success']){
        this.notifier.notify("success", "Password resetted successfully");
      }
    });
  }
}