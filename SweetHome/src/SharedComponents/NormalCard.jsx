import React from 'react'

const NormalCard = ({children}) => {
    
  return (
    <div  className="w-[100%] rounded-lg overflow-hidden shadow-lg bg-gradient-to-tr from-primary to-secondary shadow-shadowColor">
        {children}
    </div>
  )
}

export default NormalCard
