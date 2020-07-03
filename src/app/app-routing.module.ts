import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { CandidatosComponent } from './components/candidatos/candidatos.component';
import { FormularioComponent } from './components/candidatos/formulario/formulario.component';
import { AuthGuard } from './components/candidatos/guards/auth.guard';
import { RoleGuard } from './components/candidatos/guards/role.guard';
import { UploadComponent } from './components/upload/upload.component';


const routes: Routes = [
  { path: '', redirectTo: '/candidatos', pathMatch: 'full' },
  { path: 'login'   , component: LoginComponent },
  { path: 'candidatos'   , component: CandidatosComponent },
  { path: 'formulario'   , component: FormularioComponent },
  { path: 'formulario/:id', component: FormularioComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN' } },
  { path: 'upload/:idCandidato', component: UploadComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN' } },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
