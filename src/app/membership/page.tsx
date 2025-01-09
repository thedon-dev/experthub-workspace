import FooterNav from '@/components/FooterNav'
import HeaderNav from '@/components/HeaderNav'
import MembershipHero from '@/components/membership/membership-hero'
import MembershipOffers from '@/components/membership/membership-offer'
import FindAPerfect from '@/components/workspace/find-a-perfect'
import HybridWorkspace from '@/components/workspace/hybrid-workspace'
import React from 'react'

function page() {
  return (
    <div className='bg-background'>
        <HeaderNav />
        <MembershipHero />
        <MembershipOffers />
        <HybridWorkspace />
        <FindAPerfect />
        <FooterNav />
    </div>
  )
}

export default page