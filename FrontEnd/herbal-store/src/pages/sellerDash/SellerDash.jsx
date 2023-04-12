import React, {useEffect, useState} from "react";

//import { ToastContainer, toast } from "react-toastify";
//import "react-toastify/dist/ReactToastify.css";
import { 
    Navbar,
    ProductsList,
    SellerSidebar,
    NewProduct
} from "../../components";
 
const SellerDash = () => {

    const [selectedTab, setSelectedTab] = useState("dashboard");

    const cardClasses = "bg-darkbg rounded-lg px-10 py-8 m-auto";
    const tableHeaderClasses = "sticky top-0 px-6 py-3 w-2/12 text-sm uppercase bg-gray-700 text-gray-400";

    return(
        <>
            <div
                className="bg-lightbg w-full"
                style={{ height: "calc(100vh - 53px)" }}>
                <Navbar />
                <h1
                    id="sellerBreadCrumb"
                    className="pl-8 italic text-slate-500 my-2 transition-all">
                    {selectedTab === "dashboard" && "Seller Dashboard"}
                    {selectedTab === "add Product" && "Seller Dashboard > Add Product"}
                    {selectedTab === "products" && "Seller Dashboard > Products"}
                    {selectedTab === "orders" && "Seller Dashboard > Orders"}
                    {selectedTab === "ratings" &&
                        "Seller Dashboard > Ratings"}
                </h1>

                <div className="flex">
                    <div
                        className="mx-5 mb-2 w-2/12 inline-block top-56 rounded-lg bg-darkbg"
                        style={{ height: "calc(100vh - 170px)" }}>
                        <SellerSidebar selector={setSelectedTab} />
                    </div>

                    {/* main component container */}
                    <div className="w-9/12 m-auto justify-center my-3">
                        <div className={cardClasses}>
                            {selectedTab === "dashboard" && (
                                <h1 className="text-gray-200">Satistics</h1>
                            )}
                            {selectedTab === "add Product" && (
                               <NewProduct />
                            )}
                            {selectedTab === "products" && (
                                <ProductsList
                                    tableHeader={tableHeaderClasses}
                                    
                                    />
                            )}
                            {selectedTab === "orders" && (
                                <h1 className="text-gray-200">Orders</h1>
                            )}
                            {selectedTab === "ratings" && (
                                <h1 className="text-gray-200">Ratings</h1>
                            )}
                        </div>
                    </div>
                </div>
                
                
            </div>
            
        </>
    )
}

export default SellerDash