module.exports = class RegistroMedicamento {
    constructor(codigoTransaccion, fecha, medicamento, tipo, cantidad, unidad){
        this.codigoTransaccion = codigoTransaccion;
        this.fecha = fecha;
        this.medicamento = medicamento;
        this.tipo = tipo;
        this.cantidad = cantidad;
        this.unidad = unidad;
    }
};
