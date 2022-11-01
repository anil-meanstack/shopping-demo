import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl,  FormGroup, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registered',
  templateUrl: './registered.component.html',
  styleUrls: ['./registered.component.css']
})
export class RegisteredComponent implements OnInit {
  data!: FormGroup;
  submitted = false;
  constructor(private userservice: DataService, private _router: Router,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.data = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }
  get input(): { [key: string]: AbstractControl } {
    return this.data.controls;

  }

  datafunctuion() {
    this.submitted = true
    if (this.data.valid) {
      this.userservice.register(this.data.value).subscribe(dataObj => {
        this.data.reset();
        this.toastr.info("User Register Successfully")
        this._router.navigateByUrl("/login")
      })
    }
  }
  onLogin(){
    this._router.navigateByUrl("/login")
  }
}
