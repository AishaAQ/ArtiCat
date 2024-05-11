'use client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import React from 'react'

export default function Home() {
  const router = useRouter()
  useEffect(() => {router.push('/mainpage.html')},[])
  return (
    <></>
  )
}
