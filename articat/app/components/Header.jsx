'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import '@/app/header.css'

export default function Header() {

    const router = useRouter()

    function onClick() {
        
        delete localStorage.currentUser
        router.push('mainpage.html')
    }

  return (
    <div className="page">

    <header className="head">
        <img src="images/no bg logo.PNG" alt="logo" className="logo" id="logo"></img>
        <div className="top-bar">
          <h1 className="title">Dashboard</h1>
          <button className="signInButton" id="signInBtn" onClick={onClick}>Sign Out</button>
        </div>
        {/* <!-- Navigation --> */}
        <nav className="nav">
            <ul className="flex">
                <li><a href="#basic">Basic Statistics</a></li>
                <li><a href="#topProducts">Top 3 Products</a></li>
                <li><a href="#topCompanies">Top Contributing Companies</a></li>
                <li><a href="#monthly">Monthly Revenue Per Category</a></li>
                <li><a href="#country">Customers Per Country</a></li>
                <li><a href="#topClicked">Most Clicked Products</a></li>
            </ul>
        </nav>
       

    </header>
    <hr/>
        {/* page end div */}
        </div> 
  )
}
