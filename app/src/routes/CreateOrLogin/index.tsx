import React, { useState } from 'react'
import Login from './login';
import CreateAccount from './create';

const CreateOrLogin = () => {
  const [isCreating, setIsCreating] = useState(false);
  return isCreating
    ? <CreateAccount setIsCreating={() => setIsCreating(false) }/>
    : <Login setIsCreating={() => setIsCreating(true) } />
}

export default CreateOrLogin
