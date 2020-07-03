import { Component, OnInit,Input } from "@angular/core";
import { Candidato } from "../../../model/Candidato.model";
import { ActivatedRoute, Router } from "@angular/router";
import { CandidatoService } from "../candidato.service";
import swal from "sweetalert2";
import { Contact } from "src/app/model/Contacto.model";
import { Skill } from "src/app/model/Skill.model";
import { skip } from "rxjs/operators";
import { kill } from 'process';
import { Job } from '../../../model/Jobs.model';

@Component({
  selector: "app-formulario",
  templateUrl: "./formulario.component.html",
  styles: [],
})
export class FormularioComponent implements OnInit {
  titulo: string = "Crear Candidato";

  @Input()candidato: Candidato;

  errores: string[];

  avatar:string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private candidatoService: CandidatoService,
    private router: Router
  ) {}

  ngOnInit() {
    this.candidato = new Candidato();
    this.candidato.contact = new Contact();

    this.activatedRoute.paramMap.subscribe(params => {
      let id = +params.get('id');
      if (id) {
        this.candidatoService.getCandidato(id).subscribe((data) => this.candidato = data);
      }
    });
    

    if (this.candidato.skills.length == 0) {
      let skill = new Skill();

      this.candidato.skills.push(skill);
    }

    if (this.candidato.jobs.length == 0) {
      let job = new Job();

      this.candidato.jobs.push(job);
    }
  }

  hombre(String){

  }
  update(): void {
    this.candidatoService.createCandidato(this.candidato).subscribe(
      (candidato) => {
        this.router.navigate(["/candidatos"]);
        swal.fire(
          "Nuevo cliente",
          `El cliente ${this.candidato.name} ha sido creado con éxito`,
          "success"
        );
      },
      (err) => {
        this.errores = err.error.errors as string[];
        console.error("Código del error desde el backend: " + err.status);
        console.error(err.error.errors);
      }
    );
  }
  onChange(event){
    console.log(event);
  }
  create(): void {
    console.log(this.candidato);
    console.log(this.avatar);

    this.candidatoService.createCandidato(this.candidato).subscribe(
      (candidato) => {
        this.router.navigate(["/candidatos"]);
        swal.fire(
          "Nuevo cliente",
          `El cliente ${this.candidato.name} ha sido creado con éxito`,
          "success"
        );
      },
      (err) => {
        this.errores = err.error.errors as string[];
        console.error("Código del error desde el backend: " + err.status);
        console.error(err.error.errors);
      }
    );
  }

  addSkill(skill,idenx) {
    
    var tiene = false;
    var sada=this.candidato.skills;
    for (let skill of this.candidato.skills) {
      if (skill.technology == null && skill.timeUse == null) {
        swal.fire(
          "Skill",
          `Tiene un Tecnologia disponible Disponible para completar`,
          "success"
        );
        tiene = true;
      }
    }
  


    if (tiene == false) {
      var oldArray=this.candidato.skills;
      var arraynuevoAdd: Skill [];
      arraynuevoAdd= [];
      var skills: Skill;
       skills= new Skill();
      arraynuevoAdd.push(skills);
      var nuevoArray= oldArray.concat(arraynuevoAdd);
      this.candidato.skills=nuevoArray;
     
    }
   
    
  }

  deleteSkill(skill) {
    if (this.candidato.skills.length == 1) {
      swal.fire("Skill", `No eliminar el skill`, "success");
    } else {
      const index = this.candidato.skills.indexOf(skill, 0);
      if (index > -1) {
        this.candidato.skills.splice(index, 1);
      }
    }
  }

  addJbob() {
    let tiene = false;
    for (let job of this.candidato.jobs) {
      if (job.nameCompany == null && job.startCompany == null) {
        swal.fire(
          "Skill",
          `Tiene un Tecnologia disponible Empresa para completar`,
          "success"
        );
        tiene = true;
    }
     job:Job;
    if (tiene == false) {
      job= new Job();
      this.candidato.jobs.push(job);
    }
  }
}

  deleteJbos(jobq: Job) {
    if (this.candidato.jobs.length == 1) {
      swal.fire("Skill", `No eliminar el skill`, "success");
    } else {
      const index = this.candidato.jobs.indexOf(jobq, 0);
      if (index > -1) {
        this.candidato.jobs.splice(index, 1);
      }
    }
  }
}
