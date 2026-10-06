export function cosineSimilarity(a: number[], b: number[]): number {

    if(a.length !== b.length) throw new Error("Vectors must have thee same dimenstions");

    let dotProd = 0;
    let magA = 0;
    let magB = 0;

    for(let i=0; i<a.length; i++){
        dotProd += a[i] * b[i];
        magA += a[i] * a[i];
        magB += b[i] * b[i];
    }

    const denominator = Math.sqrt(magA) * Math.sqrt(magB);

    if(denominator === 0) throw new Error("Cannot calculate similarity for a zero vector");

    return dotProd/denominator;
}