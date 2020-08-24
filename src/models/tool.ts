export class Tool {
  uid: string = "";
  name: string = "";
  size: string = "";
  description: string = "";
  image: string | null = null;
  constructor(data: Tool | {} = {}) {
    Object.assign(this, data);
  }
}
