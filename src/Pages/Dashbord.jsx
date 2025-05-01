import React from 'react'
import Header from '../Componets/Header'
import Category from './Catogory/Catogory'
import Curosal from '../Componets/Curosal'
import Footer from '../Componets/Footer'

function Dashbord() {

  // Triggers a re-render
  return (
    <div className='min-h-screen flex flex-col'>
      <Header />
      <div className='mt-10 flex-1'>
        <Curosal />
        <Category />
      </div>
      <Footer />
    </div>
  )
}

export default Dashbord