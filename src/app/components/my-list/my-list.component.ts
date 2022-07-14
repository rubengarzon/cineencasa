import { Component, OnInit } from '@angular/core';
import { PeliculasService } from '../../services/peliculas.service';
import { UserService } from '../../services/auth.service';
import { Like } from 'src/app/interfaces/like.interface';
import { ToastrService } from 'ngx-toastr';
import { LikesService } from 'src/app/services/likes.service';

@Component({
  selector: 'app-my-list',
  templateUrl: './my-list.component.html',
  styleUrls: ['./my-list.component.sass'],
})
export class MyListComponent implements OnInit {
  userCurrent: any;
  likes!: Like[];

  constructor(
    private likesServicio: LikesService,
    private auth: UserService,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.userCurrent = this.auth.getUserCurrent();
    this.likesServicio.getLikes(this.userCurrent).subscribe((data) => {
      this.likes = data;
    });
  }
  /**
   * * Borra un like de la lista
   * @param id
   * @param name
   */
  deleteLike(id: number, name: string) {
    if (window.confirm('¿Estás seguro de eliminar esta película?')) {
      this.likesServicio
        .deleteLike(id, this.userCurrent)
        .then((data) => {
          this.toast.success('Se ha borrado ' + name);
        })
        .catch((error) => {
          this.toast.error('No se ha podido borrar intentelo más tarde');
        });
    }
  }
}
