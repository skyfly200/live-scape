export class Job {
  uid: string = "";
  user: string = "";
  start: Date = new Date();
  end: Date = new Date();
  duration: string = "";
  constructor(data: Job | {} = {}) {
    Object.assign(this, data);
  }
}
