export type ListCourse = Readonly<{
    id: string
    title: string
    credits: number
    infoUrl: string
    outlineUrl: string
    time: string
    location: string
    notes: string
}>

export type QueryCourse = Readonly<{
    Department: string // lbl
    CourseNumber: string // lbl
    CourseTitle: string // lbl
    Faculty: string // lbl
    Credits: string // lbl
    Prerequisite: string // lbl
    Term: string // lbl
    DayTime: string // lbl
    Location: string // lbl
    CourseDescription: string // txt
    NTUSTstu: string // lbl
    NTUstu: string // lbl
    TotalStu: string // lbl
    Restrict1: string // lbl
    Restrict2: string // lbl
    SpecialNotes: string // lbl
    Syllabus: string // lbl
    FacultyBio: string // lbl
}>

export type InfoCourse = Readonly<{
    semester: string  // lbl
    courseno: string  // lbl
    coursename: string  // lbl
    engname: string  // lbl
    creditpoints: string  // lbl
    requireoption: string // lbl
    timenode: string // lbl
    precourse: string // lbl
    core: string // lbl
    coursehttp: string // hlk
    object: string // tbx
    content: string // tbx
    textbook: string // tbx
    refbook: string // tbx
    note: string // tbx
    grading: string // tbx
    remark: string // tbx
}>

export type Course = Readonly<{
    list: ListCourse
    query: QueryCourse
    info: InfoCourse
}>

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

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
export async function tryUntilSuccessful(axios: (url: string) => any, url: string) {
    while(true) {
        try {
            const result = await axios(url)
            return result
        } catch(err) {
            const delay = Math.floor(4000 * Math.random())
            console.log(`${err.message} (${url}) - Retrying in ${delay} ms`)
            await sleep(delay)
        }
    }   
}