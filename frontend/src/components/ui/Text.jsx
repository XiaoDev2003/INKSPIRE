// src/components/ui/Text/Text.jsx
const Text = ({ as: Tag = 'p', size = 'base', weight = 'normal', color = 'text-gray-700', className = '', children }) => {
  const sizes = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
    '4xl': 'text-4xl',
  };

  const weights = {
    thin: 'font-thin',
    light: 'font-light',
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
  };

  return (
    <Tag className={`${sizes[size]} ${weights[weight]} ${color} ${className}`}>
      {children}
    </Tag>
  );
};

export default Text;