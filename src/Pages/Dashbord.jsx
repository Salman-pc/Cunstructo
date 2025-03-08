import React from 'react'
import Header from '../Componets/Header'
import Category from '../Componets/Catogory/Catogory'
import Curosal from '../Componets/Curosal'


function Dashbord() {
  return (
    <div>
        <Header/>
        <div className='mt-10'>
            <Curosal/>        
            <Category/>
        </div>
    </div>
  )
}

export default Dashbord