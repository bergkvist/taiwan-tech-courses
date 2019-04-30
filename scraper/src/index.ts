import { writeFileSync } from 'fs'
import { listCourses } from './listCourse'
import { fetchQueryCourse } from './queryCourse'
import { fetchInfoCourse } from './infoCourse'
import { Course, CourseExtract } from './types'

let completeCount = 0
let totalCount = listCourses.length

const extractCourseInfo = (course: Course): CourseExtract => ({
    id: course.list.id,
    title: course.list.title,
    location: course.list.location,
    time: course.list.time,
    credits: course.list.credits,
    url: {
        outline: course.list.outlineUrl,
        info: course.list.infoUrl,
        http: 'http://' + course.info.coursehttp
    },

    department: course.query.Department,
    faculty: course.query.Faculty,
    description: course.query.CourseDescription,
    studentCountNTU: Number(course.query.NTUstu),
    studentCountNTUST: Number(course.query.NTUSTstu),
    studentCountTotal: Number(course.query.TotalStu),
    term: course.query.Term,

    semester: course.info.semester,
    core: course.info.core,
    object: course.info.object,
    content: course.info.content,
    textbook: course.info.textbook,
    refbook: course.info.refbook,
    note: course.info.note,
    grading: course.info.grading,
    remark: course.info.remark,
})

;(async function() {
    const courses = await Promise.all(
        listCourses.map(async listCourse => {
            const [ queryCourse, infoCourse ] = await Promise.all([fetchQueryCourse(listCourse), fetchInfoCourse(listCourse)])
            const course: Course = {
                info: infoCourse,
                list: listCourse,
                query: queryCourse
            }
            console.log(`${course.list.id} complete (${++completeCount}/${totalCount})`)
            return course
        })
    )
    writeFileSync('Courses.json', JSON.stringify(courses), { encoding: 'utf-8' })
    console.log('All courses fetched. Stored to Courses.json')

    writeFileSync('CourseExtracts.json', JSON.stringify(courses.map(extractCourseInfo)), { encoding: 'utf-8' })
})()