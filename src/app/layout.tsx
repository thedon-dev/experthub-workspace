
import axios from "axios"
import type { Metadata } from 'next'
import './globals.css'
import { Providers } from "@/store/providers";

export const metadata: Metadata = {
  title: 'EXPERTHUB INSTITUTE',
  description: "We are determine to raise the next generation of global leaders and empower youths to harness the immense power of technology to overcome the challenges our planet faces, including its dwindling economy. Our platform is more than just a website; it's a thriving community of like-minded individuals who share a passion for change. Together, we learn, grow, and collaborate to make a tangible impact on our communities and planet."
}



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  // axios.defaults.baseURL = "https://experthub-20f6efa1a0d9.herokuapp.com/"

  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
