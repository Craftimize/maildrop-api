/* eslint-env mocha */

const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const path = require('path')
const decache = require('decache')

const maildrop = require(path.join(__dirname, '..', 'src', 'maildrop'))

chai.use(chaiAsPromised)
chai.should()

const mailBox = 'john'

describe('getInbox(mailBox)', () => {
    it('should be fulfilled with an array without error', () => {
        return maildrop.getInbox(mailBox)
            .should.eventually.be.fulfilled.and.be.an('array')
    })
})

describe('getInbox()', () => {
    it('should be rejected with error', () => {
        return maildrop.getInbox()
            .should.eventually.be.rejected.and.be.an('error')
    })
})

describe('getEmail(mailBox, mailBox)', () => {
    it('should be fulfilled with an object without error', () => {
        return maildrop.getEmail(mailBox, mailBox)
            .should.eventually.be.fulfilled.and.be.an('object')
    })
})

describe('getEmail()', () => {
    it('should be rejected with error', () => {
        return maildrop.getEmail()
            .should.eventually.be.rejected.and.be.an('error')
    })
})

describe('deleteEmail(mailBox, mailBox)', () => {
    it('should be fulfilled with an object without error', () => {
        return maildrop.deleteEmail(mailBox, mailBox)
            .should.eventually.be.fulfilled.and.be.an('object')
    })
})

describe('deleteEmail()', () => {
    it('should be rejected with error', () => {
        return maildrop.deleteEmail()
            .should.eventually.be.rejected.and.be.an('error')
    })
})

// To test the error handling we shall set MAILDROP_URL env and re-require
// the maildrop module
process.env.MAILDROP_URL = 'http://localhost100'

decache(path.join(__dirname, '..', 'src', 'maildrop'))
const maildropError = require(path.join(__dirname, '..', 'src', 'maildrop'))

describe('getInbox(mailBox) - error handling', () => {
    it('should be rejected with error', () => {
        return maildropError.getInbox(mailBox)
            .should.eventually.be.rejected.and.be.an('error')
    })
})

describe('getEmail(mailBox, mailBox) - error handling', () => {
    it('should be rejected with error', () => {
        return maildropError.getEmail(mailBox, mailBox)
            .should.eventually.be.rejected.and.be.an('error')
    })
})

describe('deleteEmail(mailBox, mailBox) - error handling', () => {
    it('should be rejected with error', () => {
        return maildropError.deleteEmail(mailBox, mailBox)
            .should.eventually.be.rejected.and.be.an('error')
    })
})
