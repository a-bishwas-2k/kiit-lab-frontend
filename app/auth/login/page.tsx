import LoginUser from '@/components/Users/Login';
import { authOption } from '@/lib/AuthOption/authOptions'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation';
import React from 'react'

const page = async() => {

    const session  = await getServerSession(authOption);
    if(session) return redirect("/");
  return (
    <LoginUser/>
  )
}

export default page
