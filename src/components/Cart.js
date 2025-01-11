import { useEffect, useState } from "react";
import CartProduct from "../components/CartProduct";

const Cart = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true); // Added loading state

    useEffect(() => {
        const localData = localStorage.getItem('cart');
        if (localData) {
            setData(JSON.parse(localData));
        } else {
            console.log("No product data found in localStorage.");
        }
        setLoading(false); // Data has been loaded, so stop loading
    }, []);

    // Handle the "Order" button click
    const handleOrder = () => {
        if (data.length > 0) {
            console.log("Order placed:", data);
            localStorage.setItem('OrderList', JSON.stringify(data));
            alert("Order placed successfully!");
        } else {
            alert("Cart is empty! Please add some items.");
        }
    };

    return (
        <>
            {loading ? ( // Conditional rendering while loading
                <h1>Loading...</h1>
            ) : (
                <>
                    <div className="menu pt-4">
                        {data.length === 0 ? (
                            <h1>No Food, PLEASE ADD</h1>
                        ) : (
                            data.map((e, i) => (
                                <CartProduct 
                                    key={i} 
                                    name={e.product?.name} 
                                    price={e.product?.price}
                                    quantity={e.product?.quantity}
                                    id={e.id}
                                    setCartData={setData} // Pass setData to CartProduct to allow updating cart
                                />
                            ))
                        )}
                    </div>
                    <button onClick={handleOrder}>Order</button>
                </>
            )}
        </>
    );
};

export default Cart;
