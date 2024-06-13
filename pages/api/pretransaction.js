const https = require('https');
import Order from "@/models/Order";
import connectDb from "@/middleware/mongoose";
// const PaytmChecksum = require('paytmchecksum');
// import pincodes from '../../pincodes.json'
// import Product from "@/models/Product";
// const Razorpay= require('razorpay');
// const PaytmChecksum = require('./PaytmChecksum');

const handler = async (req, res) => {
    if (req.method == 'POST') {
        console.log(req.body)
        // check if the pincode is serviceable or not
        // if(!Object.keys(pincodes).includes(req.body.pincode)){
        //     res.status(200).json({success: false,"error": "Pincode you have entered is not serviceable.",cartClear: false})
        //     return ;
        // }
        // // check if the cart is tampered with
        // let product,sumTotal =0;
        // let cart = req.body.cart;
        // if(req.body.subTotal <=0){
        //     res.status(200).json({success: false,"error": "Please build your cart and try again!!",cartClear: false})
        //     return ;
        // }

        // for(let item in cart){
        //     // console.log(item);
        //     sumTotal += cart[item].price * cart[item].qty;
        //     product = await Product.findOne({slug: item});
        //     //check if the items are out of stock 
        //     if(product.availableQty < cart[item].qty){
        //         res.status(200).json({success: false,"error": "Some items in your cart are out of stock",cartClear: true})
        //         return;
        //     }
        //     if(product.price != cart[item].price){
        //         res.status(200).json({success: false,"error": "The price of some items is changed so please try again later",cartClear: true})
        //         return;
        //     }
        // }
        // if(sumTotal!== req.body.subTotal){
        //     res.status(200).json({success: false,"error": "The price of some items is changed so please try again later",cartClear: true})
        //     return ;
        // }

        // //check if the details are valid
        // if(req.body.phone.length!==10 || !Number.isInteger(Number(req.body.phone))){
        //     res.status(200).json({success: false,"error": "Please enter your 10 digit phone number.",cartClear: false})
        //     return ;
        // }
        // if(req.body.pincode.length!==6 || !Number.isInteger(Number(req.body.pincode))){
        //     res.status(200).json({success: false,"error": "Please enter your 6 digit pincode.",cartClear: false})
        //     return ;
        // }


        let order= new Order({
            email: req.body.email,
            orderId: req.body.transactionid,
            address: req.body.address,
            name: req.body.name,
            // state: req.body.state,
            phone: req.body.phone,
            pincode: req.body.pincode,
            amount: req.body.subTotal,
            products: req.body.cart
        })
        console.log(order)
        await order.save()
        res.status(200).json({ success: "success" })

        // Insert an entry in orders table with stats as pending
        
    }
}
export default connectDb(handler)
