// const superagent = require("superagent")
const http = require('http')
const cheerio = require('cheerio')
const ip_url = 'http://www.ip3366.net/?stype=1&page='

function getIps(page) {
  return new Promise((resolve, reject) => {
    http.get(`${ip_url}${page}`, (res) => {
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
  let ips = []
  let $ = cheerio.load(html)
  $('#list tbody tr').each((i, tr) => {
    let $tr = $(tr)
    let ip = $tr.find('td').eq(0).text()
    let port = $tr.find('td').eq(1).text()
    let http = $tr.find('td').eq(3).text()
    ips.push(`${http.toLowerCase()}://${ip}:${port}`)
  })
  return ips
}

module.exports = getIps
