import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {

  constructor(private userservice: DataService, private _router: Router) { }
  /*
  *@description = 
  */
  user!: FormGroup;
  file: any;
  //form data object. to store form information...
  formData: any = new FormData();
  ngOnInit(): void {
    this.user = new FormGroup({
      name: new FormControl('',[Validators.required]),
      //img: new FormControl,
      price: new FormControl('',[Validators.required]),
      date: new FormControl('',[Validators.required]),
    })
  }
  get input(): { [key: string]: AbstractControl } {
    return this.user.controls
  }

  onChange(event: any) {
    this.file = event.target.files[0];
    this.formData.append("files", this.file, this.file.name);
  }

  Add() {
   
    // console.log("this.user.value.name--->",this.user.value.name)
    //this.formData.append("test", "this is test");
    //console.log(this.user.value)
    //this.formData.append("name", this.user.value.name);
    const name =  this.user.value.name;
    const price = this.user.value.price;
    const date =  this.user.value.date;
    
    this.formData.append("name", name);
    this.formData.append("price", price)
    //this.formData.append("price", this.user.value.price);
    this.formData.append("date",date)

    //  console.log("value of name------------>",this.formData.getAll('files'))
    // console.log(this.formData);
    
    this.userservice.addProduct(this.formData).subscribe((data) => {
      // console.log(data)
      this.user.reset()
      this._router.navigateByUrl("/admin")

      //document.getElementsByClassName("remove_after_upload").value = "";

     


    })
  }

}
