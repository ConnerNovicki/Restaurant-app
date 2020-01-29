import React from 'react'
import './styles.scss'
import classnames from 'classnames'

interface Props {
  classNames?: string[];
}

const Block: React.FC<Props> = ({ children, classNames = [] }) => {
  return (
    <div className={classnames("block-wrapper", ...classNames)}>
      {children}
    </div>
  )
}

export default Block
