import React, { useState } from 'react';
import { useAppSelector } from '@/store/hooks';
import apiService from '@/utils/apiService';

const JoinMeeting = ({ appointment }) => {
  const [loading, setLoading] = useState(false)
  const user = useAppSelector((state) => state.value);

  async function initClient() {
    const ZoomMtgEmbedded = (await import('@zoom/meetingsdk/embedded')).default;

    const client = ZoomMtgEmbedded.createClient();

    const { signature } = await getSignature(appointment.meetingId, (user.role === "applicant" ? 0 : 1));
    const meetingSDKElement = document.getElementById('meetingSDKElement');

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
              width: (window.innerWidth > 700) ? 900 : 300,
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
      const res = await apiService.post(`courses/get-zoom-signature`,
        {
          meetingNumber,
          role
        })
      return res.data
    } catch (e) {
      console.log(e);

    }


  }

  async function startMeeting() {
    setLoading(true)
    const { client, signature } = await initClient();
    console.log(signature, user);
    client.join({
      sdkKey: process.env.NEXT_PUBLIC_CLIENT_ID,
      signature,
      meetingNumber: appointment.meetingId,
      password: appointment.meetingPassword,
      userName: user.fullName,
      ...(user.role !== "applicant" && user.role !== "student" ? {
        zak: appointment.zakToken
      } : {}),
    }).then((res) => {
      // if (user.role !== "applicant" && user.role !== "student") {
      //   console.log(user);
      //   notifyStudents()
      // }
      setLoading(false)

    }).catch((e) => {
      setLoading(false)
      console.log(e);;
    })
  }
  return (
    <div>
      <button onClick={() => startMeeting()} className='bg-[#0000FF] text-white p-2 px-4 rounded-md mt-4'>
        Join
      </button>
      <div className='fixed top-1/2 left-1/2   -translate-x-1/2 -translate-y-1/2 '>
        <div id="meetingSDKElement"></div>
      </div>
    </div>
  );
};

export default JoinMeeting;