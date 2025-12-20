import Shop from "../models/shop.model.js";
import uploadOnCloudinary from "../utils/cloudinary.js";

// funtion to create or edit shop
export const createEditShop = async (req, res) => {
  try {
    //fetch data
    const { name, city, state, address } = req.body;
    //took file from frontend
    let image;

    //took file url from cloudinary
    if (req.file) {
      console.log(req.file);
      image = await uploadOnCloudinary(req.file.path);
    }

    //find if shop exists or not of user
    let shop = await Shop.findOne({ owner: req.userId });

    //if shop does not  exists for this user 
    if ( !shop ) {
      shop = await Shop.create({
        name,
        city,
        state,
        address,
        image,
        owner: req.userId,
      });
    } else {
      shop = await Shop.findByIdAndUpdate(
        shop._id,
        {
          name,
          city,
          state,
          address,
          image,
          owner: req.userId,
        },
        { new: true }
      );
    }

    await shop.populate("owner items");
    //response
    return res.status(201).json(shop);
  } catch (error) {
    return res.status(500).json({ message: `create shop error ${error}` });
  }
};
