const fs = require('fs');

const readFile = () => {
    try {
        return fs.readFileSync('jwt.evaluation.key', 'utf-8');
    } catch (error) {
        console.log(error);
    }
};

module.exports = { readFile };