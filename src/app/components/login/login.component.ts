import { Component, OnInit, Input } from "@angular/core";
import { Usuario } from 'src/app/model/UserEntity.model';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }


  
  @Input() titulo: string;
  
  @Input() usuario: Usuario;

  ngOnInit() {
    this.titulo='Por favor Loguearse';

    this.usuario=new Usuario();
  }
  login(): void {
    console.log(this.usuario);
    if (this.usuario.username == "" || this.usuario.password == "") {
      swal.fire('Error Login', 'Username o password vacías!', 'error');
      return;
    }

    this.authService.login(this.usuario).subscribe(response => {
      console.log(response);

      this.authService.guardarUsuario(response.access_token);
      this.authService.guardarToken(response.access_token);
      let usuario = this.authService.usuario;
      this.router.navigate(['/candidatos']);
      swal.fire('Login', `Hola ${this.usuario.username}, has iniciado sesión con éxito!`, 'success');
    }, err => {
      if (err.status == 400) {
        swal.fire('Error Login', 'Usuario o clave incorrectas!', 'error');
      }
    }
    );
  }

}
