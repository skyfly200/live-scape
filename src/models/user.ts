export class User {
  uid: string = "";
  displayName: string = "";
  email: string = "";
  phone: string | null = null;
  photoURL: string | null = null;
  providers: Array<Object> = [];
  active: boolean = false;
  lastLogin: string = "";
  role: string = "";
  constructor(data: User | {} = {}) {
    Object.assign(this, data);
  }
}
