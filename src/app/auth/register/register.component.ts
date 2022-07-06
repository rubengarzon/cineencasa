import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass'],
})
export class RegisterComponent implements OnInit {
  formReg: FormGroup;
  constructor(private userService: UserService, private router: Router) {
    this.formReg = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    this.userService
      .register(this.formReg.value)
      .then((response: any) => {
        console.log(response);
        this.userService.isLogged = true;
        this.router.navigate(['/login']);
      })
      .catch((error: any) => console.log(error));
  }
}
