import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent implements OnInit {
  formLog: FormGroup;
  constructor(private userService: UserService, private router: Router) {
    this.formLog = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    this.userService
      .login(this.formLog.value)
      .then((response: any) => {
        console.log(response);
        this.userService.isLogged = true;
        this.router.navigate(['/peliculas']);
      })
      .catch((error: any) => console.log(error));
  }
}
