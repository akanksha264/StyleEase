import React from 'react'

const AddressCard = ({address}) => {
  return (
    <div>
        <p className="font-semibold">{address?.firstName} {address?.lastName}</p>
        <p>{address?.streetAddress}</p>
        <p>{address?.city}, {address?.state} - {address?.pinCode}</p>
        <p>Contact: +91 {address?.mobile}</p>
    </div>
  )
}

export default AddressCard