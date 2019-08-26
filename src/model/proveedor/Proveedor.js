module.exports = class Proveedor {
    constructor(idProveedor, nombre, telefono, correo, direccion){
        this.idProveedor = idProveedor;
        this.nombre = nombre;
        this.telefono = telefono;
        this.correo = correo;
        this.direccion = direccion;
    }
};
