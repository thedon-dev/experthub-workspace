"use client"

import { useEffect, useState } from 'react'
import axios from 'axios';
import { useAppSelector } from '@/store/hooks';


export default function ZoomMeeting({ course, closeDetail }) {
    const user = useAppSelector((state) => state.value);
    const [loader, setLoader] = useState(false)
    useEffect(() => {
        console.log(course);
        initZoomApp(user, course);

    }, [])
    async function initZoomApp() {
        setLoader(true)
        const { client, signature } = await initClient();
        startMeeting(client, signature);


    }
    async function initClient() {
        const ZoomMtgEmbedded = (await import('@zoom/meetingsdk/embedded')).default;

        const client = ZoomMtgEmbedded.createClient();

        const { signature } = await getSignature(course.meetingId, (user.role === "applicant" ? 0 : 1));
        const meetingSDKElement = document.getElementById('meetingSDKElement');
        alert(window.innerWidth)
        client.init({
            leaveUrl: `${window.location.origin}/${user.role}`,
            debug: true,
            zoomAppRoot: meetingSDKElement,
            language: 'en-US',
            customize: {
                video: {
                    isResizable: true,
                    viewSizes: {
                        default: {
                            width: (window.innerWidth>700)?900:300,
                            height: 500,
                        },
                        ribbon: {
                            width: 300,
                            height: 500,
                        },
                    },
                },
            },

        });

        return { client, signature };
    }


    async function getSignature(meetingNumber, role) {
        try {
            const res = await axios.post(`courses/get-zoom-signature`,
                {
                    meetingNumber,
                    role
                })
            return res.data
        } catch (e) {
            console.log(e);

        }


    }



    async function startMeeting(client, signature) {

    
        client.join({
            sdkKey: process.env.NEXT_PUBLIC_CLIENT_ID,
            signature,
            meetingNumber: course.meetingId,
            password: course.meetingPassword,
            userName: user.fullName,
            ...(user.role !== "applicant" ? {
                zak: course.zakToken
            } : {}),
        }).then((res) => {
            console.log(res);
            setLoader(false);
            closeDetail()
        }).catch((e) => {
            setLoader(false);
        })





    }

    return (
        <>
            {
                loader &&
                <div className='fixed flex items-center justify-center bg-[rgb(0,0,0,0.6)] z-30 top-0 left-0 w-full h-full'>
                    <div className='flex flex-col'>
                        <span className='loader'></span>
                        <h3 className='text-white text-[18px] mt-2'>Joining Meeting...</h3>
                    </div>

                </div>
            }
            <div className='fixed top-1/2 left-1/2   -translate-x-1/2 -translate-y-1/2 '>
                <div id="meetingSDKElement"></div>

            </div>

        </>

    )
}






