import { Component, OnInit } from '@angular/core';
import { PeliculasService } from '../../services/peliculas.service';
import { UserService } from '../../services/auth.service';
import { Like } from 'src/app/interfaces/like.interface';

@Component({
  selector: 'app-my-list',
  templateUrl: './my-list.component.html',
  styleUrls: ['./my-list.component.sass'],
})
export class MyListComponent implements OnInit {
  userCurrent: any;
  likes!: Like[];

  constructor(
    private peliculasServicio: PeliculasService,
    private auth: UserService
  ) {}

  ngOnInit(): void {
    this.userCurrent = this.auth.getUserCurrent();
    this.peliculasServicio.getLikes(this.userCurrent).subscribe((data) => {
      this.likes = data;
    });
  }
}
