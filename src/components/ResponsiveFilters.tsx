
import { ReactNode } from 'react';

interface ResponsiveFiltersProps {
  children: ReactNode;
}

const ResponsiveFilters = ({ children }: ResponsiveFiltersProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 lg:p-8 xl:p-10 mb-6 sm:mb-8 lg:mb-10 xl:mb-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-6 gap-3 sm:gap-4 lg:gap-5 xl:gap-6">
        {children}
      </div>
    </div>
  );
};

export default ResponsiveFilters;
