'use client'

import React, { useState } from 'react'
import { initialLoginFormData, userLoginFormControls } from '../utils'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import CommonFormElement from '@/components/form-element/page'
import { loginUserAction } from '@/actions'
import { useRouter } from 'next/navigation'
export default function SignIn() {
  const [SignInFormData,setSignInFormData]=useState(initialLoginFormData);
  const router=useRouter();
  async function handleSignIn(){
    const result=await loginUserAction(SignInFormData);
    console.log(result);
    if(result?.success){
      router.push("/")
    }
  }
  return (
    <div>
      <h1>Login</h1>
      <form action={handleSignIn}>
        {
          userLoginFormControls.map(controlItem=>
          <div key={controlItem.name}>
          <Label>{controlItem.label}</Label>
          <CommonFormElement
          currentItem={controlItem}
          value={setSignInFormData[controlItem.name]}
          onChange={(event)=>setSignInFormData({
            ...SignInFormData,
            [controlItem.name]: event.target.value

          })}
            />
          </div>
          )
        }
        <Button type="submit">Sign In </Button>
      </form>
    </div>
  )
}
