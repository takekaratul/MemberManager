import { Component } from '@angular/core';
import {AfterViewInit,OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ApiService } from './services/api.service';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'testProject';
  displayedColumns: string[] = ['name', 'email', 'role', 'expiryDate','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog, private api: ApiService){

  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '30%'
    }).afterClosed().subscribe(val=>{
        if(val == "save"){
          this.getAllUsers();
        }
    })
  }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(){
    this.api.getUsers()
    .subscribe({
      next:(res)=>{
        // console.log(res)
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error:(err)=>{
        alert("error while fertching Users")
      }
    })
  }

  editUser(row: any){
    this.dialog.open(DialogComponent,{
      width: '30%',
      data:row
    }).afterClosed().subscribe(val=>{
      if(val == "update"){
        this.getAllUsers();
      }
  })
  }

  deleteUser(id : number){
    this.api.deleteProduct(id)
    .subscribe({
      next:(res)=>{
        alert("User deleted sucessfully")
        this.getAllUsers()
      },
      error:()=>{
        alert("Some Error Occured")
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
}
