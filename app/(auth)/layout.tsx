import Image from 'next/image'
import React from 'react'

const AuthLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className='grid lg:grid-cols-2 h-full items-center justify-center'>
        <div className='flex items-center justify-center'>{children}</div>
        <div className='hidden lg:flex lg:bg-stone-300 h-full items-center justify-center lg:flex-col'>
            <Image src="/logo.svg" alt="Logo Highline Motors" width="80" height="80"/>
        <h1 className='text-xl font-bold'>Highline Motors</h1>

        </div>
    </div>
  )
}

export default AuthLayout



