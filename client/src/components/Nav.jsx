import { useEffect, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import { FiShoppingCart } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import { serverUrl } from "../App";
import { setSearchItems, setUserData } from "../redux/userSlice";
import { FaPlus } from "react-icons/fa6";
import { TbReceipt2 } from "react-icons/tb";
import { useNavigate } from "react-router-dom";


// Nv components
function Nav() {

    // useselector
    const { userData , city } = useSelector(
        (state) => state.user
    );
    const { myShopData } = useSelector((state) => state.owner);

    //usestate
    const [showInfo, setShowInfo] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [query, setQuery] = useState("");
    
    // hooks
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //logout handle function
    const handleLogOut = async () => {
        try {
            const result = await axios.get(`${serverUrl}/api/auth/signout`, {
                withCredentials: true,
            });
            //set userdata to null 
            dispatch(setUserData(null));
        } catch (error) {
            console.log(error);
        }
    };


    //handle search items
    const handleSearchItems = async () => {
        try {
            const result = await axios.get(
                `${serverUrl}/api/item/search-items?query=${query}&city=${currentCity}`,
                { withCredentials: true }
            );
            dispatch(setSearchItems(result.data));
        } catch (error) {
            console.log(error);
        }
    };



    useEffect(() => {
        if (query) {
            handleSearchItems();
        } else {
            dispatch(setSearchItems(null));
        }
    }, [query]);


    return (

        //main div
        <div className="w-full h-20 flex items-center justify-between md:justify-center gap-7.5 px-5 fixed top-0 z-9999 bg-[#fff9f6] overflow-visible">

            {/* if role is user for large device */}
            {showSearch && userData.role == "user" && (
                <div className="w-[90%] h-17.5  bg-white shadow-xl rounded-lg items-center gap-5 flex fixed top-20 left-[5%] md:hidden">
                    {/* location div */}
                    <div className="flex items-center w-[30%] overflow-hidden gap-2.5 px-2.5 border-r-2 border-gray-400">
                        <FaLocationDot size={25} className=" text-[#ff4d2d]" />
                        <div className="w-[80%] truncate text-gray-600">{city}</div>
                    </div>
                    {/* query param */}
                    <div className="w-[80%] flex items-center gap-2.5">
                        <IoIosSearch size={25} className="text-[#ff4d2d]" />
                        <input
                            type="text"
                            placeholder="search delicious food..."
                            className="px-2.5 text-gray-700 outline-0 w-full"
                            onChange={(e) => setQuery(e.target.value)}
                            value={query}
                        />
                    </div>
                </div>
            )}


            {/* navbar for small devices */}
            <h1 className="text-3xl font-bold mb-2 text-[#ff4d2d]">QuickBite</h1>
            {userData.role == "user" && (
                <div className="md:w-[60%] lg:w-[40%] h-17.5 bg-white shadow-xl rounded-lg items-center gap-5 hidden md:flex">
                    <div className="flex items-center w-[30%] overflow-hidden gap-2.5 px-2.5 border-r-2 border-gray-400">
                        <FaLocationDot size={25} className=" text-[#ff4d2d]" />
                        <div className="w-[80%] truncate text-gray-600">{city}</div>
                    </div>
                    <div className="w-[80%] flex items-center gap-2.5">
                        <IoIosSearch size={25} className="text-[#ff4d2d]" />
                        <input
                            type="text"
                            placeholder="search delicious food..."
                            className="px-2.5 text-gray-700 outline-0 w-full"
                            onChange={(e) => setQuery(e.target.value)}
                            value={query}
                        />
                    </div>
                </div>
            )}


            {/* div which operates when when we open search icon  */}
            <div className="flex items-center gap-4">

                {userData.role == "user" &&
                    (showSearch ? (
                        <RxCross2
                            size={25}
                            className="text-[#ff4d2d] md:hidden"
                            onClick={() => setShowSearch(false)}
                        />
                    ) : (
                        <IoIosSearch
                            size={25}
                            className="text-[#ff4d2d] md:hidden"
                            onClick={() => setShowSearch(true)}
                        />
                    ))}


                {/* nav if role is owner */}
                {userData.role == "owner" ? (
                    <>
                    {/* if mmy shop data is present */}
                        {myShopData && (
                            <>
                                {/* add item  */}
                                <button
                                    className="hidden md:flex items-center gap-1 p-2 cursor-pointer rounded-full bg-[#ff4d2d]/10 text-[#ff4d2d]"
                                //   onClick={() => navigate("/add-item")}
                                >
                                    <FaPlus size={20} />
                                    <span>Add Food Item</span>
                                </button>
                                <button
                                    className="md:hidden flex items-center  p-2 cursor-pointer rounded-full bg-[#ff4d2d]/10 text-[#ff4d2d]"
                                //   onClick={() => navigate("/add-item")}
                                >
                                    <FaPlus size={20} />
                                </button>
                            </>
                        )}

                        <div
                            className="hidden md:flex items-center gap-2 cursor-pointer relative px-3 py-1 rounded-lg bg-[#ff4d2d]/10 text-[#ff4d2d] font-medium"
                        //   onClick={() => navigate("/my-orders")}
                        >
                            <TbReceipt2 size={20} />
                            <span>My Orders</span>
                        </div>

                        <div
                            className="md:hidden flex items-center gap-2 cursor-pointer relative px-3 py-1 rounded-lg bg-[#ff4d2d]/10 text-[#ff4d2d] font-medium"
                        //   onClick={() => navigate("/my-orders")}
                        >
                            <TbReceipt2 size={20} />
                        </div>
                    </>
                ) : (
                    <>
                    {/* cart items length */}
                        {userData.role == "user" && (
                            <div
                                className="relative cursor-pointer"
                                onClick={() => navigate("/cart")}
                            >
                                <FiShoppingCart size={25} className="text-[#ff4d2d]" />
                                <span className="absolute -right-2.25 -top-3 text-[#ff4d2d]">
                                    {cartItems.length}
                                </span>
                            </div>
                        )}

                        {/* button for my order */}

                        <button
                            className="hidden md:block px-3 py-1 rounded-lg bg-[#ff4d2d]/10 text-[#ff4d2d] text-sm font-medium"
                        //   onClick={() => navigate("/my-orders")}
                        >
                            My Orders
                        </button>

                    </>
                )}

                <div
                    className="w-10 h-10 rounded-full flex items-center justify-center bg-[#ff4d2d] text-white text-[18px] shadow-xl font-semibold cursor-pointer"
                    onClick={() => setShowInfo((prev) => !prev)}
                >
                    {userData?.fullName.slice(0, 1)}
                </div>


                {showInfo && (
                    <div
                        className={`fixed top-20 right-2.5 
                    ${userData.role == "deliveryBoy"
                                ? "md:right-[20%] lg:right-[40%]"
                                : "md:right-[10%] lg:right-[25%]"
                            } w-45 bg-white shadow-2xl rounded-xl p-5 flex flex-col gap-2.5 z-9999`}
                    >
                        <div className="text-[17px] font-semibold">{userData.fullName}</div>
                        {userData.role == "user" && (
                            <div
                                className="md:hidden text-[#ff4d2d] font-semibold cursor-pointer"
                            // onClick={() => navigate("/my-orders")}
                            >
                                My Orders
                            </div>
                        )}

                        {/* logout button */}
                        <div
                            className="text-[#ff4d2d] font-semibold cursor-pointer"
                            onClick={handleLogOut}
                        >
                            Log Out
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Nav;
