import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CandidatosComponent } from './components/candidatos/candidatos.component';
import { HeaderComponent } from './components/header/header.component';
import { NoimagePipe } from './components/pipes/noimage.pipe';
import { FormularioComponent } from './components/candidatos/formulario/formulario.component';
import { CandidatoService } from './components/candidatos/candidato.service';
import { TokenInterceptor } from './components/interceptors/token.interceptor';
import { AuthInterceptor } from './components/interceptors/auth.interceptor';
import { UploadComponent } from './components/upload/upload.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CandidatosComponent,
    HeaderComponent,
    NoimagePipe,
    FormularioComponent,
    UploadComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [CandidatoService,
    { provide: LOCALE_ID, useValue: 'es' },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
