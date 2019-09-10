process.env.NODE_ENV = 'test';

let Distribucion = require('../../../src/model/');

var sinon = require('sinon');
var chai = require('chai');
var expect = chai.expect;
let req = {};
let res = {};

beforeEach(() => {

    req = {
        body: {
            currentUser: {
                rol: {
                    id: "1",
                    nombre: "Administrador"
                }
            }
        }
    };

});

after(() => {

});

describe("GET Medicaments", () => {

    it("it should undefined", async () => {

        await controllerM.getMedicamentos(req, res)
            .then((re) => {
                console.log(re)
            });

    });
});

