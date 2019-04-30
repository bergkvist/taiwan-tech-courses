import { JSDOM } from 'jsdom'
import { InfoCourse, ListCourse, tryUntilSuccessful } from './types'
import axios from 'axios'

function getInfoCourse (dom: JSDOM): InfoCourse {
    const $ = (selector: string) => dom.window.document.querySelector(selector)
    const data: InfoCourse = {
        semester: $('#lbl_semester').textContent,
        courseno: $('#lbl_courseno').textContent,
        coursename: $('#lbl_coursename').textContent,
        engname: $('#lbl_engname').textContent,
        creditpoints: $('#lbl_creditpoints').textContent,
        requireoption: $('#lbl_requireoption').textContent,
        timenode: $('#lbl_timenode').textContent,
        precourse: $('#lbl_precourse').textContent,
        core: $('#lbl_core').textContent,
        coursehttp: $('#hlk_coursehttp').textContent,
        object: $('#tbx_object').textContent,
        content: $('#tbx_content').textContent,
        textbook: $('#tbx_textbook').textContent,
        refbook: $('#tbx_refbook').textContent,
        note: $('#tbx_note').textContent,
        grading: $('#tbx_grading').textContent,
        remark: $('#tbx_remark').textContent
    }
    return data
}

export async function fetchInfoCourse(listCourse: ListCourse): Promise<InfoCourse> {
    const response = await tryUntilSuccessful(axios.get, listCourse.outlineUrl)
    const dom = new JSDOM(response.data)
    return getInfoCourse(dom)
}