import React from "react";

function AddProduct() {
  const [name, setName] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [company, setCompany] = React.useState("");
  const [error, setError] = React.useState(false);

  const addProduct = async () => {
    //****************Validations ************************ */
    // !name or any other will show false if the input field is filled and true if input is empty.
    console.log(!name);
    //check valodation if any one of below is empty
    if (!name || !price || !category || !company) {
      setError(true);
      return false; // it will end the program. Means next code will be ignored.
    }

    console.log(name, price, category, company);
    const userId = JSON.parse(localStorage.getItem("user"))._id; // get user id from localStorage, User that is logged in
    let result = await fetch("http://localhost:5000/add-product", {
      method: "post",
      body: JSON.stringify({ name, price, category, company, userId }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.log(result);
  };

  return (
    <div className="product">
      <h1>Add Product</h1>
      <input
        type="text"
        placeholder="Enter product name"
        className="inputBox"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      {/* if name input is empty show this text */}
      {error && !name && (
        <span className="invalid-input">Enter valid name</span>
      )}
      <input
        type="text"
        placeholder="Enter product price"
        className="inputBox"
        value={price}
        onChange={(e) => {
          setPrice(e.target.value);
        }}
      />
      {/* if price input is empty show this text */}
      {error && !price && (
        <span className="invalid-input">Enter valid price</span>
      )}
      <input
        type="text"
        placeholder="Enter product category"
        className="inputBox"
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
        }}
      />
      {/* if category input is empty show this text */}
      {error && !category && (
        <span className="invalid-input">Enter valid category</span>
      )}
      <input
        type="text"
        placeholder="Enter product company"
        className="inputBox"
        value={company}
        onChange={(e) => {
          setCompany(e.target.value);
        }}
      />
      {/* if company input is empty show this text */}
      {error && !company && (
        <span className="invalid-input">Enter valid company</span>
      )}
      <button onClick={addProduct} className="appButton">
        Add Product
      </button>
    </div>
  );
}

export default AddProduct;
