'use client'
import React from 'react'
import { Button } from '../ui/button'
import { useRouter } from 'next/router'
import { logOutAction } from '@/actions';

export default function LogOut() {
   
    async function handleLogOut(){
        await logOutAction();
    }
  return (
    <Button onClick={handleLogOut}>LogOut</Button>
  )
}
