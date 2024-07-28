import { CourseType } from '@/types/CourseType';
import { useSearchParams, usePathname } from 'next/navigation';
import React, { Fragment, useEffect, useState } from 'react';
import DashboardLayout from './DashboardLayout';
import SinglePage from './SinglePage';
import apiService from '@/utils/apiService';

const ApplicantPage = () => {
  const [repo, setRepo] = useState<CourseType | null>(null)
  const page = useSearchParams().get("page")
  const pathname = usePathname().slice(11)

  const getData = async () => {
    await apiService.get(`courses/single-course/${page}`)
      .then(function (response) {
        // setRepo(response.data.course)
        // console.log(response.data)
      })
  }

  useEffect(() => {
    getData()
  }, [])



  return (
    <Fragment>
      <DashboardLayout>
        <section className=''>
          {repo && page && <SinglePage pathname={pathname} repo={repo} page={null} />}
        </section>
      </DashboardLayout>
    </Fragment>
  );
};

export default ApplicantPage;