import Spline from 'cubic-spline'
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

export const Newton = (req, res) => {
    const { matA, matB, v } = req.body
    let maA = CvS(matA)
    const mA = JSON.parse(maA)
    const mB = JSON.parse(matB)
    const value = JSON.parse(v)
    let fx = [],
        x = []
    const makeeq = (input) => {
        (fx = []), (x = [])
        // input = input.map((value) => value - 1)
       
        input.map((value) => {
            x.push(mA[value][0])
            fx.push(mA[value][1])
        })
    }
    makeeq(mB)
    const Equation = (i, j) => {
        if (i == j) {
            return fx[i]
        } else if (Math.abs(j - i) == 1) {
            return (fx[j] - fx[i]) / (x[j] - x[i])
        } else {
            return (Equation(i + 1, j) - Equation(i, j - 1)) / (x[j] - x[i])
        }
    }
    const Result = (find) => {
        var sum = 0
        for (let i = 0; i < x.length; i++) {
            let temp = Equation(0, i)
            for (let j = 0; j < i; j++) {
                temp *= find - x[j]
            }
            sum += temp
        }
        return sum
    }
    res.json({
        data: Result(value),
    })
}
export const Langrange = (req, res) => {
    const { matA, v, matB } = req.body
    let maA = CvS(matA)
    let data = JSON.parse(maA)
    let want = JSON.parse(v)
    let mA = JSON.parse(matB)
    mA = mA.map((r) => r + 1)
    const memdiv = []
    let result = 0,
        mul = 0,
        div = 0,
        L = 1
    const RangeEqWa = []
    for (let i = 0; i < data.length; i++) {
        let sub = []
        for (let j = 0; j < data.length; j++) {
            sub.push(data[j][0] - data[i][0])
        }
        memdiv.push(sub)
        RangeEqWa.push(data[i][0] - want)
    }
    for (let i = 0; i < mA.length; i++) {
        for (let j = 0; j < mA.length; j++) {
            if (j === i) {
                continue
            }
            mul = RangeEqWa[mA[j]-1]
            div = memdiv[mA[i]-1][mA[j]-1]
            L = L * (mul / div)
        }
        result += L * data[mA[i]-1][1]
        L = 1
    }
    res.json({
        data: result,
    })
}
export const spline1 = (req, res) => {
    const { matA, p } = req.body
    let A = JSON.parse(CvS(matA))
    const mA = A.map((r) => r[0])
    const mB = A.map((r) => r[1])
    let points = JSON.parse(p)
    console.log(points)
    // points = points.map((r) => r - 1)
    let result = []
    const spline = new Spline(mA, mB)
    points.map((r) => result.push(spline.at(r)))
    
    res.json({
        data: result,
    })
}