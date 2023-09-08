import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { VITE_BACKEND_URI } from '../App'

const EditPage = () => {
	let { id } = useParams()
	const [isLoading, setIsLoading] = useState(false)

	const [product, setProduct] = useState({
		name: '',
		quantity: '',
		price: '',
		image: '',
	})

	const navigate = useNavigate()

	// const [name, setName] = useState('')
	// const [quantity, setQuantity] = useState('')
	// const [price, setPrice] = useState('')
	// const [image, setImage] = useState('')

	const fetchProduct = async () => {
		try {
			setIsLoading(true)
			const response = await axios.get(`${VITE_BACKEND_URI}/api/products/${id}`)
			console.log('response data is ', response.data)
			setProduct({
				name: response.data.name,
				quantity: response.data.quantity,
				price: response.data.price,
				image: response.data.image,
			})
			setTimeout(() => {
				setIsLoading(false)
			}, 2000)
		} catch (error) {
			toast.error(error.message)
			setIsLoading(false)
		}
	}

	useEffect(() => {
		fetchProduct()
	}, [])

	const updateProduct = async (e) => {
		e.preventDefault()
		try {
			setIsLoading(true)
			const response = await axios.put(
				`${VITE_BACKEND_URI}/api/products/${id}`,
				product
			)
			toast.success(`Updated ${response.data.name} successfully!`)
			setIsLoading(false)
			setTimeout(() => {
				navigate('/')
			}, 2000)
		} catch (error) {
			toast.error(error.message)
			setIsLoading(false)
		}
	}

	return (
		<div className='max-w-lg bg-white shadow-lg mx-auto p-7 rounded mt-6'>
			<h2 className='font-semibold text-2xl mb-4 block text-center'>
				Update Product: <em className='text-blue-700'>{product.name}</em>
			</h2>
			{isLoading ? (
				<h1 className='text-5xl text-center font-bold text-red-200 my-5'>
					Loading...
				</h1>
			) : (
				<form onSubmit={updateProduct}>
					<div className='space-y-2'>
						<div>
							<label htmlFor=''>Name</label>
							<input
								type='text'
								value={product.name}
								onChange={(e) =>
									setProduct({ ...product, name: e.target.value })
								}
								className='w-full block border p-3 text-gray-600 rounded focus:outline-none focus: shadow-outline focus:border-blue-200 placeholder-gray-400'
								placeholder={product.name}
							/>
						</div>
						<div>
							<label htmlFor=''>Quantity</label>
							<input
								type='number'
								value={product.quantity}
								onChange={(e) =>
									setProduct({ ...product, quantity: e.target.value })
								}
								className='w-full block border p-3 text-gray-600 rounded focus:outline-none focus: shadow-outline focus:border-blue-200 placeholder-gray-400'
								placeholder={product.quantity}
							/>
						</div>
						<div>
							<label htmlFor=''>Price</label>
							<input
								type='number'
								value={product.price}
								onChange={(e) =>
									setProduct({ ...product, price: e.target.value })
								}
								className='w-full block border p-3 text-gray-600 rounded focus:outline-none focus: shadow-outline focus:border-blue-200 placeholder-gray-400'
								placeholder={product.price}
							/>
						</div>
						<div>
							<label htmlFor=''>Image URL</label>
							<input
								type='text'
								value={product.image}
								onChange={(e) =>
									setProduct({ ...product, image: e.target.value })
								}
								className='w-full block border p-3 text-gray-600 rounded focus:outline-none focus: shadow-outline focus:border-blue-200 placeholder-gray-400'
								placeholder={product.image}
							/>
						</div>
						<div>
							<img src={product.image} alt='' />
						</div>
						<div>
							{!isLoading && (
								<button className='block w-full mt-6 bg-blue-700 text-white rounded-sm px-4 py-2 font-bold hover:bg-blue-500 hover:cursor-pointer'>
									Update
								</button>
							)}
						</div>
					</div>
				</form>
			)}
		</div>
	)
}
export default EditPage
