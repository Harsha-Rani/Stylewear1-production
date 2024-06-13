
import React, { useEffect, useState } from 'react'
import { BsFillBagCheckFill } from 'react-icons/bs'
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai"
import Link from 'next/link'
import Head from 'next/head'
import Script from 'next/script'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from 'next/router'
// import sha256 from "crypto-js/sha256"
const sha256 = require("sha256");
import { redirect } from 'next/navigation'
const axios = require('axios');
// const uniqid = require("uniqid")
import { v4 as uuidv4 } from 'uuid';
// const axios= require("axios");
const CheckOut = ({ cart, clearCart, subTotal, addToCart, removeFromCart }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [state, setState] = useState('')
  const [city, setCity] = useState('')
  const [user, setUser] = useState({ value: null })
  const router = useRouter();
  useEffect(() => {
    const myuser = JSON.parse(localStorage.getItem('myuser'))
    if (myuser && myuser.token) {
      setUser(myuser)
      setEmail(myuser.email)
      fetchData(myuser.token)
    }
  }, [])

  useEffect(() => {
    if (name.length > 3 && email.length > 3 && phone.length > 3 && address.length > 3 && pincode.length > 3 && subTotal>0) {
      setDisabled(false);
    }
    else {
      setDisabled(true);
    }
  }, [name, email, phone, pincode, address])


  const fetchData = async (token) => {
    let data = { token: token }
    // console.log(data)
    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    let res = await a.json();
    // console.log(res)
    setName(res.name)
    setAddress(res.address)
    setPincode(res.pincode)
    setPhone(res.phone)
    getPinCode(res.pincode)
  }

  const getPinCode = async (pin) => {
    let pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`)
    let pinJson = await pins.json()
    if (Object.keys(pinJson).includes(pin)) {
      setState(pinJson[pin][1])
      setCity(pinJson[pin][0])
    }
    else {
      setState('');
      setCity('')
    }
  }

  const handleChange = async (e) => {
    // console.log(user, email)
    if (e.target.name == 'name') {
      setName(e.target.value)
    }
    else if (e.target.name == 'email') {
      setEmail(e.target.value)
    }
    else if (e.target.name == 'phone') {
      setPhone(e.target.value)
    }
    else if (e.target.name == 'address') {
      setAddress(e.target.value)
    }
    else if (e.target.name == 'pincode') {
      setPincode(e.target.value)
      if (e.target.value.length == 6) {
        getPinCode(e.target.value)
      }
      else {
        setState('');
        setCity('')
      }
    }
  }
  
 
  const initiatePayment = async () => {
      const transactionid = "Tr-"+uuidv4().toString(36).slice(-6);
      const data = { cart, subTotal, transactionid, email: email, name, address, pincode, phone,state };
        let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pretransaction`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
        let txnRes = await a.json();
        if(txnRes.success){
          console.log("done")
        }
      const payload = {
          merchantId: process.env.NEXT_PUBLIC_MERCHANT_ID,
          merchantTransactionId: transactionid,
          merchantUserId: 'MUID-'+uuidv4().toString(36).slice(-6),
          amount: subTotal*100,
          redirectUrl: `${process.env.NEXT_PUBLIC_HOST}/api/status/${transactionid}`,
          redirectMode: "POST",
          callbackUrl: `${process.env.NEXT_PUBLIC_HOST}/api/status/${transactionid}`,
          mobileNumber: phone,
          paymentInstrument: {
            type: "PAY_PAGE",
          },
        };


        const dataPayload = JSON.stringify(payload);
        console.log(dataPayload);

        const dataBase64 = Buffer.from(dataPayload).toString("base64");
        console.log(dataBase64);


    const fullURL =
          dataBase64 + "/pg/v1/pay" + process.env.NEXT_PUBLIC_SALT_KEY;
       const dataSha256 = sha256(fullURL);

        const checksum = dataSha256 + "###" + process.env.NEXT_PUBLIC_SALT_INDEX;
        console.log("c====",checksum);



      const UAT_PAY_API_URL =
      "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay";


    const response = await axios.post(
      UAT_PAY_API_URL,
      {
        request: dataBase64,
      },
      {
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
           "X-VERIFY": checksum,
        },
      }
    );


    const redirect=response.data.data.instrumentResponse.redirectInfo.url;
    router.push(redirect)


  
  }
  
  return (
    <div className="container md:ml-10 px-2 sm:m-auto min-h-screen">
      <ToastContainer
        position="top-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Head><meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" />
        <title>Checkout- StyleWear.com</title>
      </Head>
      <Script type="application/javascript" src={`${process.env.NEXT_PUBLIC_PAYTM_HOST}/merchantpgpui/checkoutjs/merchants/${process.env.NEXT_PUBLIC_PAYTM_MID}.js`} crossorigin="anonymous" />

      <h1 className="font-bold text-3xl my-8 text-center">Checkout</h1>
      <h2 className="font-bold text-xl">1. Delivery Details</h2>
      <div className="mx-auto flex my-2">
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">Name</label>
            <input onChange={handleChange} placeholder='Enter your Name' value={name} type="name" id="name" name="name" className="w-full bg-white rounded border border-gray-300 focus:border-slate-500 focus:ring-2 focus:ring-slate-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
        <div className="px-2 md:mr-10 w-1/2">
          <div className="mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
            {user && user.token ? <input value={user.email} type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-slate-500 focus:ring-2 focus:ring-slate-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" readOnly />
              : <input onChange={handleChange} placeholder='Enter your Email' value={email} type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-slate-500 focus:ring-2 focus:ring-slate-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />}
          </div>
        </div>
      </div>
      <div className="px-2  w-11/12">
        <div className="mb-4">
          <label htmlFor="email" className="leading-7 text-sm text-gray-600">Address</label>
          <textarea onChange={handleChange} placeholder="Enter your Address" id="email" name="address" cols="30" rows="2" value={address} className="w-full bg-white rounded border border-gray-300 focus:border-slate-500 focus:ring-2 focus:ring-slate-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" ></textarea>
        </div>
      </div>
      <div className="mx-auto flex my-2">
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="phone" className="leading-7 text-sm text-gray-600">Phone Number</label>
            <input onChange={handleChange} placeholder='Your 10 Digit Phone Number' type="phone" value={phone} id="phone" name="phone" className="w-full bg-white rounded border border-gray-300 focus:border-slate-500 focus:ring-2 focus:ring-slate-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
        <div className="px-2 md:mr-10 w-1/2">
          <div className="mb-4">
            <label htmlFor="pincode" className="leading-7 text-sm text-gray-600">Pincode</label>
            <input onChange={handleChange} placeholder='PinCode' type="text" id="pincode" value={pincode} name="pincode" className="w-full bg-white rounded border border-gray-300 focus:border-slate-500 focus:ring-2 focus:ring-slate-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>

        </div>
      </div>
      <div className="mx-auto flex my-2">
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="state" className="leading-7 text-sm text-gray-600">State</label>
            <input onChange={handleChange} placeholder='State' value={state} type="text" id="state" name="state" className="w-full bg-white rounded border border-gray-300 focus:border-slate-500 focus:ring-2 focus:ring-slate-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
        <div className="px-2 md:mr-10 w-1/2">
          <div className="mb-4">
            <label htmlFor="city" className="leading-7 text-sm text-gray-600">District</label>
            <input onChange={handleChange} placeholder='District' value={city} type="text" id="city" name="city" className="w-full bg-white rounded border border-gray-300 focus:border-slate-500 focus:ring-2 focus:ring-slate-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
      </div>
      <h2 className="font-bold text-xl">2. Review Cart Items & Pay</h2>
      <div className="sideCart  bg-slate-100 p-6 m-2 md:mr-20">

        <ol className='list-decimal font-bold'>
          {Object.keys(cart).length == 0 && <div className="my-4 font-semibold">Your cart is empty!!</div>}

          {Object.keys(cart).map((k) => {
            return <li key={k} >
              <div className="item flex my-5">
                <span className=" font-semibold">{cart[k].name}({cart[k].size}/{cart[k].variant})</span>
                <span className="flex items-center justify-center w-1/3 text-lg">
                  <AiFillMinusCircle onClick={() => { removeFromCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant) }} className="cursor-pointer text-slate-500" /><span className="mx-2 text-sm">{cart[k].qty}</span><AiFillPlusCircle onClick={() => { addToCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant) }} className="cursor-pointer text-slate-500" /></span>
              </div>
            </li>
          })}
        </ol>

        <span className="font-bold">Subtotal: ₹{subTotal}</span>

      </div>
      <div className="mx-4">
        {/* <button disabled={disabled} onClick={initiatePayment} className="disabled:bg-slate-300 flex mr-2 space-x-2 text-white bg-slate-500 border-0 py-2 px-2 focus:outline-none hover:bg-slate-600 rounded text-sm w-35"><BsFillBagCheckFill className="m-1" />Pay ₹{subTotal}</button> */}
        <Link href={"/checkout"}><button disabled={disabled} onClick={initiatePayment} className="disabled:bg-slate-300 flex mr-2 space-x-2 text-white bg-slate-500 border-0 py-2 px-2 focus:outline-none hover:bg-slate-600 rounded text-sm w-35"><BsFillBagCheckFill className="m-1" />Pay ₹{subTotal}</button></Link>
      </div>
    </div>
  )
}

export default CheckOut
