import { JSDOM } from 'jsdom'
import { Agent } from 'https'
import Axios from 'axios'
import { ListCourse, QueryCourse, tryUntilSuccessful } from './types'
const httpsAgent = new Agent({ ciphers: '3DES', maxVersion: 'TLSv1' })
const axios = Axios.create({ httpsAgent })

function getQueryCourse(dom: JSDOM): QueryCourse {
    const $ = (selector: string) => dom.window.document.querySelector(selector)
    const data: QueryCourse = {
        Department: $('span#lblDepartment').innerHTML,
        CourseDescription: $('#txtCourseDescription').innerHTML,
        CourseNumber: $('#lblCourseNumber').innerHTML,
        CourseTitle: $('#lblCourseTitle').innerHTML,
        Credits: $('#lblCredits').innerHTML,
        DayTime: $('#lblDayTime').innerHTML,
        Faculty: $('#lblFaculty').innerHTML,
        FacultyBio: $('#lblFacultyBio').innerHTML,
        Location: $('#lblLocation').innerHTML,
        NTUSTstu: $('#lblNTUSTstu').innerHTML,
        NTUstu: $('#lblNTUstu').innerHTML,
        Prerequisite: $('#lblPrerequisite').innerHTML,
        Restrict1: $('#lblRestrict1').innerHTML,
        Restrict2: $('#lblRestrict2').innerHTML,
        SpecialNotes: $('#lblSpecialNotes').innerHTML,
        Syllabus: $('#lblSyllabus').innerHTML,
        Term: $('#lblTerm').innerHTML,
        TotalStu: $('#lblTotalStu').innerHTML
    }
    return data
}

export async function fetchQueryCourse(listCourse: ListCourse): Promise<QueryCourse> {
    const response = await tryUntilSuccessful(axios.get, listCourse.infoUrl)
    const dom = new JSDOM(response.data)
    return getQueryCourse(dom)
}