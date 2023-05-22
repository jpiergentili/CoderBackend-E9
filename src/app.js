import express from 'express'
import mongoose from 'mongoose'
import handlebars from 'express-handlebars'
import viewsRouter from './routes/views.router.js'
import cartsRouter from './routes/carts.router.js'
import productModel from './models/products.models.js'

const uri = 'mongodb+srv://javypier1:Q1w2e3r4@jp-backend-coder01.bavi18s.mongodb.net/'

const app = express();
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//configuracion del motor de plantillas
app.engine('handlebars', handlebars.engine())
app.set('views', './src/views')
app.set('view engine', 'handlebars')

//configuracion de la carpeta publica
app.use(express.static('./src/public'))

app.use('/products', viewsRouter);
app.use('/carts', cartsRouter);

mongoose.set('strictQuery', false)

try{
    await mongoose.connect(uri, {
        dbName: 'entrega9backend'
    })
    console.log('DB connected!')

} catch (error) {
    console.log("No se pudo conectar con la base de datos!!");
}

app.listen(8080, () => console.log('Server UP'))