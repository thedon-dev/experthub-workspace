"use client"

import DashboardLayout from '@/components/DashboardLayout';
import { useAppSelector } from '@/store/hooks';
import apiService from '@/utils/apiService';
import React, { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const Certificates = () => {
  const user = useAppSelector((state) => state.value);
  const [certificates, setCertificates] = useState([])

  const del = async (id: undefined) => {
    await apiService.delete(`/certificate/delete/${id}`)
      .then(function (response) {
        console.log(response.data)
        getCert()
      })
  }

  const getCert = async () => {
    await apiService.get(`/certificate/${user.id}`)
      .then(function (response) {
        console.log(response.data)
        setCertificates(response.data.certificate)
      })
  }


  const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' }

  const formattedDate = new Intl.DateTimeFormat('en-GB', options).format(new Date);


  const handleDownload = (repo: { title: string | string[]; tutor: any; }) => {
    // setLoading(true);

    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'px',
      format: [1000, 700]
    });

    // Add background image
    doc.addImage('/images/cert.png', 'JPEG', 0, 0, 1000, 700);

    // Add Certificate Title
    // doc.setFontSize(48);
    // doc.setTextColor('#333');
    // doc.text('Certificate of Completion', 500, 150, { align: 'center' });

    // Add Recipient's Name
    // doc.setFontSize(36);
    // doc.text(`This is to certify that`, 500, 0, { align: 'center' });

    doc.setFontSize(70);
    doc.setTextColor('#FDC332');
    doc.text(String(user.fullName.toLocaleUpperCase()), 600, 360, { align: 'center' });

    // Add Course Name
    // doc.setFontSize(36);
    // doc.setTextColor('#333');
    // doc.text(`has successfully completed the`, 500, 350, { align: 'center' });

    doc.setFontSize(30);
    doc.setTextColor('#2F2F2F');
    doc.text(repo.title, 600, 455, { align: 'center' });

    // Add Date
    doc.setFontSize(25);
    doc.setTextColor('#2F2F2F');
    doc.text(` ${formattedDate}.`, 650, 255);



    doc.setFontSize(25);
    doc.setTextColor('#2F2F2F');
    doc.text(` ${repo.tutor.fullname}.`, 715, 635);

    // Add Signature Image (optional)
    doc.addImage(repo.tutor.signature, 'PNG', 715, 530, 100, 60);

    // Add Issuer's Name (optional)
    // doc.setFontSize(24);
    // doc.text('Issuer Name', 500, 650, { align: 'center' });

    // Save the PDF
    doc.save(`${user.fullName}_certificate.pdf`);

    // setLoading(false);
  };


  useEffect(() => {
    getCert()
  }, [])
  return (
    <DashboardLayout>
      <section className='p-6'>
        <p className='text-xl'>Certificates</p>
        <div className='flex flex-wrap justify-between'>
          {certificates.map((single: any) => <div className="flex shadow-md rounded-xl p-4 lg:w-[32%] bg-white my-3" key={single._id}>
            <img className='w-32 my-auto' src="/images/mockup.jpg" alt="" />
            <div>
              <p className='text-sm'>Certificate For:</p>
              <h1 className='lg:text-3xl text-xl my-auto'>{single.title}</h1>
              <button className='p-2 rounded-md mt-3 bg-primary' onClick={() => handleDownload(single)}>Download</button>
              {/* <button onClick={() => del(single._id)}>del</button> */}
            </div>
          </div>)}
        </div>
      </section>
    </DashboardLayout>
  );
};

export default Certificates;