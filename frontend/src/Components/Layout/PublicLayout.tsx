import React, { ReactNode } from 'react'

const PublicLayout = ({children} : {children : ReactNode}) => {
  return (
    <section className=''>
        <header className='h-18 bg-cyan-700'>
            Header
        </header>
        {children}
        <footer>
            footer
        </footer>
    </section>
  )
}

export default PublicLayout