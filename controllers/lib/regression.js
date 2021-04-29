function regression(datas) {
    // f(x_0, x_1 ... x_n) = const + (a_0)(x_0) + (a_1)(x_1) + ... + (a_n)(x_n);

    const coefficientses = []
    const constants = []
    const datasNumber = datas.length
    const varNumber = datas[0].length - 1

    {
        //const
        const coefficients = [datas.length]
        for (let n = 0; n < varNumber; n++) {
            let sum = 0
            for (let j = 0; j < datasNumber; j++) {
                sum += datas[j][n]
            }
            coefficients.push(sum)
        }
        coefficientses.push(coefficients)

        let constant = 0
        for (let j = 0; j < datasNumber; j++) {
            constant += datas[j][varNumber]
        }
        constants.push(constant)
    }

    {
        //a_0, a_1 ...
        for (let z = 0; z < varNumber; z++) {
            //a_z
            const coefficients = []

            let a_0 = 0
            for (let j = 0; j < datasNumber; j++) {
                a_0 += datas[j][z]
            }
            coefficients.push(a_0)

            for (let n = 0; n < varNumber; n++) {
                let sum = 0
                for (let j = 0; j < datasNumber; j++) {
                    sum += datas[j][z] * datas[j][n]
                }
                coefficients.push(sum)
            }
            coefficientses.push(coefficients)

            let constant = 0
            for (let j = 0; j < datasNumber; j++) {
                constant += datas[j][varNumber] * datas[j][z]
            }
            constants.push(constant)
        }
    }

    //gauss
    for (let i = 0; i <= varNumber; i++) {
        const coefficients = coefficientses[i]

        const divideBy = coefficients[i]
        for (let j = 0; j <= varNumber; j++) {
            coefficients[j] /= divideBy
        }
        constants[i] /= divideBy

        for (let j = 0; j < i; j++) {
            const coefficients_j = coefficientses[j]

            const multiplyBy = coefficients_j[i]
            for (let k = 0; k <= varNumber; k++) {
                coefficients_j[k] -= coefficients[k] * multiplyBy
            }
            constants[j] -= constants[i] * multiplyBy
        }
        for (let j = i + 1; j <= varNumber; j++) {
            const coefficients_j = coefficientses[j]

            const multiplyBy = coefficients_j[i]
            for (let k = 0; k <= varNumber; k++) {
                coefficients_j[k] -= coefficients[k] * multiplyBy
            }
            constants[j] -= constants[i] * multiplyBy
        }
    }

    return constants
}

export default regression