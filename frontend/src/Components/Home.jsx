import React from 'react'
import { Appbar } from './AppBar'
import { Balance } from './Balance'
import { Users } from './Users'
function Home() {
  return (
    <>
    <Appbar/>
    <div className="m-8">
            <Balance value={"10,000"} />
            <Users />
      </div>
    </>
  )
}

export default Home