export class Material {
  id: string = ''
  name: string = ''
  size: string = ''
  description: string = ''
  image: string | null = null
  prompts: Array<Object> = []
  constructor(data: Material | {} = {}) {
    Object.assign(this, data)
  }
}
