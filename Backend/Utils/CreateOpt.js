length = 6
const number = "1234567890"
let a = ""

for (let index = 0; index < length; index++) {

    let i = Math.floor(Math.random() * number.length)
    a += number.charAt(i)


}
