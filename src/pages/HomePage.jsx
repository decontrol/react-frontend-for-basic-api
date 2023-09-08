import { useEffect, useState } from 'react'
import axios from 'axios'
import Product from '../components/Product'
import { Link } from 'react-router-dom'

const HomePage = () => {
	const [products, setProducts] = useState([])

	const [isLoading, setIsLoading] = useState(false)

	const getProducts = async () => {
		try {
			setIsLoading(true)
			const response = await axios.get('http://localhost:3000/api/products')
			// console.log(response.data)
			setProducts(response.data)
			setTimeout(() => {
				setIsLoading(false)
			}, 1000)
		} catch (error) {
			console.log(error.message)
			setIsLoading(false)
		}
	}
	useEffect(() => {
		getProducts()
	}, [])

	return (
		<div>
			<div>
				<Link
					to='/create'
					className='inline-block mt-4 shadow-md bg-blue-700 text-white rounded-sm px-4 py-2 font-bold hover:bg-blue-500 hover:cursor-pointer'
				>
					Create a Product
				</Link>
			</div>
			<div className='grid grid-cols-2 lg:grid-cols-4 gap-4 mt-5'>
				{isLoading ? (
					<h1>Loading...</h1>
				) : products.length > 0 ? (
					products.map((product, index) => {
						return <Product key={index} product={product} />
					})
				) : (
					<h1>There are no products</h1>
				)}
			</div>
		</div>
	)
}
export default HomePage
