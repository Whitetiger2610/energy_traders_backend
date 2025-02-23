const request = require("supertest");
const server = require("../index");
const jwt = require("jsonwebtoken");

const SECRET_KEY = "az-AZ";

// Token genérico válido para pruebas
const tokenTest = "Bearer " + jwt.sign(
    { email: "test@example.com"}, 
    SECRET_KEY,
    { expiresIn: "7d" } 
);

console.log("🔹 Token de prueba generado:", tokenTest);

describe("Operaciones CRUD de productos", () => {

    afterAll((done) => {
    server.close(done); 
    }) 

    it("Obteniendo un 200 y Obteniendo productos en un arreglo", async () => {
        const response = await request(server).get("/productos").send();
        const status = response.statusCode;
        expect(status).toBe(200);
        const productos = response.body;
        expect(productos).toBeInstanceOf(Array);
    });
    
    it("Eliminando un producto que no existe", async () => {
        const idDeProductoAEliminar = Math.floor(Math.random() * 999);
        const response = await request(server)
            .delete(`/productos/${idDeProductoAEliminar}`)
            .set("Authorization", tokenTest)
            .send();
            console.log("🔹 Respuesta DELETE:", response.statusCode, response.body);
        expect(response.statusCode).toBe(404)  
    });

    it("Agregando un nuevo producto", async () => {
        const producto = {
              codigo: "Codigo x",
              nombre: "Nuevo Producto",
              marca:"Marca x",
              precio:1000,
              stock: 100,
              imagen1:"imagen 1",
              imagen2: "imagen 2",
              descripcion:"descripcion nueva"
        };
        const response = await request(server)
            .post("/productos")
            .set("Authorization", tokenTest)
            .send(producto);
            console.log("🔹 Respuesta del backend en POST /productos:", response.statusCode, response.body);
            expect([200, 201]).toContain(response.statusCode);
    });

    it("Editando un producto existente", async () => {
        const { body: productos } = await request(server).get("/productos");
        const idExistente = productos.length ? productos[0].id : "id_invalido";

        const producto = { 
          codigo: "Codigo x", 
          nombre: "Nuevo Producto",
          marca:"Marca x", 
          precio:1000,
          stock: 100, 
          imagen1:"imagen 1", 
          imagen2: "imagen 2", 
          descripcion:"descripcion nueva"
        };

        const response = await request(server)
            .put(`/productos/${idExistente}`)
            .set("Authorization",tokenTest)
            .send(producto);
            console.log("🔹 Respuesta de /productos/:id (PUT):", response.statusCode, response.body);
        expect(response.statusCode).toBe(200);
    });


})
