import { Component, OnInit, Input } from '@angular/core';
import { CandidatoService } from "./candidato.service";
import { AuthService } from "../login/auth.service";
import { ActivatedRoute } from "@angular/router";
import { tap } from "rxjs/operators";
import { Candidato } from "src/app/model/Candidato.model";
import swal from 'sweetalert2';

@Component({
  selector: "app-candidatos",
  templateUrl: "./candidatos.component.html",
  styles: [],
})
export class CandidatosComponent implements OnInit {
  candidatos: Candidato[];
  cvTitulo:String;
  @Input() fileURL = "";

  constructor(
    private candidatoService: CandidatoService,
    public authService: AuthService,
    private activatedRoute: ActivatedRoute
  ) {};

  ngOnInit() {
    console.log("Cli");

    this.candidatoService.getClientes().subscribe(
      (data: Candidato[]) => {
        this.candidatos = data;
      },
      error => {
        console.log("error");
      }
    );
  }

  clickEvent(idCandidate) {

    this.candidatoService.getPDFtemplate(idCandidate)
      .subscribe((response) => {
        let file = new Blob([response], { type: "application/pdf" });
        
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          console.log("previsualizar Edge" );
          window.navigator.msSaveOrOpenBlob(file, "previsualizar.pdf");
        } else {
          console.log("else" );
          this.fileURL = URL.createObjectURL(file);
          window.open(this.fileURL);
        }
      }, error =>{
        // this.error("No se pudo consultar el pdf :" + error);
      });
  }

  delete(idCan): void {
        this.candidatoService.delete(idCan).subscribe(
          () => {
            
            window.location.reload();

           } );

      }
   
  }


