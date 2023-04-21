product = require('../models/product');
dotenv = require('dotenv');
dotenv.config();
const cloudinary = require('cloudinary');
dotenv.config();
cloudinary.config({
  cloud_name: process.env.Cloud_name,
  api_key: process.env.Api_key,
  api_secret: process.env.Api_secret,
});
const addproduct = async (req, res) => {
  try {
    const {
      name,
      slug,
      price,
      countinstock,
      rating,
      numReviews,
      brand,
      image,
      description,
    } = req.body;
    const img = await cloudinary.uploader.upload(image, {
      folder: 'images',
      resource_type: 'auto',
    });
    const resu = await product.create({
      name,
      slug,
      price,
      countinstock,
      rating,
      numReviews,
      brand,
      image: img?.secure_url,
      description,
    });
    res.status(200).send(resu);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
module.exports = { addproduct };
