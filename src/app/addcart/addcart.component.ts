import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
@Component({
  selector: 'app-addcart',
  templateUrl: './addcart.component.html',
  styleUrls: ['./addcart.component.css']
})
export class AddcartComponent implements OnInit {
  Product_of_data: any;
  backEndurl = "http://localhost:3500/uploads/";
  constructor(private userservice: DataService, private _router: Router) { }

  ngOnInit(): void {
    this.getData();

  }

  getData() {
    
     const userLocalObj = JSON.parse(localStorage.getItem('flipkart') || '{}')
       const user_id = userLocalObj.Userdata._id
      //  console.log(userLocalObj.Userdata._id)
    this.userservice.CartGetData(user_id).subscribe((data) => {
      this.Product_of_data = data;
      //    console.log("--------------->",this.Product_of_data)
    })
  }
  productDelete(id:any) {
    // console.log(id)
  this.userservice.Delete(id).subscribe((productDelete)=>{
    this.getData()
   })
  }
}
