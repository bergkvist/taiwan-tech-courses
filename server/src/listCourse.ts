import { readFileSync } from 'fs'
import { JSDOM } from 'jsdom'
import { ListCourse } from './types'

/* titles: 
   0 'No.', 
   1 'Course Number', 
   2 'Course Title', 
   3 'Required or Optional', 
   4 'Credits', 
   5 'Course Outline', 
   6 'Faculty', 
   7 'Day / Time', 
   8 'Location', 
   9 'NTUST Student Registered', 
  10 'NTU System Student Registered', 
  11 'Total Student Registered', 
  12 'Notes' 
*/

const dom = new JSDOM(readFileSync('./QueryResult.aspx'))
const table = dom.window.document.querySelector('table#my_dg')
const [ titles, ...rows ] = Array.from(table.querySelectorAll('tr')).map(row => 
    Array.from(row.querySelectorAll('td'))
).filter(row => row[1].textContent.trim() !== '')

let currentCount = 0
let totalCount = rows.length

export const listCourses = rows.map(row => {
    const id = row[1].textContent
    console.log(`${id}: Scanning course (${++currentCount}/${totalCount})`)
    const title = row[2].querySelector('a').innerHTML
    const infoUrl = ('https://qcourse.ntust.edu.tw/querycourse/EngCourseQuery/' + row[2].querySelector('a').getAttribute('href')).trim()
    const credits = Number(row[4].innerHTML)
    const outlineUrl = row[5].querySelector('a').getAttribute('href').trim()
    const time = row[7].innerHTML
    const location = row[8].innerHTML
    const notes = row[12].innerHTML
    const course: ListCourse = { id, credits, infoUrl, location, notes, outlineUrl, time, title }
    return course
}).filter(course => course.id !== '')

console.log('Done scanning courses!')

//writeFileSync('./QCourseListItems.json', JSON.stringify(courses))