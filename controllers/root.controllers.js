import { derivative, simplify, evaluate } from 'mathjs'
/**
 *
 * @param {'express'} req
 * @param {'express'} res
 */
export const Bisection = (req, res) => {
    const { eq, L, R, error } = req.body
    let xl = parseFloat(L)
    let xr = parseFloat(R)
    let er = 10
    let err
    if (error === null || error === '') {
        err = 0.000001
    } else {
        err = parseFloat(error)
    }
    let xm
    let fx = (x) => {
        let equation = simplify(eq).toString()
        return evaluate(equation, { x })
    }
    let ite = []
    let it = 0
    while (er > err) {
        xm = (xr + xl) / 2
        
        it++
        if (fx(xm) * fx(xr) > 0) {
            er = Math.abs((xm - xr) / xm)
            xr = xm
        } else {
            er = Math.abs((xm - xl) / xm)
            xl = xm
        }
        ite.push({ it, xl, xr, xm, er, prot: fx(xm), p: xm })
    }
    res.json({
        answer: xm,
        data: ite,
    })
}
export const FalsePosition = (req, res) => {
    const { eq, L, R, error } = req.body
    let xl = parseFloat(L)
    let xr = parseFloat(R)
    let er = 10
    let err = parseFloat(error)
    
    let x1
    let ind = 0
    let f = (x) => {
        let equation = simplify(eq).toString()
        return evaluate(equation, { x })
    }
    let ite = []
    while (er > err) {
        x1 = (xl * f(xr) - xr * f(xl)) / (f(xr) - f(xl))
        
        ind++
        if (f(x1) * f(xr) < 0) {
            er = Math.abs((x1 - xr) / x1)
            ite.push({ ind, xl, xr, x1, er, prot: f(x1), p: x1 })
            xr = x1
        } else {
            er = Math.abs((x1 - xl) / x1)
            ite.push({ ind, xl, xr, x1, er, prot: f(x1), p: x1 })
            xl = x1
        }
       
    }
    res.json({
        answer: x1,
        data: ite,
    })
}
export const OnePoint = (req, res) => {
    const { eq, start, error } = req.body
    let fx = (x) => {
        let equation = simplify(eq).toString()
        return evaluate(equation, { x })
    }
    let er = 10
    let err = parseFloat(error)
    let x = parseFloat(start)
    let xi = x
    let check = false
    let ite = []
    let it = 0
    console.log(start)
    while (er > err) {
        xi = fx(xi)
        er = Math.abs((xi - x) / xi)
        it++
        ite.push({ it, xi, x, er, prot: fx(xi), p: xi })
        x = xi
    }
    if (fx(x) - x < 0.000001) {
        check = true
    }
    res.json({
        answer: x,
        data: ite,
        check: check,
    })
}
export const NewtonRap = (req, res) => {
    const { eq, start, error } = req.body
    let xi = parseFloat(start)
    let err = parseFloat(error)
    let f1 = (x) => {
        let equation = simplify(eq).toString()
        return evaluate(equation, { x })
    }
    let f2 = (x) => {
        let diff = derivative(eq, 'x').toString()
        diff = simplify(diff).toString()
        return evaluate(diff, { x })
    }
    let er = 10
    let cal = 0
    let i = 1
    let ite = []
    while (er > err) {
        cal = xi
        xi = xi - f1(xi) / f2(xi)
        let c1 = f1(xi)
        let c2 = f2(xi)
        er = Math.abs((xi - cal) / xi)
        ite.push({ i, xi, c1, c2, er, prot: cal, p: xi })
        i++
        
    }
    res.json({
        answer: xi,
        data: ite,
    })
}
export const Secant = (req, res) => {
    const { eq, start,nd, error } = req.body
    let x0 = parseFloat(start)
    let x1 = parseFloat(nd)
    
    let err = parseFloat(error)
    let fx = (x) => {
        let equation = simplify(eq).toString()
        return evaluate(equation, { x })
    }
    let x,y
    let cx = (x, y) => {
        return fx(x) - fx(y)
    }
    let er = 10

    let i = 1
    let ite = []
    while (er > err) {
        x = x1 - (fx(x1) * (x1 - x0)) / cx(x1, x0)
        er = Math.abs((x - x1) / x)
        ite.push({ i,x, x0,x1, er, prot: x, p: fx(x0) })
        i++
        x0 = x1
        x1 = x
        
    }
    res.json({
        answer: x,
        data: ite,
    })
}