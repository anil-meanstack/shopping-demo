import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.component.html',
  styleUrls: ['./editproduct.component.css']
})
export class EditproductComponent implements OnInit {

  constructor(private userservice: DataService, private _router: Router, private router: ActivatedRoute) { }
  user!: FormGroup;
  data: any;
  user_id: string = this.router.snapshot.url[1].path;
  show = false;
  file: any;
  formData: any = new FormData();
  ngOnInit(): void {
    this.user = new FormGroup({
      name: new FormControl('',[Validators.required]),
      img: new FormControl,
      price: new FormControl('',[Validators.required]),
      date: new FormControl('',[Validators.required]),
    })
    this.getProduct();
  }
  getProduct() {
    this.userservice.ProductInfo(this.user_id).subscribe((result) => {
      this.data = result;
      this.user.patchValue({
        name: this.data.Product.name,
        img: this.data.Product.img,
        price: this.data.Product.price,
        date: this.data.Product.date,
      })
      // console.log(this.data.Product.date)
    })
  }
  get input(): { [key: string]: AbstractControl } {
    return this.user.controls
  }
  onChange(event: any) {
    this.file = event.target.files[0];
    this.formData.append("files", this.file, this.file.name);
  }
  addProduct() {
  console.log("this.data.Product.name------>",this.user.value.name)
    const name = this.user.value.name;
    const price = this.user.value.price;
    const date = this.user.value.date;

    this.formData.append("name", name);
    this.formData.append("price", price);
    this.formData.append("date", date)
    // console.log(">>>>>>>>>>>>>>>>>>", this.formData.getAll("name"))
    
    this.userservice.update(this.user_id, this.formData).subscribe((abc) => {
      this._router.navigateByUrl("/admin")

    })
  }
}
