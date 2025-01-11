import { useEffect, useState } from "react";
import Products from "./Products";

const Menu = () => {
    const [sizePattern, setSizePattern] = useState("menu");
    const [data, setData] = useState([]);
    const [filterFoodType, setFilterFoodType] = useState([]);
    const[display,setDisplay] = useState("none")
    const [foodType] = useState([
        "All", "Punjabi", "Gujarati", "Maharastrian", "Assam", "South Indian", "Chinese"
    ]);

    useEffect(() => {
        const localData = localStorage.getItem('Products');
        if (localData) {
            const products = JSON.parse(localData);
            setData(products);
            setFilterFoodType(products);
        } else {
            console.log("No product data found in localStorage.");
        }
    }, []);

    const Siz = (e) => {
        setSizePattern(e.target.innerText);
    };

    const HandleFoodType = (choosed) => {
        const selectedType = choosed.target.innerText.toLowerCase();
        choosed.target.parentNode.querySelectorAll("li").forEach(element => {element.style.backgroundColor = "#808080"});
        choosed.target.style = "background-color: rgb(165 42 42 / 90%);"
        // console.log(choosed.target.parentNode.document.querySelectAll("li")[1])

        if (selectedType === "all") {
            setFilterFoodType(data);
        } else {
            const filteredData = data.filter(
                (item) => item.product.type === selectedType
            );
            setFilterFoodType(filteredData);
        }
    };
    const handleVarity = () => {
        if(display == "block"){
            setDisplay("none")
        }
        else{
            setDisplay("block")
        }
    }

    return (
        <div className="pt-4 food-menu-body">
            <div className="flex justify-between">
                <section className="varity-section">
                    <button className="varity-sm-btn" onClick={handleVarity}>|||</button>
                    <div className={`mobile-var ${display}`}>
                        {foodType.map((type, i) => (
                            <li key={i} onClick={HandleFoodType}>{type}</li>
                        ))}
                    </div>
                    <div className={`varity`}>
                        {foodType.map((type, i) => (
                            <li key={i} onClick={HandleFoodType}>{type}</li>
                        ))}
                    </div>
                </section>
                <div className="sizeBtn">
                    <button onClick={Siz}>Auto</button>
                    <button onClick={Siz}>||</button>
                </div>
            </div>
            {sizePattern === "||" ? (
                <div className="menuSm">
                    {filterFoodType.length === 0 ? (
                        <h1>NO PRODUCT FOUND</h1>
                    ) : (
                        filterFoodType.map((item, i) => (
                            <Products
                                key={i}
                                name={item.product?.name}
                                price={item.product?.price}
                                typeoff={item.product?.type}
                            />
                        ))
                    )}
                </div>
            ) : (
                <div className="menu">
                    {filterFoodType.length === 0 ? (
                        <h1>NO PRODUCT FOUND</h1>
                    ) : (
                        filterFoodType.map((item, i) => (
                            <Products
                                key={i}
                                name={item.product?.name}
                                price={item.product?.price}
                                typeoff={item.product?.type}
                            />
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default Menu;
