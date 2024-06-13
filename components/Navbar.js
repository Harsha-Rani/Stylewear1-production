

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { BsFillBagCheckFill } from 'react-icons/bs'
import { MdAccountCircle } from "react-icons/md"
import { AiOutlineShoppingCart, AiFillCloseCircle, AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai"
import { useRouter } from 'next/router'
const Navbar = ({ Logout, user, cart, addToCart, removeFromCart, clearCart, subTotal }) => {
  // console.log(cart)
  const [sidebar, setSidebar] = useState(false)
  const [dropdown, setDropdown] = useState(false)
  const router = useRouter();
  useEffect(() => {
    Object.keys(cart).length !== 0 && setSidebar(true)
    let exempted = ['/checkout' , '/order', '/orders', '/myaccount']
    if (exempted.includes(router.pathname)) {
      setSidebar(false);
    }
    const token = localStorage.getItem('myuser')
    if(!token){
      setSidebar(false);
    }
  }, [])

  const toggleDropdown = () => {
    setDropdown(!dropdown)
  }
  const ref = useRef();
  const toggleCart = () => {
    setSidebar(!sidebar)
    // if (ref.current.classList.contains('translate-x-full')) {
    //   ref.current.classList.remove('translate-x-full')
    //   ref.current.classList.add('translate-x-0')
    // }
    // else if (!ref.current.classList.contains('translate-x-full')) {
    //   ref.current.classList.remove('translate-x-0')
    //   ref.current.classList.add('translate-x-full')
    // }
  }

  return (
    <>
      {!sidebar && <span className="fixed cursor-pointer right-10 top-9 z-30" onMouseOver={() => { setDropdown(true) }} onMouseLeave={() => { setDropdown(false) }}>
        {dropdown && <div onMouseOver={() => { setDropdown(true) }} onMouseLeave={() => { setDropdown(false) }} className="absolute bg-slate-200 right-2 top-5 py-2 rounded-md px-5 w-32 z-30">
          <ul>
            <Link href={'/myaccount'}><li className="py-1 hover:text-slate-500 text-sm font-bold">My Account</li></Link>
            <Link href={'/orders'}><li className="py-1 hover:text-slate-500 text-sm font-bold">My Orders</li></Link>
            <li onClick={Logout} className="py-1 hover:text-slate-500 text-sm font-bold">Logout</li>
          </ul>
        </div>}
        {user.value && <MdAccountCircle className="text-xl md:text-2xl mx-2 mr-8 md:mx-3" />}

          
      </span>}
      <div className={`flex  justify-center items-center flex-col md:flex-row md:justify-start shadow-md py-2 mb-1 sticky top-0 bg-white z-10 ${!sidebar && 'overflow-hidden'}`}>
        <div className="logo mr-auto md:mx-5">
          <Link href={"/"}><Image src="/Logo1.png" alt="" height={30} width={150} /></Link>
        </div>
        <div className="nav ">
          <ul className="flex items-center space-x-4 font-bold md:text-md">
            <Link href={"/tshirts"}><li className="hover:text-slate-600">Tshirts</li></Link>
            <Link href={"/hoodies"}><li className="hover:text-slate-600">Hoodies</li></Link>
            <Link href={"/stickers"}><li className="hover:text-slate-600">Stickers</li></Link>
            <Link href={"/mugs"}><li className="hover:text-slate-600">Mugs</li></Link>
          </ul>
        </div>
        <div className="cart absolute right-0 mx-5 items-center cursor-pointer flex top-9">
          
        {/* {user.value && <MdAccountCircle className="text-xl md:text-2xl mx-2 " />} */}
          {!user.value && <Link href={"/login"}><button className="cursor-pointer bg-slate-600 px-2 py-1 rounded-md text-sm text-white mx-2 ">Login</button></Link>}
          <AiOutlineShoppingCart onClick={toggleCart} className="text-xl md:text-2xl fixed top-9 right-6" />
        </div>

        <div ref={ref} className={`sideCart absolute overflow-y-scroll h-[100vh] bg-slate-100 py-10 px-8 w-72  top-0 transition-all ${sidebar ? 'right-0' : '-right-96'}`}>
          <h2 className="font-bold text-xl text-center">Shopping Cart</h2>
          <span onClick={toggleCart} className="absolute top-2 right-2 cursor-pointer text-2xl text-slate-500"><AiFillCloseCircle /></span>
          <ol className='list-decimal font-bold'>
            {(Object.keys(cart).length == 0 || !localStorage.getItem('myuser') ) && <div className="my-4 font-semibold">Your cart is empty!!</div>}

            {localStorage.getItem('myuser') && Object.keys(cart).map((k) => {
              return <li key={k} >
                <div className="item flex my-5">
                  <span className="w-2/3 font-semibold">{cart[k].name}({cart[k].size}/{cart[k].variant})</span>
                  <span className="flex items-center justify-center w-1/3 text-lg">
                    <AiFillMinusCircle onClick={() => { removeFromCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant) }} className="cursor-pointer text-slate-500" /><span className="mx-2 text-sm">{cart[k].qty}</span><AiFillPlusCircle onClick={() => { addToCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant) }} className="cursor-pointer text-slate-500" /></span>
                </div>
              </li>
            })}

          </ol>
          {localStorage.getItem('myuser') && <div className="font-bold my-2">Subtotal: ₹{subTotal}</div>}

          <div className="flex">
            <Link href={"/checkout"}><button disabled={Object.keys(cart).length === 0 || !localStorage.getItem('myuser')} className="disabled:bg-slate-300 flex mr-2 space-x-2 text-white bg-slate-500 border-0 py-2 px-2 focus:outline-none hover:bg-slate-600 rounded text-sm w-35"><BsFillBagCheckFill className="m-1" />CheckOut</button></Link>
            <button disabled={Object.keys(cart).length === 0 || !localStorage.getItem('myuser')} onClick={clearCart} className="flex mr-2 disabled:bg-slate-300 space-x-2 text-white bg-slate-500 border-0 py-2 px-2 focus:outline-none hover:bg-slate-600 rounded text-sm w-35">Clear Cart</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar
