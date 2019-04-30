import { readFileSync } from 'fs'
import { Course } from './types'

const courses: Array<Course> = JSON.parse(String(readFileSync('./Courses.json')))

const listKeys = Object.keys(courses[0].list)
const queryKeys = Object.keys(courses[0].query)
const infoKeys = Object.keys(courses[0].info)



console.log(
    courses.reduce((prev, curr) => ({
        list:   listKeys.reduce((a, c) => ({ ...a, [c]: ( curr.list[c].length >  prev.list[c].length) ?  curr.list[c] : prev.list[c]  }), prev.list),
        query: queryKeys.reduce((a, c) => ({ ...a, [c]: (curr.query[c].length > prev.query[c].length) ? curr.query[c] : prev.query[c] }), prev.query),
        info:   infoKeys.reduce((a, c) => ({ ...a, [c]: ( curr.info[c].length >  prev.info[c].length) ?  curr.info[c] : prev.info[c]  }), prev.info)
    }), courses[0])
)


