const http = require('http')
const cheerio = require('cheerio')

const url = 'http://www.66ip.cn/mo.php?sxb=&tqsl=100&port=&export=&ktip=&sxa=%B5%E7%D0%C5&submit=%CC%E1++%C8%A1&textarea=http%3A%2F%2Fwww.66ip.cn%2F%3Fsxb%3D%26tqsl%3D20%26ports%255B%255D2%3D%26ktip%3D%26sxa%3D%25B5%25E7%25D0%25C5%26radio%3Dradio%26submit%3D%25CC%25E1%2B%2B%25C8%25A1'

function getIps() {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      const {statusCode} = res

      if (statusCode !== 200) {
        reject('获取错误')
        res.resume()
        return
      }

      res.setEncoding('utf8')
      let html = ''
      res.on('data', (chunk) => {
        html += chunk
      })
      res.on('end', () => {
        resolve(getIpList(html))
      })
    }).on('error', (e) => {
      reject(`错误: ${e.message}`)
    })
  })
}

function getIpList(html) {
  let $ = cheerio.load(html)

  return $('body').text().split('\n').map(v=> v.replace(/\t/g,'')).filter(v=>v.replace(/ /g,'')).map((v) => `http://${v}`)
}

module.exports = getIps
