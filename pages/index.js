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

  const increment = async () => {
    const response = await fetch("/api/incr", { method: "POST" });
    const data = await response.json();
    setCount(data.count);
  };

  const setOnModalHandler = (e) => {
    setOnModal((prev) => !prev);
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
                productImagePath={item.imagePath}
              />
            );
          })}
        </div>

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

  // const products = [
  //   {
  //     productID: 1,
  //     productName: "Slipper",
  //     productDescription: "Slippers are good for walking around!!",
  //   },
  //   {
  //     productID: 1,
  //     productName: "Shopping Bag",
  //     productDescription: "This Bag is good for carrying things!",
  //     imagePath: "images/shoppingBags.jpg",
  //   },
  // ];
  let products = await getAllProducts();
  console.log(products);
  return { props: { data, products } };
}
