import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  Product_Of_data: any;
  searchData=null;
  

  
  backEndurl = "http://localhost:3500/uploads/";
  constructor(private userservice:DataService,private _router:Router) { }

  ngOnInit(): void {
   this.getProductdata(this.searchData) 
  }
  getProductdata(searchData:any){
    // console.log("--searchData--->",searchData)
    if(!searchData){
      searchData = null
    }
    this.userservice.getproduct(searchData).subscribe((data)=>{
      this.Product_Of_data=data
   })
  }
  getid(product_id:string){
      const userLocalObj = JSON.parse(localStorage.getItem('flipkart') || '{}')
      const user_id = userLocalObj.Userdata._id
    
    this.userservice.idgetproduct( product_id ,user_id).subscribe((response)=>{
      // console.log("respone------>",response)
      this._router.navigateByUrl("/addcart")
    })
  }
  addcart(){
    this._router.navigateByUrl("/addcart")
  }
  search(){
    //  console.log( this.searchData);
     this.getProductdata(this.searchData)
  }

}
