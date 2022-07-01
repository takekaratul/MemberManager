import { Component, Inject, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { ApiService } from '../services/api.service';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  today = new Date(); 
  userForm !: FormGroup;
  actionBtn : string = "Save"

  constructor(private formBuilder : FormBuilder, 
    private api: ApiService, 
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialogRef: MatDialogRef<DialogComponent>) {
  }

  ngOnInit(): void {
      this.userForm = this.formBuilder.group({
        name : ['', Validators.required],
        role: ['', Validators.required],
        email: ['', Validators.required],
        expiryDate: ['', Validators.required]
      })

      // console.log(this.editData)
      if(this.editData){
        this.actionBtn = "Update"
        this.userForm.controls['name'].setValue(this.editData.name);
        this.userForm.controls['role'].setValue(this.editData.role);
        this.userForm.controls['email'].setValue(this.editData.email);
        this.userForm.controls['expiryDate'].setValue(this.editData.expiryDate);
      }
  }

  addUser(){
    if(this.editData){
      this.updateUser()
    }else{
      if(this.userForm.valid){
        this.api.postUser(this.userForm.value)
        .subscribe({
          next:(res)=>{
            alert("User added sucessfully")
            this.userForm.reset();
            this.dialogRef.close('save');
          },
          error:()=>{
            alert("Some Error Occured")
          }
        })
      }
    }
  }

  updateUser(){
    this.api.putProduct(this.userForm.value, this.editData.id)
    .subscribe({
      next:(res)=>{
        alert("User updated sucessfully")
        this.userForm.reset();
        this.dialogRef.close('update');
      },
      error:()=>{
        alert("Some Error Occured")
      }
    });
  }


}
