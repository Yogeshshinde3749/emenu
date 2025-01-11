import { useRef, useState } from "react";

const CartProduct = ({ name, price, quantity, id, setCartData }) => {
    const named = useRef(null);
    const size = useRef(null);
    const coun = useRef(null);
    const pri = useRef(null);

    const [counNum, setCounNum] = useState(quantity ? quantity : 1);

    const countityHandler = (e) => {
        let newCounNum = counNum;
        if (e.target.innerText === "+") {
            newCounNum = counNum + 1;
        } else if (e.target.innerText === "-" && counNum > 1) {
            newCounNum = counNum - 1;
        }
        setCounNum(newCounNum);

        // Update the cart data and localStorage when quantity changes
        const existingData = localStorage.getItem('cart');
        if (existingData) {
            let cart = JSON.parse(existingData);
            cart = cart.map(item => 
                item.id === id ? { ...item, product: { ...item.product, quantity: newCounNum } } : item
            );
            localStorage.setItem('cart', JSON.stringify(cart));
            setCartData(cart); // Update the parent component's state
        }
    };

    const deleteHandler = () => {
        const existingData = localStorage.getItem('cart');
        if (existingData) {
            let cart = JSON.parse(existingData);
            const updatedProducts = cart.filter(item => item.id !== id);

            localStorage.setItem('cart', JSON.stringify(updatedProducts));
            setCartData(updatedProducts); // Update the parent component's state
        }
    };

    return (
        <div className="cart-product">
            <button className="delBtn" onClick={deleteHandler}>X</button>
            <div className="inner">
                <img src="" alt="Product" />
                <div className="detail">
                    <table>
                        <tbody>
                            <tr>
                                <th>Name</th>
                                <th>:</th>
                                <td ref={named}>{name}</td>
                            </tr>
                            <tr>
                                <th>Size</th>
                                <th>:</th>
                                <td ref={size}>Full</td>
                            </tr>
                            <tr>
                                <th>Quantity</th>
                                <th>:</th>
                                <td style={{ display: "flex", gap: "5px" }}>
                                    <button onClick={countityHandler}>-</button>
                                    <div ref={coun}>{counNum}</div>
                                    <button onClick={countityHandler}>+</button>
                                </td>
                            </tr>
                            <tr>
                                <th>Price</th>
                                <th>:</th>
                                <td ref={pri}>{price * counNum}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default CartProduct;
