import React from 'react'

interface infoTypes {
    label : string
    value : string
}

const Info : React.FC<infoTypes> = ({label, value}) => {
  return (
    <div className="flex gap-4">
        <label htmlFor="" className="w-[40%] md:w-1/4">{label}: </label>
        <h5 className="font-semibold">{value}</h5>
    </div>
  )
}

export default Info