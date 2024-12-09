const headerDB = require('../../model/customer/headerDB');

const layout = './customer/layoutCustomer';
let getHeader = (req, res) => {
    headerDB.getHeader((data) => {
        return data
    })
}

module.exports = {
    getHeader
}