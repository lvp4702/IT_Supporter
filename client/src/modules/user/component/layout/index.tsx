import React, { ReactNode } from 'react';
import Footer from '../footer';
import Header from '../header';

interface props {
  children: React.ReactNode;
}

const LayoutFullUser = ({ children }: props) => {
  return (
    <div>
      <Header />
      <div className="bg-[#F3F4F6]">{children}</div>
      <Footer />
    </div>
  );
};

export default LayoutFullUser;
