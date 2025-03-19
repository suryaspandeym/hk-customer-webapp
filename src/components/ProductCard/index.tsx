import React from 'react';
import ImagePaceHolder from '@assets/images/imagePlaceholder.png';

const ProductCard = ({ product }: any) => {
	return (
		<div className="relative w-[285px] h-[159px] rounded-[12px] overflow-hidden group">
			<img
				src={product.imageUrl || ImagePaceHolder}
				alt={product.productName}
				className="w-full h-full object-cover rounded-[12px] transition-transform duration-300 group-hover:scale-110"
			/>
			<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent transition-opacity duration-300 group-hover:opacity-80" />
			<div className="absolute bottom-4 left-4 right-4 text-white transition-transform duration-300 group-hover:-translate-y-1">
				<h3 className="text-2xl font-semibold ">{product.productName}</h3>
			</div>
		</div>
	);
};

export default ProductCard;
