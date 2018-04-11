
const moment = require('moment');
const faker = require('faker');


const Helper = {

    getDate() {
        return moment.utc().format("YYYY/MM/DD HH:mm:ss");
    },

    getTps() {
        let num = faker.random.number({
            'min': 700,
            'max': 1100
        });
        return num
    }

};


module.exports = Helper;

