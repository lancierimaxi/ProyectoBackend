import fs from 'fs';

export class ProductManager{

    constructor(path){
        this.path = path;
        if(fs.existsSync(path)){
            try{
                const productos = fs.readFileSync(path, "utf-8");
                this.products = JSON.parse(productos)
            } catch ( error ){
                this.products=[]
            }
        } else {
            this.products= []
        }
    }

    async saveFile(){
        try{
            await fs.promises.writeFile(
                this.path,
                JSON.stringify(this.products, null, "\t")
            );
            return true
        } catch (error){
            console.log(error)
            return false
        }
    }

    mostrarProductos(){
        return this.products;
    }

    async addProduct(product){
        let maxId = 0;
        for(const prod of this.products){
            if(prod.id > maxId){
                maxId = prod.id;
            }
        }
        product.id = maxId + 1;

        const productos = this.products.find((prod)=>prod.code === product.code);

    if (productos){
        return console.log("[ERROR] Team code already exist");
    }
    this.products.push(product);
        const respuesta = await this.saveFile();

        if (respuesta){
            console.log("Producto creado");
        } else {
            console.log("Hubo un error al crear el producto");
        }
    }

    async deleteProduct(id){

        const productIndex = this.products.findIndex((prod)=> prod.id === id);

        if(productIndex === -1){
            console.log("El producto no existe");
            return;
        }

        this.products.splice(productIndex, 1);

        const success = await this.saveFile();

        if(success) {
            console.log("Producto eliminado con exito");
        } else {
            console.log("Hubo un error al eliminar el producto");
        }
    }
}

export class Productos {
    constructor(title, description, price, category, thumbnail, stock, code){
        this.title = title,
        this.description = description,
        this.price = price,
        this.category = category,
        this.thumbnail = thumbnail,
        this.stock = stock,
        this.code = code
    }
}

const cargarProduct = async ()=>{
    const manejadorDeProductos = new ProductManager("./Productos.json")

    await manejadorDeProductos.addProduct(new Productos("Laptop Gamer Alienware M15","Laptop gaming con procesador Intel Core i7, tarjeta gráfica NVIDIA", 1499.99,"Computacion", "imagen-url",20,"GAM001"));
    await manejadorDeProductos.addProduct(new Productos("Monitor Curvo Samsung Odyssey G7"," Monitor gaming curvo de 27 pulgadas",699.99,"Monitores","imagen-url",15,"MON002"));
    await manejadorDeProductos.addProduct(new Productos("Teclado Mecánico Corsair K95 RGB Platinum XT","Teclado mecánico gaming con interruptores Cherry MX, retroiluminación RGB personalizada",199.99,"Periféricos - Teclados","imagen-url", 30, "KEY003"));
    await manejadorDeProductos.addProduct(new Productos("Ratón Inalámbrico Logitech G Pro X Superlight","Raton",149.99,"Perifericos-Ratones","imagen-url",25,"RAT004"));
    await manejadorDeProductos.addProduct(new Productos("Auriculares con Micrófono HyperX Cloud II","Auriculares para gaming con sonido envolvente 7.1, almoha",99.99 ,"Audio-Auriculares","imagen-url",40 ,"AUR005"));
    await manejadorDeProductos.addProduct(new Productos("Disco Duro Externo WD Black P10","Disco duro externo de 2 TB para gaming, compatible", 89.99,"Almacenamiento-Discos duros externos","imagen-url",50,"HDD006"));
    await manejadorDeProductos.addProduct(new Productos("Tarjeta Gráfica ASUS ROG Strix RTX 3080","Tarjeta gráfica de alta gama con 10 GB de memoria GDDR6X, iluminación RGB y refrigeración avanzada. Ideal para gaming yd.",1199.99,"Componentes-Tarjetas Graficas","imagen-url",10,"GPU007"));
    await manejadorDeProductos.addProduct(new Productos("Memoria RAM Corsair Vengeance RGB Pro","Kit de memoria RAM DDR4 de 16 GB (2 x 8 GB) con iluminación RGB dinámica. Optimizado para un rendimiento excepcional",129.99, "Componentes-Memoria RAM","imagen-url",35,"RAM008"));
    await manejadorDeProductos.addProduct(new Productos("Impresora 3D Creality Ender 3 V2","Impresora 3D",269.99, "Impresora 3D","imagen-url",1,"3DPR009"));

    manejadorDeProductos.mostrarProductos();

}

cargarProduct()

export default {ProductManager, Productos}