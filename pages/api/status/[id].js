import { NextResponse } from "next/server";
import sha256 from "crypto-js/sha256";
import axios from "axios";
import Order from "@/models/Order";
import Product from "@/models/Product";
export default async function POST(req, res) {
//   const data = await req.body();
//   console.log(data);
//   const status = data.get("code");
//   const merchantId = data.get("merchantId");
//   const transactionId = data.get("transactionId");
// const { code, merchantId, transactionId } = req.body;
//   const st =
//     `/pg/v1/status/${merchantId}/${transactionId}` +
//     process.env.NEXT_PUBLIC_SALT_KEY;
//   // console.log(st)
//   const dataSha256 = sha256(st);

//   const checksum = dataSha256 + "###" + process.env.NEXT_PUBLIC_SALT_INDEX;
//   console.log(checksum);

const {  transactionId } = req.body;
console.log(req.body)
  const merchantId = process.env.NEXT_PUBLIC_MERCHANT_ID;
  const saltKey = process.env.NEXT_PUBLIC_SALT_KEY;
  const saltIndex = process.env.NEXT_PUBLIC_SALT_INDEX;
console.log(merchantId,transactionId)
  const st = `/pg/v1/status/${merchantId}/${transactionId}` + saltKey;
  const dataSha256 = sha256(st);
  const checksum = dataSha256 + "###" + saltIndex;
  
  

  const options = {
    method: "GET",
    url: `https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status/${merchantId}/${transactionId}`,
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      "X-VERIFY": checksum,
      "X-MERCHANT-ID": `${merchantId}`,
    },
  };

  // CHECK PAYMENT STATUS
  const response = await axios.request(options);
//   console.log("r===", response.data.code);

let order;
  if (response.data.code == "PAYMENT_SUCCESS"){
//   return NextResponse.redirect("http://localhost:3000/success",{
//     status: 301,
//   });
order=await Order.findOneAndUpdate({orderId: transactionId},{status: 'Paid'})
let products = order.products

for(let slug in products){
    await Product.findOneAndUpdate({slug: slug}, {$inc: {"availableQty": -products[slug].qty}})
  }
res.redirect('/orders?clearCart=1',200)}
else return NextResponse.redirect("http://localhost:3000/failure",{
  // a 301 status is required to redirect from a POST to a GET route
  status: 301,
});


}