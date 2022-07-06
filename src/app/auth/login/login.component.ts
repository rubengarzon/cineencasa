import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent implements OnInit {
  formLog!: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router,
    private readonly fb: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.formLog = this.initForm();
  }

  onLogin(): void {
    this.userService
      .login(this.formLog.value)
      .then((response: any) => {
        this.userService.isLogged = true;
        this.router.navigate(['/peliculas']);
      })
      .catch((error: any) => {
        if (error.message == 'Firebase: Error (auth/user-not-found).') {
          this.toastr.error('No existe el usuario');
        }
        if (error.message == 'Firebase: Error (auth/wrong-password).') {
          this.toastr.error('La contraseña es incorrecta');
        }
      });
  }

  initForm(): FormGroup {
    return this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
}
