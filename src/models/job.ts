export class Job {
  uid: string = "";
  location: string = "";
  start: string = "";
  end: string = "";
  asigned: Array<string> = [];
  tasks: Array<string> = [];
  constructor(data: Job | {} = {}) {
    Object.assign(this, data);
  }
}
