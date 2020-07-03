import { Contact } from './Contacto.model';
import { Skill } from './Skill.model';
import { Job } from './Jobs.model';
export class Candidato {
    id: number;
    name: string;
    lastname: string;
    photo: string;
    birthdate: string;
    email: string;
    jobs: Job[] = [];
    skills: Skill[] = [];
    cv: string;
    iscv: boolean;
    random:number 
    contact: Contact;
    dni: String;

  }