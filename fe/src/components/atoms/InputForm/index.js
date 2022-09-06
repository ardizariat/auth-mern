import React from 'react'

const InputForm = ({ type, id, className, ...rest }) => {
  return <input type={type} id={id} {...rest} className={className} />
}

InputForm.defaultProps = {
  className: 'form-control',
}

export default InputForm
