import WebpackLogo from '@/assets/webpack.svg';
import ErrorBoundary from '@/components/ErrorBoundary';
import ProductCard from '@/components/ProductCard';
import '@/core/sentry';
import '@/index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';

function App() {
  return (
    <ErrorBoundary>
      <div className="container mx-auto p-8 flex flex-col items-center justify-center min-h-screen">
        <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center space-y-6">
          <WebpackLogo className="w-24 h-24 hover:scale-110 transition-transform" />
          <ProductCard
            title="Product Name"
            description="This is a product description."
            price={1999}
            image="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=200&fit=crop"
            currency={{ symbol: 'NT$', code: 'TWD' }}
            badge={{ text: '熱賣中', color: 'critical' }}
          />
        </div>
      </div>
    </ErrorBoundary>
  );
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
