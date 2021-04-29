import regressions from 'regression'
import regress from 'multiregress'
import { round } from 'mathjs'
import multiplelines from './lib/regression.js'

/**
 *
 * @param {*} req
 * @param {*} res
 */
const CvS = (A) => {
    A = A.split('↵')
    let convert = ''
    A.map((r) => {
        convert = convert + r
    })
    return convert
}
export const Linear = (req, res) => {
    const { A, p } = req.body
    const mA = JSON.parse(CvS(A))
    const pre = JSON.parse(p)
    let result = regressions.linear(mA).predict(pre)
    res.json({ data: result })
}
export const poly = (req, res) => {
    const { A, o } = req.body
    const mA = JSON.parse(CvS(A))
    const orde = JSON.parse(o)
    let result = regressions.polynomial(mA, { order: orde })
    console.log(result)
    res.json({ data: result.r2})
}
export const Multiple = (req, res) => {
    const { A } = req.body
    const mA = JSON.parse(CvS(A))
    // let result = regress.regression(mA)
    // console.log(result)

    const multi = multiplelines(mA)
    res.json({ data: multi })
    // res.json({ data: round(result) })
}