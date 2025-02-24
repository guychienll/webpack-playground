import clsx from 'clsx';

interface BadgeProps {
  text: string;
  color: 'positive' | 'critical' | 'neutral';
}

const colorMap = {
  positive: 'bg-green-500',
  critical: 'bg-red-500',
  neutral: 'bg-gray-500',
};

function Badge({ text, color }: BadgeProps) {
  return (
    <div className={clsx('absolute top-2 right-2', colorMap[color], 'text-white px-2 py-1 rounded-full text-sm')}>
      {text}
    </div>
  );
}

export { type BadgeProps };
export default Badge;
