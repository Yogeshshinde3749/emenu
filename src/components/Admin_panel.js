import { useRef, useState } from "react";

const Admin_panel = () => {
    const [getOption, selectOption] = useState("Dish");

    // Refs for Dish form
    const dname = useRef();
    const dprice = useRef();
    const dtype = useRef();

    // Refs for Thali form
    const tname = useRef();
    const tprice = useRef();
    const ttype = useRef();

    const [types] = useState([
        "Chinese", "Gujarati", "South Indian", "Punjabi", "Assam", "maharastrian"
    ]);

    // Add Dish Handler
    const dishAddHandler = () => {

        if (dname.current.value === "" || dprice.current.value === "" || dtype.current.value === "") {
            alert("fill the form")
        }

        else {
            const existingData = localStorage.getItem('Products');
            let products = existingData ? JSON.parse(existingData) : [];

            const newDish = {
                id: products.length + 1,
                product: {
                    name: dname.current.value.toLowerCase(),
                    price: dprice.current.value.toLowerCase(),
                    type: dtype.current.value
                }
            };

            products.push(newDish);
            localStorage.setItem('Products', JSON.stringify(products));

            // Clear input fields
            dname.current.value = '';
            dprice.current.value = '';
            dtype.current.value = '';
        }

    };

    // Add Thali Handler
    const thaliAddHandler = () => {
        // Check if the Thali key exists in localStorage, otherwise initialize it
        const existingData = localStorage.getItem('Thali');
        let products = existingData ? JSON.parse(existingData) : [];

        const newThali = {
            id: products.length + 1,
            product: {
                name: tname.current.value.toLowerCase(),
                price: tprice.current.value.toLowerCase(),
                totalPrice: 0,
                type: ttype.current.value
            }
        };

        // Push the new Thali to the array and update localStorage
        products.push(newThali);
        localStorage.setItem('Thali', JSON.stringify(products));

        // Clear input fields
        tname.current.value = '';
        tprice.current.value = '';
        ttype.current.value = '';
    };

    // Click Handler to switch between Dish and Thali
    const clickHandler = (e) => {
        selectOption(e.target.innerText);

        // Manually manage "active" styles using class
        const allNavItems = e.target.parentNode.querySelectorAll('li');
        allNavItems.forEach((item) => {
            item.classList.remove('active');
        });

        e.target.classList.add('active');
    };

    return (
        <>
            <div className="admin-panel">
            <h1 className="copyRight">Yogesh <small><sub>consept demo project</sub></small> </h1>
                <div className="head">
                    <nav>
                        <ul>
                            <li onClick={clickHandler} className={getOption === "Dish" ? "active" : ""}>
                                Dish
                            </li>
                            <li onClick={clickHandler} className={getOption === "Thali" ? "active" : ""}>
                                Thali
                            </li>
                            <li>
                                Offer
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className="form card">
                    {getOption === "Dish" ? (
                        <table>
                            <tbody>
                                <tr>
                                    <th><label>Create Dish</label></th>
                                </tr>
                                <tr>
                                    <th><label>Name</label><span>:</span></th>
                                    <td><input type="text" ref={dname} /></td>
                                </tr>
                                <tr>
                                    <th><label>Price</label><span>:</span></th>
                                    <td><input type="text" ref={dprice} /></td>
                                </tr>
                                <tr>
                                    <th><label>Type</label><span>:</span></th>
                                    <td>
                                        {/* Use select dropdown for Type */}
                                        <select ref={dtype}>
                                            <option value={""}>choose</option>
                                            {types.map((type, index) => (
                                                <option key={index} value={type.toLowerCase()}>
                                                    {type}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                        <button onClick={dishAddHandler}>Add Dish</button>
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    ) : (
                        <table>
                            <tbody>
                                <tr>
                                    <th>Create Thali</th>
                                </tr>
                                <tr>
                                    <th><label>Name</label><span>:</span></th>
                                    <td><input type="text" ref={tname} /></td>
                                </tr>
                                <tr>
                                    <th><label>Price</label><span>:</span></th>
                                    <td><input type="text" ref={tprice} /></td>
                                </tr>
                                <tr>
                                    <th>Type</th>
                                    <td>
                                        <select ref={ttype}>
                                            <option value={""}><label>choose</label></option>
                                            {types.map((type, index) => (
                                                <option key={index} value={type.toLowerCase()}>
                                                    {type}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                        <button onClick={thaliAddHandler}>Add Thali</button>
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </>
    );
};
export default Admin_panel;