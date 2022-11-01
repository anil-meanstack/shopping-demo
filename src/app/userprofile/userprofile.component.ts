import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup,Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';


@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {
  user !: FormGroup;
  file: any;
  // @description : respons of variable for data
  data:any;
  user_id: string = this.router.snapshot.url[1].path;
  formData: any = new FormData();
  constructor(private userservice: DataService, private _router: Router, private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.user = new FormGroup({
      name: new FormControl('',[Validators.required]),
      img: new FormControl,
      phone: new FormControl('',[Validators.required]),
      address: new FormControl('',[Validators.required]),
      gender: new FormControl('',[Validators.required]),

    })
    this.getuserInfo();
  }
  getuserInfo() {
    this.userservice.userInfo(this.user_id).subscribe((respons) => {
      // console.log(respons)
      this.data = respons;
      //  console.log(this.data[0].userInfo[0].name)
      this.user.patchValue({
        name :this.data[0].userInfo[0].name,
      })
    })
  }
  get input(): { [key: string]: AbstractControl } {
    return this.user.controls
  }
  onChange(event: any) {
    this.file = event.target.files[0];
    this.formData.append("files", this.file, this.file.name);
  }
  update(){
    // console.log(this.user.value.name)
    const name = this.user.value.name;
    const phone = this.user.value.phone;
    const address= this.user.value.address;
    const gender = this.user.value.gender;
       
    this.formData.append("name",name);
    this.formData.append("phone",phone);
    this.formData.append("address",address);
    this.formData.append("gender",gender)
    // console.log(this.formData.getAll("name"))  

     this.userservice.profileUpdate(this.user_id,this.formData).subscribe((abc)=>{
          console.log(abc)
     })
  }


}
