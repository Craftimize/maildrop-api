const request = require('request')

var exports = module.exports = {}

const baseUrl = process.env.MAILDROP_URL || 'https://api.maildrop.cc/v2'

exports.getInbox = (mailBox) => {
    return new Promise((resolve, reject) => {
        if (!mailBox) return reject(new Error('mailBox required.'))

        let options = {
            method: 'GET',
            url: baseUrl + '/mailbox/' + mailBox,
            json: true,
            headers: { 'cache-control': 'no-cache' }
        }

        request(options, (error, response, body) => {
            if (error) return reject(error)
            return resolve(body)
        })
    })
}

exports.getEmail = (mailBox, emailId) => {
    return new Promise((resolve, reject) => {
        if (!(mailBox && emailId)) return reject(new Error('mailBox required.'))

        let options = {
            method: 'GET',
            url: baseUrl + '/mailbox/' + mailBox + '/' + emailId,
            json: true,
            headers: { 'cache-control': 'no-cache' }
        }

        request(options, (error, response, body) => {
            if (error) return reject(error)
            return resolve(body)
        })
    })
}

exports.deleteEmail = (mailBox, emailId) => {
    return new Promise((resolve, reject) => {
        if (!(mailBox && emailId)) {
            return reject(
                new Error('mailBox and emailId required.')
            )
        }

        let options = {
            method: 'DELETE',
            url: baseUrl + '/mailbox/' + mailBox + '/' + emailId,
            json: true,
            headers: { 'cache-control': 'no-cache' }
        }

        request(options, (error, response, body) => {
            if (error) return reject(error)
            return resolve(body)
        })
    })
}
