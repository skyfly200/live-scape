export class Location {
  id: string = ''
  title: string = ''
  contact: string = ''
  address: string = ''
  notes: Array<string> = []
  constructor(data: Location | {} = {}) {
    Object.assign(this, data)
  }
}
