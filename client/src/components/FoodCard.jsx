import { useState } from "react";
import { FaLeaf } from "react-icons/fa";
import { FaDrumstickBite } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/userSlice";

// funtion to show food card and it took parameter of details from userdashboad
function FoodCard({ data }) {
    //usestate
    const [quantity, setQuantity] = useState(0);

    const dispatch = useDispatch();
    const { cartItems } = useSelector((state) => state.user);

    // function to render stars for rating
    const renderStars = (rating) => {
        
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                i <= rating ? (
                    <FaStar className="text-yellow-500 text-lg" />
                ) : (
                    <FaRegStar className="text-yellow-500 text-lg" />
                )
            );
        }
        return stars;
    };

    //funtion to increase quantity of food after clicking on + button
    const handleIncrease = () => {
        const newQty = quantity + 1;
        setQuantity(newQty);
    };

    //funtion to decrease quantity of food after clicking on - button
    const handleDecrease = () => {
        if (quantity > 0) {
            const newQty = quantity - 1;
            setQuantity(newQty);
        }
    };

    return (

        //card box

        <div className="w-62.5 rounded-2xl border-2 border-[#ff4d2d] bg-white shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col">
            {/* image box */}
            <div className="relative w-full h-42.5 flex justify-center items-center bg-white">

                {/* food type  */}
                <div className="absolute top-3 right-3 bg-white rounded-full p-1 shadow">
                    {data.foodType == "veg" ? (
                        <FaLeaf className="text-green-600 text-lg" />
                    ) : (
                        <FaDrumstickBite className="text-red-600 text-lg" />
                    )}
                </div>

                {/* show image of food */}
                <img
                    src={data.image}
                    alt=""
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
            </div>

            {/* content of food */}
            <div className="flex-1 flex flex-col p-4">
                <h1 className="font-semibold text-gray-900 text-base truncate">
                    {data.name}
                </h1>
                {/* render stars */}
                <div className="flex items-center gap-1 mt-1">
                    {renderStars(data.rating?.average || 0)}
                    <span className="text-xs text-gray-500">
                        {data.rating?.count || 0}
                    </span>
                </div>
            </div>

            {/* price and inc. and dec. quantity */}
            <div className="flex items-center justify-between mt-auto p-3">
                <span className="font-bold text-gray-900 text-lg">₹{data.price}</span>

                <div className="flex items-center border rounded-full overflow-hidden shadow-sm">
                    {/* decrese */}
                    <button
                        className="px-2 py-1 hover:bg-gray-100 transition"
                        onClick={handleDecrease}
                    >
                        <FaMinus size={12} />
                    </button>

                    {/* quantity */}
                    <span>{quantity}</span>

                    {/* increase */}
                    <button
                        className="px-2 py-1 hover:bg-gray-100 transition"
                        onClick={handleIncrease}
                    >
                        <FaPlus size={12} />
                    </button>

                    <button
                        className={`${cartItems.some((i) => i.id == data._id)
                            ? "bg-gray-800"
                            : "bg-[#ff4d2d]"
                            } text-white px-3 py-2 transition-colors`}
                        onClick={() => {
                            quantity > 0
                                ? dispatch(
                                    addToCart({
                                        id: data._id,
                                        name: data.name,
                                        price: data.price,
                                        image: data.image,
                                        shop: data.shop,
                                        quantity,
                                        foodType: data.foodType,
                                    })
                                )
                                : null;
                        }}
                    >
                        <FaShoppingCart size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default FoodCard;
