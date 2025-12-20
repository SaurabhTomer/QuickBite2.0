import Item from "../models/item.model.js";
import Shop from "../models/shop.model.js";
import uploadOnCloudinary from "../utils/cloudinary.js";


//function to add item 
export const addItem = async (req, res) => {
    try {
        //fetch data
        const { name, category, foodType, price } = req.body
        let image;
        if (req.file) {
            image = await uploadOnCloudinary(req.file.path)
        }
        //check is this user have shop or not
        const shop = await Shop.findOne({ owner: req.userId })
        if (!shop) {
            return res.status(400).json({ message: "shop not found" })
        }

        //create item
        const item = await Item.create({
            name, category, foodType, price, image, shop: shop._id
        })

        //puch item in shop bcoz it is in shop model also
        shop.items.push(item._id)
        //save shop
        await shop.save()
        //populate all details of owner
        await shop.populate("owner")

        //populate all details of items on order which creater first are above
        await shop.populate({
            path: "items",
            options: { sort: { updatedAt: -1 } }
        })
        
        //response
        return res.status(201).json(shop)

    } catch (error) {
        return res.status(500).json({ message: `add item error ${error}` })
    }
}