'use client'
import React, { useState } from 'react';
import { Label } from '@radix-ui/react-label';
import { intialSignUpFormData, userRegistratrionFormControls } from '../utils';
import CommonFormElement from '@/components/form-element/page';
import { Button } from '@/components/ui/button';
import { registerUserAction } from '@/actions';
import { useRouter } from 'next/navigation';
export default function SignUp() {
  const [signUpFormData, setSignFormData] = useState(intialSignUpFormData);
// console.log(signUpFormData);
const router=useRouter();
function handleSignUpBtnValid(){
  return Object.keys(signUpFormData).every(key=> signUpFormData[key].trim() !== '')
}
async function handleSignUp(){
  const result =await registerUserAction(signUpFormData);
  console.log(result)
  if(result?.data) {
    router.push('/sign-in')
  }
}
  return (
    <div>
      <h1>User Registration</h1>
      <form action={handleSignUp}>
        {userRegistratrionFormControls.map((ControlItem, index) => (
          <div key={ControlItem.name}>
            <Label>{ControlItem.label}</Label>
            <CommonFormElement
              currentItem={ControlItem}
              value={signUpFormData[ControlItem.name]}
              onChange={(event) =>
                setSignFormData({
                  ...signUpFormData,
                  [ControlItem.name]: event.target.value,
                })
              }
            />
          </div>
        ))}
        <Button disabled={!handleSignUpBtnValid()} className="disabled:opacity-55" type="submit">Sign Up</Button>
      </form>
    </div>
  );
}
