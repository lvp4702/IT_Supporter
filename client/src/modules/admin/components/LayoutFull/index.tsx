import React from 'react';
import Navigation from '../navigation/Navigation';
import Header from '../header/Header';

interface LayoutFullProps {
  children: React.ReactNode;
}

const LayoutFull = ({ children }: LayoutFullProps) => {
  return (
    <div>
      <Header />
      <div className="flex">
        <Navigation />
        <div className="bg-[#F5F5F5] flex-1">{children}</div>
      </div>
    </div>
  );
};

export default LayoutFull;
