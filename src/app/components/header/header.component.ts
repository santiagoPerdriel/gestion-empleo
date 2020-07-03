import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { AuthService } from '../login/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

 

  ngOnInit() {
  }

  title: string = 'App Angular'

  constructor(public authService: AuthService, private router: Router) { }
  logout(): void {
    // let username = this.authService.usuario.username;
    this.authService.logout();
    swal.fire('Logout', `Hola , has cerrado sesión con éxito!`, 'success');
    this.router.navigate(['/login']);
  }

}
