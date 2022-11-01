import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { ToastrService } from 'ngx-toastr';
import { subscribeOn } from 'rxjs';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  UserData!: FormGroup;
  submitted = false;
  userObj: any;
  show_error = false;

  constructor(private usersrvice: DataService, private _router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.UserData = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])

    })

  }

  get input(): { [key: string]: AbstractControl } {
    return this.UserData.controls;

  }
  submitFunction() {
    this.submitted = true
    if (this.UserData.valid) {
      this.usersrvice.login(this.UserData.value).subscribe(data => {
        this.userObj = data
        console.log(data)
        if (this.userObj.is_login == false) {
          this.show_error = true;
        }
        if (this.userObj.login == true) {
          localStorage.setItem('flipkart', JSON.stringify(data))
          console.log(this.userObj.Userdata.userType)
          if (this.userObj.Userdata.userType == 0) {
            this.toastr.success("User login succesfully")
            this._router.navigateByUrl("/admin")
          } else {
            this.toastr.success("User login succesfully")
            this._router.navigateByUrl('/product');
          }


        }
      })
    }
  }
}
