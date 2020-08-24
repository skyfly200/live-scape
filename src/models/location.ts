export class Location {
  uid: string = "";
  title: string = "";
  contact: string = "";
  address: string = "";
  notes: Array<string> = [];
  constructor(data: Location | {} = {}) {
    Object.assign(this, data);
  }
}
