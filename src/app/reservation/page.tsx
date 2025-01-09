import FooterNav from '@/components/FooterNav'
import HeaderNav from '@/components/HeaderNav'
import ReservationList from '@/components/reservation-list'
import React from 'react'

function page() {
  return (
    <div>
        <HeaderNav />
        <ReservationList />
        <FooterNav />
    </div>
  )
}

export default page