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

//edit item controller
export const editItem = async (req, res) => {
    try {

        //fetch itemisfrom params  and details from body
        const itemId = req.params.itemId
        const { name, category, foodType, price } = req.body
        let image;
        if (req.file) {
            image = await uploadOnCloudinary(req.file.path)
        }
        //find item and update
        const item = await Item.findByIdAndUpdate(itemId, {
            name, category, foodType, price, image
        }, { new: true })

        // if item is not present
        if (!item) {
            return res.status(400).json({ message: "item not found" })
        }
        //return all items of shop data 
        const shop = await Shop.findOne({ owner: req.userId }).populate({
            path: "items",
            options: { sort: { updatedAt: -1 } }
        })
        //rsponse
        return res.status(200).json(shop)

    } catch (error) {
        return res.status(500).json({ message: `edit item error ${error}` })
    }
}