module.exports = class Venta {
    constructor(codigoTransaccion, fecha, medicamentosVendidos, total, cliente){
        this.codigoTransaccion = codigoTransaccion;
        this.fecha = fecha;
        this.medicamentosVendidos = medicamentosVendidos;
        this.total = total;
        this.cliente = cliente;
    }
};
