import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CandidatoService } from '../candidatos/candidato.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styles: []
})
export class UploadComponent implements OnInit {


  title = "File-Upload-Save";
  selectedFiles: FileList;
  currentFileUpload: File;
  progress: { percentage: number } = { percentage: 0 };
  selectedFile = null;
  changeImage = false;
  mySubscription: any;
  idCandidato:number;

  constructor(private activatedRoute: ActivatedRoute,
    private candidatoService: CandidatoService,
    private router: Router) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(parametros => {
      this.idCandidato = parametros["idCandidato"];
  });
  }

  upload2() {
    this.currentFileUpload = this.selectedFiles.item(0);
    this.candidatoService
      .pushFileToStoragePortada2(this.currentFileUpload, this.idCandidato)
      .subscribe((data :String)=>{
        this.router.navigate(['/candidatos']);
      },
      err => {
        this.router.navigate(['/candidatos']);
      }
      );
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }
}
