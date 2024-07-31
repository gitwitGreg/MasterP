import React from 'react'
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Link from 'next/link';

export const FooterComp = () => {

  return (
  
    <div className=' w-full flex p-20 bg-black text-white justify-end'>

      <div className=' flex flex-col gap-5'>

        <Link href={'/'}>

          <h1 className='font-bold font-sans text-xl'>

            MasterP

          </h1>

        </Link>

        <p>Let's Connect</p>

        <div className='flex gap-2 text-white'>

          <Link href='https://github.com/gitwitGreg'>

            <GitHubIcon />

          </Link>

          <Link href='https://www.linkedin.com/in/gregmen/'>

            <LinkedInIcon />

          </Link>

        </div>

      </div>

    </div>  
    
  )

}

export default FooterComp
