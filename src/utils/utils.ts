export const generateSecretString = (value: string): string => {
    let itr = value.length > 10 ? 4 : 2
    let randomChar = ''

    for (let i = 0; i < itr; i++) {
        randomChar += value.replaceAll(/\s/g,'').charAt(Math.floor(Math.random() * value.length));
    }

    let result = value
    Array.from(randomChar).map((char) => {
        result = result.replaceAll(char, '_')
        return null
    })

    console.log(`%c Answer: "${value}"`, 'background: blue; color: lightgreen')
    return result
}
