import React from 'react'
import { useSelector } from 'react-redux'

export const Alert = () => {
  const alert = useSelector(state=>state.alert)
  return (
    alert && <div className={`alert alert-${alert.type} alert-dismissible fade show position-fixed d-flex`} style={{width:'100vw',zIndex:1110,height:'10vh',justifyContent:'center',alignItems:'center'}} role="alert">
  <strong>{alert.message}</strong> 
  <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>
  )
}
