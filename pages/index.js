import Head from "next/head";
import styles from "../styles/Home.module.css";
import Redis from "ioredis";
import { useState } from "react";
import dynamic from "next/dynamic";

import Product from "../components/product/product";
import product from "../components/product/product";
import Image from "next/image";
import Modal from "../components/modal";

import getAllProducts from "../lib/redis/getAllProducts";

let redis = new Redis(process.env.REDIS_URL);

export default function Home({ data, products }) {
  const [count, setCount] = useState(data);
  const [onModal, setOnModal] = useState(false);
  const [addedItem, setAddedItem] = useState({
    itemName: "",
    itemDescription: "",
    itemPrice: "",
    itemImage: "",
  });
  const [userPicks, setUserPicks] = useState([]);

  const increment = async () => {
    const response = await fetch("/api/incr", { method: "POST" });
    const data = await response.json();
    setCount(data.count);
  };

  const setOnModalHandler = (e) => {
    setOnModal((prev) => !prev);
  };

  const addItemHandler = (e) => {
    let tempAddedItem = { ...addedItem };
    switch (e.target.id) {
      case "itemName":
        tempAddedItem.itemName = e.target.value;
        break;
      case "itemDescription":
        tempAddedItem.itemDescription = e.target.value;
        break;
      case "itemPrice":
        tempAddedItem.itemPrice = e.target.value;
        break;
      case "itemImage":
        tempAddedItem.itemImage = e.target.files[0];
        break;
    }
    setAddedItem(tempAddedItem);
  };

  const submitItemHandler = async (e) => {
    const response = await fetch("/api/addNewItem", {
      method: "POST",
      body: JSON.stringify(addedItem),
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <div className={styles.container}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        {onModal ? (
          <Modal showModal={onModal} setShowModal={setOnModalHandler} />
        ) : null}
        <div className="fixed-top">
          <button className="btn" onClick={setOnModalHandler}>
            <Image
              src="/images/ShoppingCartIcon.png"
              width="50"
              height="50"
              layout="fixed"
            />
          </button>
        </div>
        <h1>Welcome to Shopp!</h1>
        <div className="row">
          <h2>Select your items</h2>
        </div>
        <div className="row">
          {products.map((item) => {
            return (
              <Product
                key={item.id}
                productID={item.id}
                productName={item.name}
                productDescription={item.description}
                productPrice={item.price}
                productImagePath={item.imagePath}
              />
            );
          })}
        </div>

        <br />
        <br />
        <br />

        <h2 className="row">Add an Item to the Shop</h2>
        <div>
          <div class="form-group">
            <label for="itemName">Item Name</label>
            <input
              type="text"
              className="form-control"
              id="itemName"
              placeholder="Item Name"
              onChange={addItemHandler}
            />
          </div>
          <div class="form-group">
            <label for="itemDescription">Description</label>
            <input
              type="email"
              className="form-control"
              id="itemDescription"
              placeholder="Description"
              onChange={addItemHandler}
            />
          </div>
          <div class="form-group">
            <label for="itemPrice">Price</label>
            <input
              type="text"
              className="form-control"
              id="itemPrice"
              placeholder="Price"
              onChange={addItemHandler}
            />
          </div>
          <div className="row">
            <input type="file" id="itemImage" onChange={addItemHandler} />
          </div>
          <br />
          <button
            className="btn btn-primary"
            type="button"
            onClick={submitItemHandler}
          >
            Add Item
          </button>
        </div>

        <br />
        <br />
        <h6>{count}</h6>
        <button className="btn btn-primary" type="button" onClick={increment}>
          Manual Increment (+1)
        </button>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com/integrations/upstash"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by <b>Vercel</b> and <b>Upstash</b>
        </a>
      </footer>
    </div>
  );
}

export async function getServerSideProps() {
  const data = await redis.get("counter");

  let products = await getAllProducts();
  console.log(products);
  return { props: { data, products } };
}
