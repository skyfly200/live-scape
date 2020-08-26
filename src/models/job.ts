export class Job {
  id: string = ''
  location: string = ''
  start: Date = new Date()
  end: Date = new Date()
  asigned: Array<string> = []
  tasks: Array<string> = []
  constructor(data: Job | {} = {}) {
    Object.assign(this, data)
  }
}
