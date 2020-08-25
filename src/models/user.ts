export class User {
  public uid: string = "";
  public displayName: string = "";
  public email: string = "";
  public phone: string | null = null;
  public photoURL: string | null = null;
  public providers: Array<any> = [];
  public active: boolean = false;
  public lastLogin: string = "";
  public role: string = "";
  constructor(data: User | {} = {}) {
    Object.assign(this, data);
  }
}
