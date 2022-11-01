import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  Product_Of_data: any;
  backEndurl = "http://localhost:3500/uploads/";
  searchItem: any;
  constructor(private usersrvice: DataService, private _router: Router) { }

  ngOnInit(): void {
    this.getProduct(this.searchItem)
  }
  getProduct(searchItem: any) {
    if(!searchItem){
      searchItem = null
    } 
    this.usersrvice.get(searchItem).subscribe((data) => {
      this.Product_Of_data = data
    })
  }
  update(id: string) {
    this._router.navigateByUrl("/editproduct/" + id)

  }
  Delete(id: string) {
    console.log(id)
    this.usersrvice.delete(id).subscribe((data) => {
      this.getProduct(this.searchItem)
    })
  }
  addProduct() {
    this._router.navigateByUrl("/addproduct")
  }
  search() {
    //  console.log(this.searchItem)
    this.getProduct(this.searchItem)
  }
}
