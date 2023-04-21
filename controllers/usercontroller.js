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
const getproducts = async (req, res) => {
  try {
    const resu = await product.find();
    res.status(200).send(resu);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
const getproduct = async (req, res) => {
  try {
    if(req.params.slug)
    {const resu = await product.find({slug:req.params.slug}); 
    if(resu.length>0)
    res.status(200).send(resu);
    else
    res.status(404).send({message:'Product was not found'})
  }
  } catch (error) {
    res.status(400).send(error.message);
  }
};
module.exports = { getproducts,getproduct };
