import "@/styles/globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import LoadingBar from "react-top-loading-bar";
import Head from "next/head";
export default function App({ Component, pageProps }) {
  const [cart,setCart] = useState({})
  const [subTotal, setSubTotal] =useState(0)
  const router= useRouter();
  const [user,setUser] = useState({value: null})
  const [progress, setProgress]= useState(0);
  const [key,setKey] =useState('')
  useEffect(() =>{
    router.events.on('routeChangeStart', () =>{
      setProgress(40)
    })
    router.events.on('routeChangeComplete', () =>{
      setProgress(100)
    })
    try{
      if(localStorage.getItem("cart")){
        // console.log(cart)
        setCart(JSON.parse(localStorage.getItem("cart")))
        saveCart(JSON.parse(localStorage.getItem("cart")))

      }
    }
    catch (error){
      console.error(error);
      localStorage.clear()
    }
    const myuser =JSON.parse(localStorage.getItem('myuser'))
    if(myuser){
      setUser({value:myuser.token, email: myuser.email});
    }
    setKey(Math.random())

  },[router.query])
  
  const logout= ()=>{
    localStorage.removeItem('myuser');
    // localStorage.removeItem('token');
    // localStorage.removeItem('cart');

    setUser({value: null})
    setKey(Math.random())
    router.push("/")
  }

  const saveCart = (myCart) =>{
    localStorage.setItem("cart",JSON.stringify(myCart))
    let subt=0;
    let keys=Object.keys(myCart)
    for(let i=0;i<keys.length;i++){
      subt+=myCart[keys[i]].price * myCart[keys[i]].qty
    }
    setSubTotal(subt)
  }
  const addToCart = (itemCode, qty, price,name,size,variant)=>{
    if(Object.keys(cart).length == 0){
      setKey(Math.random())
    }
    let newCart=cart;
    if(itemCode in cart){
      newCart[itemCode].qty =cart[itemCode].qty + qty
    }
    else{
      newCart[itemCode] = {qty: 1,price,name,size,variant}
    }
    setCart(newCart)
    saveCart(newCart)
  
  }

  const buyNow= (itemCode, qty, price,name,size,variant)=>{
    let newCart={};
    newCart[itemCode] = {qty: 1,price,name,size,variant}
    setCart(newCart)
    saveCart(newCart)
    router.push('/checkout')
   }

  const clearCart = ()=>{
    setCart({})
    saveCart({})
  }
  const removeFromCart = (itemCode, qty, price,name,size,variant)=>{
    let newCart=cart;
    if(itemCode in cart){
      newCart[itemCode].qty =cart[itemCode].qty - qty
    }
    if(newCart[itemCode]["qty"]<=0){
      delete newCart[itemCode]
    }
    setCart(newCart)
    saveCart(newCart)
  }

  return <>
  <Head>
        <title>StyleWear.Com - Wear the Style</title>
        <meta name="description" content="StyleWear.com - Wear the Style" />
        <link rel="icon" href="/Logo.png" />
      </Head>
  <LoadingBar
    color='#CCCCCC'
    progress={progress}
    waitingTime={300}
    onLoaderFinished={() => setProgress(0)}
  />
  {key && <Navbar Logout={logout} user={user} key={key} cart={cart}  addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal} />}
  <Component cart={cart} buyNow={buyNow} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal} {...pageProps} />;
  <Footer />
  </>
}

