import React from 'react'

type WrapperProps = {
  children: React.ReactNode;
};

const Wrapper = ({ children } : WrapperProps) => {
  return (
    <div className='max-w-5xl md:px-6max-w-5xl mx-auto px-6 flex items-center justify-center'>{children}</div>
  )
}

export default Wrapper