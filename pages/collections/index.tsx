import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import client from '../../sanity'
import HeaderBar from '../../components/HeaderBar'
import Navbar from '../../components/Navbar'
import ProductCard from '../../components/ProductCard'

function Home () {

    const [products, setProducts] = useState<any[]>([])
    useEffect(() =>{
        //https://www.sanity.io/docs/js-client
        //const query = '*[_type == "bike" && seats >= $minSeats] {name, seats}'
        const query = '*[_type == "product"]'
        const params = {}

        client.fetch(query, params).then((data:any) => {
            setProducts(data)
        })
        
   
    }, [])
  return (
    <div>
      <Head>
        <title>Toni Design</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='flex flex-col bg-gray-100 w-screen h-screen'>
        <HeaderBar/>
        <Navbar/>
        <div className='flex space-x-2 p-4'>
        {products.map(product =>(
          <ProductCard title={product.title} image={product.image} price={product.price} width={product.width} height={product.height}/>
        ))}
        </div>
      </main>
    </div>
  )
}
export default Home