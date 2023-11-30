import express from "express";
import productsRoute from './Routes/productsRoute.js';
import cartRoute from './Routes/cartRoute.js'


const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static("public"));

app.get("/", (req, res)=>{
    res.send(`
    ¡Bienvenidos!
        Ver listado de productos <a href="/productos"> Productos </a>
        Ver lista de 3 productos <a href="/productos?limit=3"> Ver </a>
        Ver lista de 7 productos <a href="/productos?limit=7"> Ver </a>
        Ver unicamente el producto con id 6 <a href="/productos/6"> Ver </a>
        Ver unicamente el producto con id 1 <a href="/productos/1"> Ver </a>
    `)
});

app.use('/productos', productsRoute);
app.use('/cart', cartRoute);

app.listen(PORT, ()=> console.log(`Server is running at http://localhost:${PORT}`));