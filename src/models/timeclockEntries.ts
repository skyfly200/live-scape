export class TimeclockEntries {
  uid: string = "";
  user: string = "";
  start: Date = new Date();
  end: Date = new Date();
  duration: string = "";
  constructor(data: TimeclockEntries | {} = {}) {
    Object.assign(this, data);
  }
}
