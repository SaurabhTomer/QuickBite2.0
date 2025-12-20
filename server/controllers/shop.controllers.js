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
    if (!shop) {
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

//get my shop controller
export const getMyShop = async (req, res) => {
  try {
    const shop = await Shop.findOne({ owner: req.userId })
      .populate("owner")
      .populate({
        path: "items",
        options: { sort: { updatedAt: -1 } },
      });
    if (!shop) {
      return null;
    }
    return res.status(200).json(shop);
  } catch (error) {
    return res.status(500).json({ message: `get my shop error ${error}` });
  }
};

//get all shop of city
export const getShopByCity = async (req, res) => {
  try {
    //took city from param
    const { city } = req.params;

    // Match shops where the 'city' field matches the given city name
    // ^${city}$  → ensures an exact match (no extra characters before or after)
    // "i"        → makes the match case-insensitive (Delhi = delhi = DELHI)
    const shops = await Shop.find({
      city: { $regex: new RegExp(`^${city}$`, "i") },
    }).populate("items");

    // if shop not found
    if (!shops) {
      return res.status(400).json({ message: "shops not found" });
    }

    //response
    return res.status(200).json(shops);
  } catch (error) {
    return res.status(500).json({ message: `get shop by city error ${error}` });
  }
};
