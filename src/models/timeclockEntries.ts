export class TimeclockEntries {
  id: string = ''
  user: string = ''
  start: Date | any = new Date()
  end: Date = new Date()
  duration: string = ''
  constructor(data: TimeclockEntries | {} = {}) {
    Object.assign(this, data)
  }
}
