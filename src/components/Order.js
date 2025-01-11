import { useEffect, useState } from "react";

const Order = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const localData = localStorage.getItem("OrderList");
        if (localData) {
            const orders = JSON.parse(localData);
            setData(orders);
        }
    }, []);

    const deleteHandler = (e) => {
        const filterData = data.filter((y) => y.id  !== Number(e.target.className))
        setData(filterData )
    }

    return (
        <>
            <div className="pt-3 order">
                <table>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Name</th>
                            <th>Size</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Total Price</th>
                            <th>Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.length > 0 ? (
                            data.map((inx, index) => (
                                <tr key={index}>
                                    <td>{index+1}</td>                             
                                    <td>{inx.product.name}</td>
                                    <td>{inx.product.size}</td>
                                    <td>{inx.product.quantity}</td>
                                    <td>{inx.product.price}</td>
                                    <td>{inx.product.totalPrice}</td>
                                    <td>{inx.product.type}</td>
                                    <td><button className={inx.id} onClick={deleteHandler}>remove</button></td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5">No orders available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Order;
