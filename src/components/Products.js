import { useRef, useState } from "react";

const Products = ({ name, price, quantity, typeoff }) => {
    const named = useRef(null);
    const size = useRef(null);
    const [data, setData] = useState([]);
    const [counNum, setCounNum] = useState(quantity ? quantity : 1);

    const cartAddHandler = () => {
        const existingProducts = JSON.parse(localStorage.getItem('cart')) || [];

        // Find the existing product by comparing the name
        const productIndex = existingProducts.findIndex(
            (pro) => pro.product.name.toUpperCase() === named.current.innerText.toUpperCase()
        );

        if (productIndex === -1) {
            // Product does not exist, add a new one
            const newProduct = {
                id: existingProducts.length + 1,
                product: {
                    name: named.current.innerText,
                    size: size.current.innerText,
                    quantity: counNum, // Use state here instead of ref
                    price: parseFloat(price),
                    totalPrice: parseFloat(price) * counNum, // Update price calculation
                    type: typeoff
                }
            };

            // Add the new product to the list
            const updatedProducts = [...existingProducts, newProduct];
            setData(updatedProducts);

            // Store the updated products back in localStorage
            localStorage.setItem('cart', JSON.stringify(updatedProducts));
        } else {
            // Product exists, update the quantity
            existingProducts[productIndex].product.quantity += counNum;
            existingProducts[productIndex].product.price = parseFloat(price) * existingProducts[productIndex].product.quantity; // Update price accordingly
            
            // Update localStorage with the modified cart
            setData(existingProducts);
            localStorage.setItem('cart', JSON.stringify(existingProducts));
        }
    };

    const countityHandler = (e) => {
        if (e.target.innerText === "+") {
            setCounNum((prev) => prev + 1);
        } else if (e.target.innerText === "-" && counNum > 1) {
            setCounNum((prev) => prev - 1);
        }
    };

    return (
        <div className="product">
            <div className="inner">
                <img src="" alt="Product" />
                <div className="detail">
                    <table>
                        <tbody>
                            <tr>
                                <th>Name</th>
                                <th>:</th>
                                <td ref={named}>{name.toUpperCase()}</td>
                            </tr>
                            <tr>
                                <th>Size </th>
                                <th>:</th>
                                <td ref={size}>Full</td>
                            </tr>
                            <tr>
                                <th>Quantity </th>
                                <th>:</th>
                                <td style={{ display: "flex", gap: "5px" }}>
                                    <button onClick={countityHandler}>-</button>
                                    <div>{counNum}</div>
                                    <button onClick={countityHandler}>+</button>
                                </td>
                            </tr>
                            <tr>
                                <th>Price </th>
                                <th>:</th>
                                <td>{price * counNum}</td> {/* Update the price dynamically */}
                            </tr>
                            <tr>
                                <td colSpan="3">
                                    <button onClick={cartAddHandler}>Add To Cart</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Products;
