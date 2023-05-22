import mongoose from 'mongoose';

const cartSchema = mongoose.Schema({
  first_name: String,
  last_name: String,
  cartProducts: [
    { product: { type: mongoose.Schema.Types.ObjectId, ref: 'product' }, qty: Number },
  ],
});

cartSchema.pre('findOne', function () {
  this.populate('cartProducts.product');
});

const cartModel = mongoose.model('cart', cartSchema);

export default cartModel;
