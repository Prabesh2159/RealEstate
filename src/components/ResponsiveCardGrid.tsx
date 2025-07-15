
import { ReactNode } from 'react';

interface ResponsiveCardGridProps {
  children: ReactNode;
  columns?: 1 | 2 | 3 | 4;
  gap?: 'sm' | 'md' | 'lg';
}

const ResponsiveCardGrid = ({ 
  children, 
  columns = 3, 
  gap = 'lg' 
}: ResponsiveCardGridProps) => {
  const getGridClasses = () => {
    const gapClasses = {
      sm: 'gap-4 lg:gap-5 xl:gap-6',
      md: 'gap-6 lg:gap-7 xl:gap-8',
      lg: 'gap-6 sm:gap-8 lg:gap-10 xl:gap-12 2xl:gap-14'
    };

    const columnClasses = {
      1: 'grid-cols-1',
      2: 'grid-cols-1 sm:grid-cols-2',
      3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
      4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4'
    };

    return `grid ${columnClasses[columns]} ${gapClasses[gap]}`;
  };

  return (
    <div className={getGridClasses()}>
      {children}
    </div>
  );
};

export default ResponsiveCardGrid;
