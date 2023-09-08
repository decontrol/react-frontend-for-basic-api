import { Link } from 'react-router-dom'

/* eslint-disable react/prop-types */
const Product = ({ product }) => {
	let USDollar = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
	})

	return (
		<>
			<div className='bg-white border-4 border-white rounded shadow-lg overflow-hidden'>
				<img
					src={product.image}
					alt={product.name}
					className='w-full h-28 object-cover'
				/>
				<div className='px-4 pt-2 pb-4'>
					<h2 className='text font-semi-bold truncate ...'>{product.name}</h2>
					<div className='text-sm'>Quantiy: {product.quantity}</div>
					<div className='text-sm'>Price: {USDollar.format(product.price)}</div>
					<div className='pt-2 flex gap-4'>
						<Link
							to={`/edit/${product._id}`}
							className='inline-block w-full text-center shadow-md text-small bg-gray-700 text-white rounded-sm px-4 py-1 fiont-bold hover:bg-gray-500 hover:cursor-pointer'
						>
							Edit
						</Link>
						<Link
							to={`/delete/${product._id}`}
							className='inline-block w-full text-center shadow-md text-small bg-red-700 text-white rounded-sm px-4 py-1 fiont-bold hover:bg-red-500 hover:cursor-pointer'
						>
							Delete
						</Link>
					</div>
				</div>
			</div>
		</>
	)
}
export default Product
