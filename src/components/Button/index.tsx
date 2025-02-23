interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const Button = ({ onClick, children }: ButtonProps) => {
  return (
    <button
      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 active:bg-blue-700 transition-colors font-medium"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
