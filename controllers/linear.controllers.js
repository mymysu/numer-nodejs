import { multiply, transpose, det, round, lusolve, inv, mad } from 'mathjs'
import linSystem from 'linear-equation-system'
import rref from 'rref'
import { fromDense } from 'csr-matrix'
import pcg from 'conjugate-gradient'

/**
 *
 * @param {'express'} req
 * @param {'express'} res
 */
const CvS = (A) => {
    A = A.split('↵')
    let convert = ''
    A.map((r) => {
        convert = convert + r
    })
    return convert
}
export const Cramer = (req, res) => {
    const { A, B } = req.body
    let maA = CvS(A)
    let maB = CvS(B)
    const mA = JSON.parse(maA)
    const mB = JSON.parse(maB)
    let size = mA.length
    const Amat = new Array(size)
    let check = false
    const x = []
    for (let i = 0; i < mA.length; i++) {
        if (mA[i].length !== size) {
            check = true
            break
        }
    }
    if (!check) {
        for (let i = 0; i < size; i++) {
            Amat[i] = JSON.parse(JSON.stringify(mA))
        }
        for (let s = 0; s < size; s++) {
            for (let i = 0; i < size; i++) {
                Amat[s][i][s] = mB[i]
            }
        }
        for (let i = 0; i < size; i++) {
            let t = det(Amat[i]) / det(mA)
            x.push(t)
        }
    }
    res.json({
        data: round(x),
    })
}
export const LuDecomposition = (req, res) => {
    const { A, B } = req.body
    let maA = CvS(A)
    let maB = CvS(B)
    const mA = JSON.parse(maA)
    const mB = JSON.parse(maB)
    let result = lusolve(mA, mB)
    let answer = []
    for (let i = 0; i < result.length; i++) {
        answer.push(result[i][0])
    }
    res.json({
        data: round(answer),
    })
}
export const Gauss_E = (req, res) => {
    const { A, B } = req.body
    let maA = CvS(A)
    let maB = CvS(B)
    const mA = JSON.parse(maA)
    const mB = JSON.parse(maB)
    let size = mA.length
    let check = false
    let result = []
    for (let i = 0; i < mA.length; i++) {
        if (mA[i].length !== size || mB.length !== size) {
            check = true
            break
        }
    }
    if (!check) {
        for (let i = 0; i < size; i++) {
            mA[i].push(mB[i])
        }
        const x = rref(mA)
        for (let i = 0; i < x.length; i++) {
            let data = round(x[i][x.length])
            result.push(data)
        }
        res.json({ data: result })
    }
}
export const Gauss_J = (req, res) => {
    const { A, B } = req.body
    let maA = CvS(A)
    let maB = CvS(B)
    const mA = JSON.parse(maA)
    const mB = JSON.parse(maB)
    let result = round(linSystem.solve(mA, mB))
    res.json({
        data: result,
    })
}
export const Jacobi = (req, res) => {
    const { A, B, x0, error } = req.body
    let maA = CvS(A)
    let maB = CvS(B)
    const mA = JSON.parse(maA)
    const mB = JSON.parse(maB)
    let size = mA.length
    let Or = JSON.parse(x0)
    let x = JSON.parse(x0)
    let err
    if (error === null || error === '') {
        err = 0.000001
    } else {
        err = parseFloat(error)
    }
    let rap = 0
    let ch = false
    const er = new Array(size)
    const fx = (e) => {
        let stop = false
        for (let i = 0; i < size; i++) {
            stop = stop || er[i] > err
        }
        return stop
    }
    do {
        Or = JSON.parse(JSON.stringify(x))
        for (let i = 0; i < size; i++) {
            let d = JSON.parse(JSON.stringify(mB[i]))
            let temp = d
            for (let j = 0; j < size; j++) {
                if (i === j) {
                    continue
                }
                temp = temp - mA[i][j] * Or[j]
            }
            temp = temp / mA[i][i]
            x[i] = temp
            er[i] = Math.abs((x[i] - Or[i]) / x[i])
        }
        rap++
        if (rap === 200) {
            x = null
            ch = true
            break
        }
    } while (fx(er))
    if (!ch) {
        x = round(x)
    }
    res.json({ data: x })
}
export const Gauss_S = (req, res) => {
    const { A, B, x0, error } = req.body
    let maA = CvS(A)
    let maB = CvS(B)
    const mA = JSON.parse(maA)
    const mB = JSON.parse(maB)
    let size = mA.length
    let Or = JSON.parse(x0)
    let x = JSON.parse(x0)
    let err
    if (error === null || error === '') {
        err = 0.000001
    } else {
        err = parseFloat(error)
    }
    let rap = 0
    let ch = false
    const er = new Array(size)
    const fx = (e) => {
        let stop = false
        for (let i = 0; i < size; i++) {
            stop = stop || er[i] > err
        }
        return stop
    }
    do {
        Or = JSON.parse(JSON.stringify(x))
        for (let i = 0; i < size; i++) {
            let d = JSON.parse(JSON.stringify(mB[i]))
            let temp = d
            for (let j = 0; j < size; j++) {
                if (i === j) {
                    continue
                }
                temp = temp - mA[i][j] * x[j]
            }
            temp = temp / mA[i][i]
            x[i] = temp
            er[i] = Math.abs((x[i] - Or[i]) / x[i])
        }
        rap++
        if (rap === 200) {
            x = null
            ch = true
            break
        }
    } while (fx(er))
    if (!ch) {
        x = round(x)
    }
    res.json({ data: x })
}
export const Conjugate = (req, res) => {
    const { A, B, x0 } = req.body
    let maA = CvS(A)
    let maB = CvS(B)
    let mA = JSON.parse(maA)
    let mB = JSON.parse(maB)
    let mo = JSON.parse(maA)
    let check = true
    let posi = []
    if (JSON.stringify(mA) != JSON.stringify(transpose(mA))) {
        mB = multiply(transpose(mA), mB)
        mA = multiply(transpose(mA), mA)
    }
    for (let i = 0; i < mA.length; i++) {
        let t = []
        for (let j = 0; j <= i; j++) {
            let q = []
            for (let k = 0; k <= i; k++) {
                q.push(mA[j][k])
            }
            t.push(q)
        }
        posi.push({ t: t, det: det(t) })
        if (det(t) < 0) {
            check = false
            break
        }
    }
    if (check) {
        let MatA = fromDense(mA)
        let xi = JSON.parse(x0)
        let result = pcg(MatA, mB, xi, 1e-5, 100)
        res.json({
            data: round(result),
            posi: posi,
            last: round(multiply(multiply(inv(transpose(mo)), mA),result),1),
        })
    } else {
        res.json({})
    }
}