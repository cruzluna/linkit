import { LinkStatProps } from '@/interfaces/linkStatsProps';
import { Switch } from '@material-tailwind/react';
import React from 'react';

export default function Link({ title, url, clicks, enabled }: LinkStatProps): JSX.Element {
  return (
    <div className='bg-[#1C202F] text-white px-3 py-3 rounded w-full md:w-1/3 mx-auto mt-5'>
      <div className='font-bold text-xl md:text-lg'>{title}</div>
      <div className='font-medium text-base md:text-sm'>{url}</div>
      <div className='font-medium flex flex-col md:flex-row justify-between items-center'>
        <div className='mb-2 md:mb-0 md:mr-2 text-sm'>{clicks}</div>
        <Switch color='green' defaultChecked />
      </div>
    </div>
  );
}
