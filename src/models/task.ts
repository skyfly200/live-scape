export class Task {
  uid: string = "";
  status: string = "";
  location: string = "";
  job: string | null = null;
  title: string = "";
  description: string = "";
  notes: string = "";
  tools: Array<string> = [];
  materials: Array<string> = [];
  logs: Array<Object> = [];
  constructor(data: Task | {} = {}) {
    Object.assign(this, data);
  }
}
