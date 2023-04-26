import React from "react";
import { FaSpinner } from "react-icons/fa";

const OrderDeliveryTable = (props) => {
    //needs props: orders

    const handleDeliveredClick = (e, index) => {
        //TODO: show popup (optional)
        //TODO: send request to server to update order status to delivered
        //TODO: refresh order list
    };

    const tableHeaderClasses =
        "sticky top-0 px-6 py-3 w-2/12 text-sm uppercase bg-gray-700 text-gray-400";

    return (
        <>
            {props.orders === null || props.orders === undefined ? (
                <FaSpinner className="animate-spin m-5" />
            ) : (
                <div
                    className="overflow-x-auto"
                    style={{
                        maxHeight: "30rem",
                        minHeight: "20rem",
                    }}>
                    <table className="w-full border-collapse text-left text-grey-400">
                        <thead>
                            <tr>
                                <th className={tableHeaderClasses}>Date</th>
                                <th className={tableHeaderClasses}>Order</th>
                                <th className={tableHeaderClasses}>Status</th>
                                <th className={tableHeaderClasses}>Confirmation</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.orders.map((order, index) => (
                                <tr
                                    key={order._id}
                                    className="transition-all bg-slate-800 border-b-2 border-slate-600 m-10 hover:bg-slate-700">
                                    <td className="px-6 py-4">
                                        {order.createdAt.split("T")[0]}
                                    </td>
                                    <td className="px-6 py-4">{order._id}</td>
                                    <td className="px-6 py-4">
                                        {!order.isDelivered ? (
                                            <div className="text-slate-500">
                                                Shipped
                                            </div>
                                        ) : (
                                            <div className="text-primarylight">
                                                Delivered
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 flex">
                                        {!order.isDelivered ? (
                                            <>
                                                <button
                                                    onClick={e => handleDeliveredClick(e, index)}
                                                    className="flex transition-all justify-center w-24 mr-2 px-1 rounded-md bg-slate-600 ring-offset-1 ring-1 hover:bg-slate-500 active:scale-95">
                                                    <AiOutlineCheck className="m-1" />
                                                    <div className="mr-1">
                                                        Delivered
                                                    </div>
                                                </button>
                                            </>
                                        ) : (
                                            <div className="italic text-slate-500">
                                                {`Delivered on ${order.deliveredAt.split("T")[0]}`}
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    );
};

export default OrderDeliveryTable;