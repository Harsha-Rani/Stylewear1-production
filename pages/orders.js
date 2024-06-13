import React, { useEffect,useState } from 'react'
import mongoose from 'mongoose'
import Order from '@/models/Order'
import { useRouter } from 'next/router'
import Link from 'next/link'

const Orders = ({clearCart}) => {
    const router = useRouter()
    const [orders,setOrders] = useState([])
    useEffect(() => {
        let fetchOrders = async () => {
            let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/myorders`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token: JSON.parse(localStorage.getItem('myuser')).token }),
            })
            let res = await a.json();
            setOrders(res.orders)
            // console.log(res);
        }
        if (!localStorage.getItem('myuser')) {
            router.push('/')
        }
        else {
            fetchOrders()
        }
            // const d = new Date(order.createdAt)
            // setDate(d);
            if (router.query.clearCart == 1) {
              clearCart()
        
            }

    }, [router.query])
    return (
        <div className="min-h-screen">
            <div className="container mx-auto p-10">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <h1 className="font-semibold text-lg text-center p-8">My Orders</h1>
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                                    #
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Email
                                </th>
                                <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                                    Amount
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Details
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((item) =>{
                               return  <tr key={item._id} className="border-b border-gray-200 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                    {item.orderId}
                                </th>
                                <td className="px-6 py-4">
                                    {item.email}
                                </td>
                                <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                                    {item.amount}
                                </td>
                                <td className="px-6 py-4">
                                    <Link href={'/order?id=' + item._id}>Details</Link>
                                </td>
                            </tr>
                            })}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    )
}


export default Orders