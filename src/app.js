import express from 'express'
import mongoose from 'mongoose'
import handlebars from 'express-handlebars'
import viewsRouter from './routes/views.router.js'
import cartsRouter from './routes/carts.router.js'
import cartModel from './models/cart.models.js'

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


/* await cartModel.create({
    first_name: 'Luisina',
    last_name: 'Vergara',
    cartProducts: [
      { product: '646947fa7485490070fda7e4', qty: 3 },
    ],
}); */

const cart = await cartModel.findOne({ _id: '646adb45fab3b6b69a5fa45b' });
console.log(JSON.stringify(cart, null, '\t'));

app.listen(8080, () => console.log('Server UP'))