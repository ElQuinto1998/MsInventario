process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../../server');
let should = require('chai').should();

chai.use(chaiHttp);

let token = "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjU0ODZkYTNlMWJmMjA5YzZmNzU2MjlkMWQ4MzRmNzEwY2EzMDlkNTAiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcHJ1ZWJhLWMwYTkwIiwiYXVkIjoicHJ1ZWJhLWMwYTkwIiwiYXV0aF90aW1lIjoxNTY4MDQ4NTE1LCJ1c2VyX2lkIjoiSU5ScmhoM3NHY2JzdUp1SWNENkdkSExrTzZzMiIsInN1YiI6IklOUnJoaDNzR2Nic3VKdUljRDZHZEhMa082czIiLCJpYXQiOjE1NjgwNTkwODIsImV4cCI6MTU2ODA2MjY4MiwiZW1haWwiOiJhbnF1aW50b0B1bmFjLmVkdS5jbyIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImFucXVpbnRvQHVuYWMuZWR1LmNvIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.Te8O18j6byD1vdPKgJlHzkIfWMpqxodPmOnOF3C9G-Y4_kw8zbwPfxQHQRgFP8DTkY-gM5E7FlNukrx8_q7JxWdaBooQwI7TlAessfWIKeEnp56mTmgxK9Z0QEOaUEtkRinI4v-7Vz33d1FecrYsSNYIRM9JAWfwnSWePecsGFFp3WgFjy-tL_V9KMIXQhIQI1FjOjwmj7OOkE7NHmLDFr9Zf4h2CtrpeH85zhFno90F5bEp9gM1w1sGJtVdkBaaiMkDJocByqk-EhYshkvL0ojKpzyj1xQDU146HQf6NP7dUhEuR_2vb60zVCXbh1UgWLtAL6LOHv-fj6ds8ElseQ";
let codigo = "234";
let codigoNoFound = "645";

describe('Api Inventario - Medicamentos', () => {


    it('it should GET all medicaments', (done) => {
        chai.request(server)
            .get('/api_inventario/medicamentos')
            .set({ Authorization: token })
            .end((err, res) => {
                res.body.should.be.a("array");
                done();
            });
    });


    it('it should GET medicament by code', (done) => {
        chai.request(server)
            .get('/api_inventario/medicamentos/'+codigo)
            .set({ Authorization: token })
            .end((err, res) => {
                res.body.should.be.a("object");
                done();
            });
    });

    it('it should GET medicament not found', (done) => {
        chai.request(server)
            .get('/api_inventario/medicamentos/'+codigoNoFound)
            .set({ Authorization: token })
            .end((err, res) => {
                res.text.should.be.eq("No se encontró el medicamento");
                done();
            });
    });

});

