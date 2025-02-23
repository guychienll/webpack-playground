interface BadgeProps {
  text: string;
  color: string;
}

function Badge({ text, color }: BadgeProps) {
  return (
    <div
      className={`absolute top-2 right-2 bg-${color}-500 text-white px-2 py-1 rounded-full text-sm`}
    >
      {text}
    </div>
  );
}

export { type BadgeProps };
export default Badge;
