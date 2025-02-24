import * as Sentry from '@sentry/browser';
import Badge, { BadgeProps } from '@/components/Badge';
import Button from '@/components/Button';

interface Currency {
  symbol: string;
  code: string;
}

interface CardProps {
  title: string;
  description: string;
  price: number;
  image: string;
  currency: Currency;
  badge?: BadgeProps;
}

function ProductCard(props: CardProps) {
  const { title, description, price, image, currency, badge } = props;
  return (
    <div className="bg-white rounded-lg duration-300 p-4 max-w-sm shadow-md border border-gray-200">
      <div className="relative overflow-hidden rounded-t-lg">
        <img
          src={image}
          alt="Product"
          className="w-full h-48 object-cover transform hover:scale-105 transition-transform duration-300"
        />
        {badge && <Badge text={badge.text} color={badge.color} />}
      </div>
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-2 hover:text-blue-600 transition-colors">{title}</h2>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-sm text-gray-500 line-through">
              {currency.symbol} {Math.floor(price * 1.2)}
            </span>
            <span className="text-xl font-bold text-red-600">
              {currency.symbol} {price}
            </span>
          </div>
          <Button
            onClick={() => {
              try {
                console.log('click');
                throw new Error('特別錯誤訊息');
              } catch (error) {
                console.error(error);
                Sentry.captureException(error);
              }
            }}
          >
            加入購物車
          </Button>
        </div>
        <div className="mt-4 flex items-center text-sm text-gray-500">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          4.8 (142 評價)
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
