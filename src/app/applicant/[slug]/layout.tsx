import React from 'react';
import { Metadata } from 'next';


type Props = {
  params: {
    slug: string,
  }
  children: React.ReactNode

}

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const id = params.slug
  // // fetch data
  let course = await fetch(`https://api.experthubllc.com/courses/single-course/${id}`).then((res) => res.json())

  if (course.course === undefined) {
    course = await fetch(`https://api.experthubllc.com/events/${id}`).then((res) => res.json())
  }

  return {
    title: `${course.course?.title}`,
    description: course.course?.about,
    openGraph: {
      images: {
        url: course.course?.thumbnail,
      },
      title: course.course?.title,
      type: "website",
      description: course.course?.about,
      siteName: course.course?.title,
      url: `https://trainings.experthubllc.com/applicant/${params.slug}?page=${id}`
    },
    twitter: {
      title: course.course?.title,
      description: course.course?.about,
      images: course.course?.thumbnail,
    }
  }
}

export default function singleLayout({
  children, params
}: Props) {
  return (
    <div>
      {children}
    </div>
  );
};

