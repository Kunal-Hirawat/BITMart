import React from 'react'
import Header from '../../pages/Header'
import Footer from '../Footer'

const Layout = ({children}) => {
  return (
    <div>
        <Header/>
        <main style={{minHeight:"70vh"}}>
            {children}
        </main>
        <Footer/>
    </div>
  )
}

export default Layout