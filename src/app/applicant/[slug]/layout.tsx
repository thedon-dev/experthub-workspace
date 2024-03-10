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
  const course = await fetch(`https://shark-app-2-k9okk.ondigitalocean.app/courses/single-course/${id}`).then((res) => res.json())

  return {
    title: `Course || ${course.course.title}`,
    description: course.course.about,
    openGraph: {
      images: {
        url: course.course.thumbnail,
      },
      title: course.title,
      type: "website",
      description: course.course.about,
      siteName: course.course.title,
      url: `https://trainings.experthubllc.com/applicant/${params.slug}?page=${id}`
    },
    twitter: {
      title: course.course.title,
      description: course.course.about,
      images: course.course.thumbnail,
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

