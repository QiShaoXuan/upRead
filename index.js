let getIps = require('./getIps')
let getIps2 = require('./getIps2')
let request = require('superagent')

require('superagent-proxy')(request)
const fs = require('fs')

let avilableProxy = []

let errorCount = 0
let count = 0
let ipPage = 1
const readUrl = 'https://ubc-api-ms.juejin.im/v1/punch?sub_location=5bd67cb85188252919783984&location=post&suid=nfyRua27m7FMENNEyMMY&src=juejin.im'

startRead()

function startRead() {
  // ipPage = ipPage > 10 ? 1 : ipPage
  // getIps(ipPage).then((proxys) => {
  //   proxys.forEach((proxy) => {
  //     read(proxy)
  //   })
  //
  //   ipPage += 1
  // })

  getIps2().then(proxys => {
    proxys.forEach(proxy => {
      read(proxy)
    })
  })

  if (count < 500) {
    setTimeout(() => {
      startRead()
    }, random(10, 30) * 1000)
  }
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
          avilableProxy.push(proxy)
          write(JSON.stringify(avilableProxy))
        }
      }
    });
}

function write(json) {
  fs.writeFile('./proxy.js', json, (err) => {
    if (err) throw err;
    console.log('可用IP已保存');
  });
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


