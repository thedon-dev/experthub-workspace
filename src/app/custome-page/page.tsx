import FooterNav from '@/components/FooterNav'
import HeaderNav from '@/components/HeaderNav'
import CustomDesign from '@/components/workspace/custome-page/custome-design'
import GuildedSetup from '@/components/workspace/custome-page/guided-setup'
import ReadyToCustomize from '@/components/workspace/custome-page/ready-to-custome'
import React from 'react'

function page() {
  return (
    <div>
         <HeaderNav />
        <CustomDesign />
        <GuildedSetup />
        <ReadyToCustomize />
        <FooterNav />
    </div>
  )
}

export default page