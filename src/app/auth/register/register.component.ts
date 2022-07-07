import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass'],
})
export class RegisterComponent implements OnInit {
  formReg: FormGroup;
  constructor(
    private userService: UserService,
    private router: Router,
    private readonly fb: FormBuilder,
    private toastr: ToastrService
  ) {
    this.formReg = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
    });
  }

  ngOnInit(): void {
    this.formReg = this.initForm();
  }

  initForm(): FormGroup {
    return this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onRegister() {
    this.userService
      .register(this.formReg.value)
      .then((response: any) => {
        this.toastr.info('Te has registrado correctamente');
        this.userService.isLogged = true;
        this.router.navigate(['/peliculas']);
      })
      .catch((error: any) => {
        this.toastr.error('Se ha producido un error, intentelo de nuevo')
      });
  }
}
