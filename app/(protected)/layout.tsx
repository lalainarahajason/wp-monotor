import React from 'react'

function ProtecedLayout({children}:{children: React.ReactNode}) {
  return (
    <div className='w-full h-full flex flex-col gap-y-10 items-center justify-center'>
        {children}
    </div>
  )
}

export default ProtecedLayout