"use client";

import { useZoom } from '@/contexts/ZoomUserContext';
import { useAppSelector } from '@/store/hooks';
import apiService from '@/utils/apiService';
import { notification } from 'antd';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ZoomAuthCallback() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [api] = notification.useNotification();
    const { setZoomUser } = useZoom()
    const user = useAppSelector((state) => state.value);

    useEffect(() => {
        const fetchZoomData = async () => {
            const code = searchParams.get('code');
            if (code) {
                try {
                    const { data } = await apiService.get(`auth/zoom/callback?code=${code}&userId=${user.id}`);
                    setZoomUser(data.user)
                    router.push(`/${user.role}/courses?open=true`);

                } catch (error) {
                    api.open({
                        message: "Sign in failed!",
                    });
                    setTimeout(() => {
                        router.push(`/`)
                    }, 5000);
                    console.error('Error fetching Zoom data:', error);
                }
            }
        };

        fetchZoomData();
    }, [searchParams]);

    return <main >
        <img src="/images/auth-bg.png" className='h-[100vh] w-full' alt="" />
        <section className='absolute top-32 left-0 right-0 mx-auto lg:w-[30%] w-[95%]'>
            <section className='rounded-md bg-white border border-[#FDC3327D] p-10 '>
                <div className="flex flex-col items-center justify-center  py-20">
                    <div className="loader border-t-8 !border-blue-500 !border-t-transparent rounded-full !w-10 !h-10 animate-spin mb-4"></div>
                    <div className="text-lg text-gray-700">Signing you in...</div>
                </div>
            </section>
        </section>
    </main>;
}
