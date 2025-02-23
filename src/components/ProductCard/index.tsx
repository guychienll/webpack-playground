import { Currency } from "../../types/global";
import Badge, { BadgeProps } from "../Badge";
import Button from "../Button";

interface ProductCardProps {
  title: string;
  description: string;
  price: number;
  image: string;
  currency: Currency;
  badge?: BadgeProps;
  onClick: () => void;
}

function ProductCard(props: ProductCardProps) {
  const { title, description, price, image, currency, badge, onClick } = props;
  return (
    <div className="bg-white rounded-lg duration-300 p-4 max-w-sm shadow-md border border-gray-200 hover:shadow-xl transition-shadow">
      <div className="relative overflow-hidden rounded-t-lg group">
        <img
          src={image}
          alt="Product"
          className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-500"
        />
        {badge && <Badge text={badge.text} color={badge.color} />}
      </div>
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-2 hover:text-blue-600 transition-colors cursor-pointer">
          {title}
        </h2>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 hover:line-clamp-none transition-all">
          {description}
        </p>
        <div className="flex justify-between items-center">
          <div className="flex flex-col transform hover:scale-105 transition-transform">
            <span className="text-sm text-gray-500 line-through">
              {currency.symbol} {Math.floor(price * 1.2)}
            </span>
            <span className="text-xl font-bold text-red-600">
              {currency.symbol} {price}
            </span>
          </div>
          <Button onClick={onClick}>
            <span className="flex items-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              加入購物車
            </span>
          </Button>
        </div>
        <div className="mt-4 flex items-center text-sm text-gray-500 hover:text-yellow-500 transition-colors cursor-pointer">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span className="hover:font-medium transition-all">
            4.8 (142 評價)
          </span>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
