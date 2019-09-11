module.exports = class Medicamento {
    constructor(codigo, nombre, precioCompra, precioVenta, existencias, unidad, imagen, proveedor, categoria, puntoDistribucion){
        this.codigo = codigo;
        this.nombre = nombre;
        this.precioCompra = precioCompra;
        this.precioVenta = precioVenta;
        this.existencias = existencias;
        this.unidad = unidad;
        this.imagen = imagen;
        this.proveedor = proveedor;
        this.categoria = categoria;
        this.puntoDistribucion = puntoDistribucion;
    }
};

