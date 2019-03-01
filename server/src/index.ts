import { writeFileSync } from 'fs'
import { listCourses } from './listCourse'
import { fetchQueryCourse } from './queryCourse'
import { fetchInfoCourse } from './infoCourse'
import { Course } from './types'

let completeCount = 0
let totalCount = listCourses.length

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
    writeFileSync('Courses.json', JSON.stringify(courses))
    console.log('All courses fetched. Stored to Courses.json')
})()