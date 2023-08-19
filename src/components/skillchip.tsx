import React from 'react'

interface skillChipProps {
  outer: string, 
  inner: string,
  skill: string,
}

export default function SkillChip({outer, inner, skill}: skillChipProps) {
  return (
    <>
      <div className={`bg-[${outer}] inline-flex items-center rounded-full px-3 py-1 text-sm font-medium text-[${inner}] m-1`}>
        <span>{skill}</span>
      </div>
    </>
  )
}
