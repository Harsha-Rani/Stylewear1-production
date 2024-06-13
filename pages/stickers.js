import Link from 'next/link'
import React from 'react'
import Product from '@/models/Product'
import mongoose from 'mongoose'
const Stickers = (props) => {
  const prod=props.products
  return (
    <section className="text-gray-600 body-font min-h-screen">
      <div className="container px-5 py-24 md:ml-[5vh] md:mr-[7vh] mx-auto">
        <div className="flex flex-wrap w-screen">
          {Object.keys(prod).length === 0 && <p>Sorry, all stickers are currently out of stock. New stock comming soon. Stay Tuned!!</p>}
         {Object.keys(prod) && Object.keys(prod).map((item) =>{
            return <div key={prod[item]._id}  className="lg:w-1/5 md:w-2/6  p-4 w-full cursor-pointer shadow-lg m-5">
            <Link passHref={true} href={`/product/${prod[item].slug}`}><div className="block relative rounded overflow-hidden">
              <img alt="ecommerce" className="m-auto   h-[36vh] block" src={prod[item].img} />
              <div className="mt-4 text-center md:text-left">
                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">Stickers</h3>
                <h2 className="text-gray-900 title-font text-lg font-medium">{prod[item].title}</h2>
                <p className="mt-1">₹{prod[item].price}</p>
                <p className="mt-1">
                  {prod[item].size.includes('S') && <span className="border border-gray-300 px-1 mx-1">S</span>}
                  {prod[item].size.includes('M') && <span className="border border-gray-300 px-1 mx-1">M</span>}
                  {prod[item].size.includes('L') && <span className="border border-gray-300 px-1 mx-1">L</span>}
                  {prod[item].size.includes('XL') && <span className="border border-gray-300 px-1 mx-1">XL</span>}
                  {prod[item].size.includes('XXL') && <span className="border border-gray-300 px-1 mx-1">XXL</span>}
                </p>
                <p className="mt-1">
                  {prod[item].color.includes('maroon') && <button className="border-2 border-gray-300 ml-1 bg-pink-950 rounded-full w-6 h-6 focus:outline-none"></button>}
                  {prod[item].color.includes('black') && <button className="border-2 border-gray-300 ml-1 bg-black rounded-full w-6 h-6 focus:outline-none"></button>}
                  {prod[item].color.includes('cream') && <button className="border-2 border-gray-300 ml-1 bg-yellow-100 rounded-full w-6 h-6 focus:outline-none"></button>}
                  {prod[item].color.includes('green') && <button className="border-2 border-gray-300 ml-1 bg-green-950 rounded-full w-6 h-6 focus:outline-none"></button>}

                </p>
              </div>
            </div></Link>
         </div>})} 
        </div>
      </div>
    </section>
  )
}

export async function getServerSideProps(context){
  if(!mongoose.connections[0].readyState){
    await mongoose.connect(process.env.MONGO_URI)
  }
  let products= await Product.find({category: 'stickers'})
  let stickers = {}
    for(let item of products){
        if(item.title in stickers){
            if(!stickers[item.title].color.includes(item.color) && item.availableQty>0){
                stickers[item.title].color.push(item.color)
            }
            if(!stickers[item.title].size.includes(item.size) && item.availableQty>0){
                stickers[item.title].size.push(item.size)
            }
        }
        else{
            stickers[item.title] = JSON.parse(JSON.stringify(item))
            if(item.availableQty >0){
                stickers[item.title].color =[item.color]
                stickers[item.title].size = [item.size]
            }
        }
    }
  // console.log(stickers)
  return {
    props:{products: JSON.parse(JSON.stringify(stickers)) },
  }
}

export default Stickers
