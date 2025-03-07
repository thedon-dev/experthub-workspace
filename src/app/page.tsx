"use client";

import FooterNav from "@/components/FooterNav";
import HeaderNav from "@/components/HeaderNav";
import { Fragment, useEffect, useRef, useState } from "react";
import type { CollapseProps } from "antd";
import { CourseType, WorkspaceType } from "@/types/CourseType";
import apiService from "@/utils/apiService";
import CourseDetails from "@/components/modals/CourseDetails";
import Hero from "@/components/hero/hero";
import Advantages from "@/components/advantage-component/advantage";
import WorkspaceSlider from "@/components/workspace/workspace-slider";
import HybridWorkspace from "@/components/workspace/hybrid-workspace";
import ReadyToCustomize from "@/components/workspace/ready-to-customize";
import OnlineWorkspace from "@/components/workspace/online-workspace";
import FindAPerfect from "@/components/workspace/find-a-perfect";
import PerfectMembership from "@/components/workspace/perfect-membership";

export default function Home() {
  const text = `Ans: We are determine to raise the next generation of Global leaders and empower youths to harness the immense potential of technology to overcome the challenges our planet faces, including its dwindling economy.
`;
  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: (
        <p className="font-bold">
          Are the courses worth paying that much for it?{" "}
        </p>
      ),
      children: (
        <p className="font-medium">
          <strong>YES</strong> <br /> When you pay for Our Course, Experthub
          will: <br />
          <ul>
            <li>
              Provide comprehensive training programs that cover a wide spectrum
              of tech skills, ensuring that you receive a well-rounded education
              in your chosen field.
            </li>
            <li>
              Provide insights, guidance, and practical expertise based on real
              world experience from experienced and knowledgeable instructors.
            </li>
            <li>
              Highly increase your confidence level to undertake bolder projects
              in your industry and even in others.
            </li>
            <li>
              Tailor their training programs to suit your individual learning
              needs ensuring that you receive a personalized education that
              matches your pace and style.
            </li>
            <li>
              Offer career placement services, helping you secure employment or
              internships.
            </li>
            <li>
              Teach you hands-on projects and exercises to reinforce your
              learning
            </li>
          </ul>
        </p>
      ),
    },
    // {
    //   key: '2',
    //   label: <p className="font-bold">Is it worth paying that much for it?</p>,
    //   children: <p className="font-medium">{text}</p>,
    // },
    {
      key: "2",
      label: <p className="font-bold">Can Experthub cover all my training?</p>,
      children: (
        <p className="font-medium">
          <strong>YES</strong> <br />
          Our Instructors are seasoned expert in their fields who have a track
          record of delivering high-quality educational content.
        </p>
      ),
    },
    {
      key: "3",
      label: <p className="font-bold">How can I signup and get started?</p>,
      children: (
        <p className="font-medium">
          To sign-up, click on the register button above and navigate to
          Register Now button to register either as an Applicant if you want to
          apply for any of our courses or to Register as a Tutor if you have the
          requisite qualification to be an instructor on any of our skilled
          areas.
          <br />
          <strong>OR </strong>
          <br />
          Simply click on this{" "}
          <a href="https://trainings.experthubllc.com/auth/signup">link</a> to
          start your Registration immediately:
        </p>
      ),
    },
  ];

  const [courses, setCourses] = useState<WorkspaceType | []>([]);
  const [course, setCourse] = useState<WorkspaceType | null>(null);
  const [open, setOpen] = useState(false);

  const getCourses = async () => {
    apiService
      .get("workspaces/all")
      .then(function (response) {
        console.log(response.data);
        setCourses(response.data.courses);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const coursesSectionRef = useRef<HTMLElement | null>(null);
  const [shouldScroll, setShouldScroll] = useState(false);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash === "#courses") {
      setShouldScroll(true);
    }
  }, []);

  useEffect(() => {
    if (shouldScroll && coursesSectionRef.current) {
      coursesSectionRef.current.scrollIntoView({ behavior: "instant" });
      setShouldScroll(false);
    }
  }, [shouldScroll, courses]);
  useEffect(() => {
    getCourses();
  }, []);

  return (
    <Fragment>
      <HeaderNav />
      <main className="landing">
        <Hero />
        <Advantages />
        <WorkspaceSlider />
        <HybridWorkspace />
        <FindAPerfect />
        <OnlineWorkspace />
        <PerfectMembership />
        <ReadyToCustomize />
      </main>
      <FooterNav />
      {course && (
        <CourseDetails
          workspace={course}
          open={open}
          action={"Course"}
          type="enroll"
          call={getCourses}
          handleClick={() => setOpen(false)}
        />
      )}
    </Fragment>
  );
}
