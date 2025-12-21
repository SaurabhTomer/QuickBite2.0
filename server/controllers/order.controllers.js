import Shop from '../models/shop.model.js'
export const placeOrder = async(req , res) =>{

    try {
        const {cartItems , paymentMethod , deliveryAddress} = req.body
        if(cartItems.length ==0 || !cartItems){{
            return res.status(400).json({message:"Cart is empty"})
        }}

        if( !deliveryAddress.text || !deliveryAddress.latitude || !deliveryAddress.longitude){{
            return res.status(400).json({message:"Send complete delivery address"})
        }}
        // 3.38 timestamp
        const groupItemsByShop = {}
        //har ek items pr iterate karenge jo cart items pr hoga
        cartItems.forEach( item => {
            // hr ek item mai shop id h toh us item ki shop id ko shopId mai dal denge
            const shopId = item.shop
            //check karenge k ye shop id phale se toh groupitems by shop object mai toh nhi h
            //agr nhi hh toh shop  id dal denge bs as a key jismai khale array bn gyi items k liye us shop k
           if( ! groupItemsByShop[shopId] ){
            groupItemsByShop[shopId] = []
           }
           // is item ko jisr hm h usko hm groupitembyshop array mai save krdenge taki vo uski shop pr order jaye
           groupItemsByShop[shopId].push(item)
        })

        // sb particluar shop ka order banayegnge 
        //Object.keys krke hm jo object usmai pass krte h uski keys mil jati h
        const shopOrders = await Object.keys(groupItemsByShop)
        .map( async (shopId) => {

            const shop = await Shop.findById(shopId).populate("owner")
            if( !shop){
                return res.status(400).json({message:"Shop not found"})
            }
            //get items from shop
            const items = groupItemsByShop[shopId]
            //get sub total of item sfrom that shop
            const subtotal = items.reduce( (sum , i) => sum + Number(i.price) * Number( i.quantity)  ,0)

            return {
                shop : shop._id,
                owner : shop._id,
                subtotal ,
                shopOrderItems : items.map( (i) => ({
                   item : i._id,
                    price : i.price,
                    quantity : i.quantity,
                    name : i.name
                

                )})
            }

        })

    } catch (error) {
        
    }
}