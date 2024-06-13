import Image from "next/image";
import { Inter } from "next/font/google";
import Head from "next/head";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div>
    <Head>
      <title>StyleWear.com - Wear The Style</title>
      <meta name="description" content="StyleWear.com - Wear the Style" />
      <link rel="icon" href="/Logo.png"/>
    </Head>
    
    <div className="min-h-screen ">
        <img src="/home1.webp" alt="home page img" />
      </div>
      <section className="text-gray-600 body-font sm:-mt-24">
        <div className="container px-5  mx-auto">
          <div className="flex flex-wrap w-full  lg:mt-20 mb-20 flex-col items-center text-center">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">Wear The Style with StyleWear.Com</h1>
            <p className="lg:w-1/2 w-full leading-relaxed text-gray-500">Get whatever you want here, People who want to code with style So,why not wear the style?</p>
          </div>
          <h1 className="text-black font-semibold text-xl pl-3">Our Trending Products</h1>
          <div className="flex ">
          <div className="lg:w-1/5 md:w-1/2 p-4 w-full cursor-pointer shadow-lg m-5">
            <Link  href={`/product/wear-the-code`}><div className="block relative rounded overflow-hidden">
              <img alt="ecommerce" className="m-auto   h-[36vh] block" src={"https://m.media-amazon.com/images/I/71GY246XqyL._SY741_.jpg"} />
              
            </div></Link></div>
            <div className="lg:w-1/5 md:w-1/2 p-4 w-full cursor-pointer shadow-lg m-5">
            <Link  href={`/product/Alan-Jones-Clothing-black`}><div className="block relative rounded overflow-hidden">
              <img alt="ecommerce" className="m-auto   h-[36vh] block" src={"https://m.media-amazon.com/images/I/61U21lQh9-L._SY879_.jpg"} />
              
            </div></Link></div>
            <div className="lg:w-1/5 md:w-1/2 max-md:hidden p-4 w-full cursor-pointer shadow-lg m-5">
            <Link  href={`/product/Pristine-Turkish-Espresso-Mug-Coaster`}><div className="block relative rounded overflow-hidden">
              <img alt="ecommerce" className="m-auto   h-[36vh] block" src={"https://m.media-amazon.com/images/I/611DNYnQ9XL._SY879_.jpg"} />
              
            </div></Link></div>
            <div className="lg:w-1/5 md:w-1/2 p-4 w-full max-sm:hidden cursor-pointer shadow-lg m-5">
            <Link  href={`/product/CodersParadise-Inspiration-Motivational-Inspirational`}><div className="block relative rounded overflow-hidden">
              <img alt="ecommerce" className="m-auto   h-[36vh] block" src={"https://m.media-amazon.com/images/I/61DKamG+ANL._SY300_SX300_.jpg"} />
              
            </div></Link></div>
            </div>
            </div> 
      </section>
    
    </div>
  );
}
