let request = require('superagent')
const proxysData = require('./proxyData.js')
require('superagent-proxy')(request)


let errorCount = 0
let count = 0

// const readUrl = 'https://ubc-api-ms.juejin.im/v1/punch?sub_location=5bd67cb85188252919783984&location=post&suid=nfyRua27m7FMENNEyMMY&src=juejin.im'
const readUrl = 'https://ubc-api-ms.juejin.im/v1/punch?uid=5b4b1f1c6fb9a04fa91bdf32&sub_location=5bd67cb85188252919783984&location=post&suid=MfyIuA6ReZzE6QYfqUBr&src=juejin.im'
startRead()


function startRead() {

  let data = getDataIndex()
  console.log()
  data.forEach((proxy) => {
    read(proxy)
  })

  setTimeout(() => {
    startRead()
  }, random(60, 100) * 1000)
}

function read(proxy) {
  request
    .get(readUrl)
    .proxy(proxy)
    .end((err, res) => {
      if (err) {
        errorCount += 1
        console.log('出现错误', proxy)
        console.log(`错误次数${errorCount}`)
      } else {
        if (res.status == 200) {
          count += 1
          console.clear()
          console.log(`错误次数${errorCount}`)
          console.log(`已增加 ${count} 次`)
        }
      }

    })
}

function random(minNum, maxNum) {
  switch (arguments.length) {
    case 1:
      return parseInt(Math.random() * minNum + 1, 10);
      break;
    case 2:
      return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
      break;
    default:
      return 0;
      break;
  }
}

function getDataIndex() {
  let len = random(30, 50)
  let arr = []
  for (let i = 0; i < len; i++) {
    arr.push(noRepeat())
  }


  function noRepeat() {
    let proxy = proxysData[random(0, proxysData.length - 1)]

    return arr.includes(proxy) ? noRepeat() : proxy
  }

  return arr
}

function randomNum(minNum, maxNum) {
  switch (arguments.length) {
    case 1:
      return;
    case 2:
      return;
    default:
      return 0;
  }
}


