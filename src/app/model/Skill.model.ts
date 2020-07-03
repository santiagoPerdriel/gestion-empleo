export class Skill {
    id: number;
    timeUse: string;
    technology: string;

    constructor({ id, timeUse, technology }: { id?: number; technology?: string; timeUse?: string; } = {}) {
      this.id=id;
      this.technology=technology;
      this.timeUse=timeUse;
    }

  }