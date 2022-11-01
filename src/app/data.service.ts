import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class DataService {
  backend_url = "http://localhost:3500/";

  constructor(private http: HttpClient) { }
  register(data: any) {
    return this.http.post("http://localhost:3500/register", data)
  }
  login(data: any) {
    return this.http.post("http://localhost:3500/login", data)
  }
  get(searchItem:any) {
    return this.http.get("http://localhost:3500/productdataget/"+searchItem)
  }
  addProduct(data: any) {
    return this.http.post(this.backend_url + "addproduct", data)
  }
  delete(id: string) {
    return this.http.delete(`${this.backend_url}deleteProduct/${id}`)
  }
  ProductInfo(id: string) {
    return this.http.get(this.backend_url + "getProductInfo/" + id)
  }
  update(id: string, data: any) {

    return this.http.put("http://localhost:3500/EditProduct/" + id, data)
  }
  getproduct(searchData:any) {
    return this.http.get(this.backend_url + "ProductGet/"+searchData)
  }
  idgetproduct(user_id: string, product_id: string) {
    return this.http.post("http://localhost:3500/addCart/" + user_id + "/" + product_id, {})
  }
  CartGetData(user_id:string) {
    return this.http.get(this.backend_url + "getCart/"+user_id)
  }
  Delete(id:any){
    return this.http.delete(this.backend_url+"productDelete/" + id)
  }
  userInfo(user_id:string){
    return this.http.get(this.backend_url+"getuserInfo/"+user_id)
  }
  profileUpdate(id:string,data:any){
   return this.http.put("http://localhost:3500/profileUpdate/"+id,data)
  }
}
