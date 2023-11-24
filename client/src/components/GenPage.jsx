import React from 'react'
import PageSwitch from './PageSwitch'
import SubPageSwitch from './SubPageSwitch'
import PageContent from './pageContent'

const GenPage = () => {
  return (
    <div>
      <PageSwitch />
      <SubPageSwitch />
      <PageContent />
    </div>
  )
}

export default GenPage