/** https://stackoverflow.com/questions/5259421/cumulative-distribution-function-in-javascript/41635947#41635947 */
export const standardNormalDistribution = (z: number) => {
    let k, m, values, total, item, z2, z4, a, b

    // Power series is not stable at these extreme tail scenarios
    if (z < -6) {
        return 0
    }
    if (z > 6) {
        return 1
    }

    m = 1 // m(k) == (2**k)/factorial(k)
    b = z // b(k) == z ** (2*k + 1)
    z2 = z * z // cache of z squared
    z4 = z2 * z2 // cache of z to the 4th

    values = []

    // Compute the power series in groups of two terms.
    // This reduces floating point errors because the series
    // alternates between positive and negative.
    for (k = 0; k < 100; k += 2) {
        a = 2 * k + 1
        item = b / (a * m)
        item *= 1 - (a * z2) / ((a + 1) * (a + 2))
        values.push(item)
        m *= 4 * (k + 1) * (k + 2)
        b *= z4
    }

    // Add the smallest terms to the total first that
    // way we minimize the floating point errors.
    total = 0
    for (k = 49; k >= 0; k--) {
        total += values[k]
    }

    // Multiply total by 1/sqrt(2*PI)
    // Then add 0.5 so that stdNormal(0) === 0.5
    return 0.5 + 0.3989422804014327 * total
}

export const mean = (set: number[]) => {
    let total = 0

    set.forEach((x) => {
        total += x
    })

    return total / set.length
}

export const shortNumberDenomination = (n: number | string, d: number) => {
    d = Math.pow(10, d)
    let abbrev = ['k', 'm', 'b', 't']
    for (let i = abbrev.length - 1; i >= 0; i--) {
        let size = Math.pow(10, (i + 1) * 3)
        if (size <= n) {
            n = Math.round(((n as number) * d) / size) / d
            if (n == 1000 && i < abbrev.length - 1) {
                n = 1
                i++
            }
            ;(n as unknown as string) += abbrev[i]
            break
        }
    }

    return n
}
