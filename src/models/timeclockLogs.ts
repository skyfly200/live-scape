export class TimeclockLogs {
  uid: string = "";
  user: string = "";
  start: Date = new Date();
  end: Date = new Date();
  duration: string = "";
  constructor(data: TimeclockLogs | {} = {}) {
    Object.assign(this, data);
  }
}
