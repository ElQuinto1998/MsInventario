process.env.NODE_ENV = 'test';

let Medicamento = require('../src/model/medicamento/Medicamento');
let Proveedor = require('../src/model/proveedor/Proveedor');
let Categoria = require('../src/model/agregados/categoria/Categoria');

let chai = require('chai');
let chaiHttp = require('chai-http');
let sinon = require('sinon');
let http = require('http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

let token = "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjU0ODZkYTNlMWJmMjA5YzZmNzU2MjlkMWQ4MzRmNzEwY2EzMDlkNTAiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcHJ1ZWJhLWMwYTkwIiwiYXVkIjoicHJ1ZWJhLWMwYTkwIiwiYXV0aF90aW1lIjoxNTY4MDQ4NTE1LCJ1c2VyX2lkIjoiSU5ScmhoM3NHY2JzdUp1SWNENkdkSExrTzZzMiIsInN1YiI6IklOUnJoaDNzR2Nic3VKdUljRDZHZEhMa082czIiLCJpYXQiOjE1NjgwNTkwODIsImV4cCI6MTU2ODA2MjY4MiwiZW1haWwiOiJhbnF1aW50b0B1bmFjLmVkdS5jbyIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImFucXVpbnRvQHVuYWMuZWR1LmNvIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.Te8O18j6byD1vdPKgJlHzkIfWMpqxodPmOnOF3C9G-Y4_kw8zbwPfxQHQRgFP8DTkY-gM5E7FlNukrx8_q7JxWdaBooQwI7TlAessfWIKeEnp56mTmgxK9Z0QEOaUEtkRinI4v-7Vz33d1FecrYsSNYIRM9JAWfwnSWePecsGFFp3WgFjy-tL_V9KMIXQhIQI1FjOjwmj7OOkE7NHmLDFr9Zf4h2CtrpeH85zhFno90F5bEp9gM1w1sGJtVdkBaaiMkDJocByqk-EhYshkvL0ojKpzyj1xQDU146HQf6NP7dUhEuR_2vb60zVCXbh1UgWLtAL6LOHv-fj6ds8ElseQ";
let proveedor = new Proveedor("1", "Andres", "234445", "proveedor@dvdv", "Cra 23");
let categoria = new Categoria("1", "Receta medica");
let medicamento = new Medicamento("234", "Ibuprofeno2", 345, 766, 45, "Cajas", "imagen", proveedor, categoria);
let medicamentoUpdate = new Medicamento("234", "Ibuprofeno2", 567, 766, 45, "Cajas", "imagen", proveedor, categoria);
let codigo = "234";
let codigoNoFound = "645";
let codigoEliminar = "12345";

describe('Api Inventario - Medicamentos', () => {

    it('it should GET status 401 Unauthorized', (done) => {
        chai.request(server)
            .get('/api_inventario/medicamentos')
            .end((err, res) => {
                res.should.have.status(401);
                res.text.should.be.eq("No esta autorizado");
                done();
            });

    });

    // it('it should GET all medicaments', (done) => {
    //     chai.request(server)
    //         .get('/api_inventario/medicamentos')
    //         .set({ Authorization: token })
    //         .end((err, res) => {
    //             res.should.have.status(200);
    //             res.body.should.be.a("object");
    //             done();
    //         });
    // });


    it('it should GET status 401 Unauthorized', (done) => {
        chai.request(server)
            .get('/api_inventario/medicamentos/' + codigo)
            .end((err, res) => {
                res.should.have.status(401);
                res.text.should.be.eq("No esta autorizado");
                done();
            });

    });

    // it('it should GET medicament by code', (done) => {
    //     chai.request(server)
    //         .get('/api_inventario/medicamentos/'+codigo)
    //         .set({ Authorization: token })
    //         .end((err, res) => {
    //             res.should.have.status(200);
    //             res.body.should.be.a("object");
    //             done();
    //         });
    // });

    // it('it should GET medicament not found', (done) => {
    //     chai.request(server)
    //         .get('/api_inventario/medicamentos/'+codigoNoFound)
    //         .set({ Authorization: token })
    //         .end((err, res) => {
    //             res.should.have.status(200);
    //             res.text.should.be.eq("No se encontró el medicamento");
    //             done();
    //         });
    // });


    it('it should GET status 401 Unauthorized', (done) => {
        chai.request(server)
            .post('/api_inventario/medicamentos/guardar')
            .send(medicamento)
            .end((err, res) => {
                res.should.have.status(401);
                res.text.should.be.eq("No esta autorizado");
                done();
            });

    });

    // it('it should POST a medicament', (done) => {
    //     chai.request(server)
    //         .post('/api_inventario/medicamentos/guardar')
    //         .send(medicamento)
    //         .set({ Authorization: token })
    //         .end((err, res) => {
    //             res.should.have.status(200);
    //             res.text.should.be.eq("Medicamento guardado exitosamente");
    //             done();
    //         });
    // });


    it('it should GET status 401 Unauthorized', (done) => {
        chai.request(server)
            .post('/api_inventario/medicamentos/actualizar')
            .send(medicamentoUpdate)
            .end((err, res) => {
                res.should.have.status(401);
                res.text.should.be.eq("No esta autorizado");
                done();
            });
    });
    // it('it should UPDATE medicament', (done) => {
    //     chai.request(server)
    //         .post('/api_inventario/medicamentos/actualizar')
    //         .send(medicamentoUpdate)
    //         .set({ Authorization: token })
    //         .end((err, res) => {
    //             res.should.have.status(200);
    //             res.text.should.be.eq("Medicamento actualizado exitosamente");
    //             done();
    //         });
    // });




    it('it should GET status 401 Unauthorized', (done) => {
        chai.request(server)
            .post('/api_inventario/medicamentos/eliminar/'+codigoEliminar)
            .end((err, res) => {
                res.should.have.status(401);
                res.text.should.be.eq("No esta autorizado");
                done();
            });

    it('it should DELETE a medicament by code', (done) => {
        chai.request(server)
            .post('/api_inventario/medicamentos/eliminar/'+codigoEliminar)
            .set({ Authorization: token })
            .end((err, res) => {
                res.should.have.status(200);
                res.text.should.be.eq("Medicamento eliminado exitosamente");
                done();
            });
    });


})
});

