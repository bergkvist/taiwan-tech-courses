export type CourseExtract = Readonly<{
  id: string
  title: string
  location: string
  time: string
  credits: number
  url: {
    outline: string
    info: string
    http: string
  }

  department: string
  description: string
  faculty: string
  studentCountNTU: number
  studentCountNTUST: number
  studentCountTotal: number
  term: string

  semester: string
  core: string
  object: string
  content: string
  textbook: string
  refbook: string
  note: string
  grading: string
  remark: string
}>