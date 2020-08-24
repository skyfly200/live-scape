export class Contact {
  uid: string = "";
  firstName: string = "";
  lastName: string = "";
  nickname: string = "";
  email: string = "";
  homePhone: string | null = null;
  cellPhone: string | null = null;
  constructor(data: Contact | {} = {}) {
    Object.assign(this, data);
  }
}
