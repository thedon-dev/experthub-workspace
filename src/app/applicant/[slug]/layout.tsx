import React from "react";
import { Metadata } from "next";

type Props = {
  params: {
    slug: string;
  };
  children: React.ReactNode;
};

export async function generateStaticParams() {
  try {
    // Fetch all possible course slugs
    const courses = await fetch(
      `https://seashell-app-nejbh.ondigitalocean.app/courses`
    )
      .then((res) => res.json())
      .catch(() => []);

    // Fetch all possible event slugs
    const events = await fetch(`${process.env.NEXT_SERVER_URL}/events`)
      .then((res) => res.json())
      .catch(() => []);

    // Extract slugs and combine them
    const slugs = [
      ...(Array.isArray(courses)
        ? courses.map((course: { slug: string }) => ({ slug: course.slug }))
        : []),
      ...(Array.isArray(events)
        ? events.map((event: { slug: string }) => ({ slug: event.slug }))
        : []),
    ];

    return slugs;
  } catch (error) {
    console.error("Error fetching static params:", error);
    return [];
  }
}

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const id = params.slug;

  try {
    // Fetch course data
    let course = await fetch(
      `https://seashell-app-nejbh.ondigitalocean.app/courses/single-course/${id}`
    )
      .then((res) => res.json())
      .catch(() => null);

    // If course not found, fetch event data
    if (!course?.course) {
      course = await fetch(`${process.env.NEXT_SERVER_URL}/events/${id}`)
        .then((res) => res.json())
        .catch(() => null);
    }

    // Destructure the fetched data
    const { workspace: courseData } = course || {};

    return {
      title: courseData?.title || "Course Title",
      description: courseData?.about || "Course Description",
      openGraph: {
        images: [{ url: courseData?.thumbnail?.url || "" }],
        title: courseData?.title || "Course Title",
        type: "website",
        description: courseData?.about || "Course Description",
        siteName: courseData?.title || "Course Title",
        url: `https://trainings.experthubllc.com/applicant/${params.slug}?page=${id}`,
      },
      twitter: {
        title: courseData?.title || "Course Title",
        description: courseData?.about || "Course Description",
        images: [courseData?.thumbnail?.url || ""],
      },
    };
  } catch (error) {
    console.error("Error fetching metadata:", error);
    return {
      title: "Course Title",
      description: "Course Description",
    };
  }
};

export default function SingleLayout({ children }: Props) {
  return <div>{children}</div>;
}
