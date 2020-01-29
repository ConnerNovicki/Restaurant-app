import React, { useState } from 'react'
import Login from './login';
import CreateAccount from './create';
import './styles.scss';
import { Card } from 'antd';

const CreateOrLogin = () => {
  const [isCreating, setIsCreating] = useState(false);
  return (
    <div className="login">
      <Card className="card">
        {isCreating
          ? <CreateAccount setIsCreating={() => setIsCreating(false)} />
          : <Login setIsCreating={() => setIsCreating(true)} />
        }
      </Card>
    </div>
  )
}

export default CreateOrLogin
