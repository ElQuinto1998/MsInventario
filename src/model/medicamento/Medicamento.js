module.exports = class Medicamento {
    constructor(codigo, nombre, precioCompra, precioVenta, stock, unidad, imagen, proveedor){
        this.codigo = codigo;
        this.nombre = nombre;
        this.precioCompra = precioCompra;
        this.precioVenta = precioVenta;
        this.stock = stock;
        this.unidad = unidad;
        this.imagen = imagen;
        this.proveedor = proveedor;
    }
};

