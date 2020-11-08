require('should');
const controller = require("../controllers/controller");

describe('controller test - promise', function () {
    it('getBeskeder() test', async () => {
        let beskeder = await controller.getBeskeder();
        beskeder.length.should.be.greaterThanOrEqual(2);
        beskeder[0].navn.should.be.equal('Ida');
        beskeder[1].navn.should.be.equal('Ida');
    });
});