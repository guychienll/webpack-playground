import * as Sentry from '@sentry/browser';
import React from 'react';

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    // 確保錯誤被捕獲時更新狀態
    console.log('getDerivedStateFromError 被觸發', error);
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // 增加錯誤日誌記錄
    console.error('錯誤邊界捕獲到錯誤:', error);
    console.error('元件堆疊追蹤:', errorInfo.componentStack);

    // 確保 Sentry 正確捕獲錯誤
    try {
      Sentry.withScope((scope) => {
        scope.setExtra('componentStack', errorInfo.componentStack);
        scope.setLevel('error');
        Sentry.captureException(error);
      });
    } catch (sentryError) {
      console.error('Sentry 報告錯誤失敗:', sentryError);
    }

    // 確保狀態被更新
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary p-4 text-center bg-red-50 rounded-lg">
          <h2 className="text-xl font-bold text-red-600 mb-2">系統發生錯誤</h2>
          <p className="text-gray-600 mb-4">很抱歉，程式發生了意外狀況</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            重新整理頁面
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
