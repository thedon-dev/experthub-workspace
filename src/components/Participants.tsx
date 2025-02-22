import { useAppSelector } from "@/store/hooks";
import { CourseType } from "@/types/CourseType";
import { Spin, message, notification } from "antd";
import Link from "next/link";
import React, { useState } from "react";
import type { MenuProps } from "antd";
import { Dropdown } from "antd";
import { WorkspaceType } from "@/types/CourseType";
import SendAssesment from "./modals/SendAssesment";
import apiService from "@/utils/apiService";

const Participants = ({
  view,
  event,
  hndelClick,
  type,
}: {
  view: Boolean;
  event: CourseType;
  hndelClick: any;
  type: string;
}) => {
  const [api, contextHolder] = notification.useNotification();
  const [message, setMessage] = useState(
    "We hope this message finds you well."
  );
  const [show, setShow] = useState(false);
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);
  const user = useAppSelector((state) => state.value);
  const [assesment, setAssesment] = useState(false);

  const sendReminder = () => {
    setLoading(true);
    apiService
      .post(`events/reminder`, {
        userId: id,
        message,
        type,
      })
      .then(function (response) {
        api.open({
          message: "Reminder Sent Successfully!",
        });
        setLoading(false);
        console.log(response);
        setShow(false);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
      });
  };

  const items: MenuProps["items"] = [
    {
      label: <p onClick={() => setAssesment(true)}>Send Assessment</p>,
      key: "1",
    },
    {
      label: <p onClick={() => makeGraduate()}>Make Graduate</p>,
      key: "2",
    },
    // {
    //   label: (
    //     <p onClick={() => setEmail(true)}>Send Email</p>
    //   ),
    //   key: '3',
    // },
    {
      label: (
        <Link href={`${user.role}/message?id=${id}`}>
          <p className="curcor-pointer">Send Message</p>
        </Link>
      ),
      key: "4",
    },
  ];

  const makeGraduate = () => {
    try {
      apiService
        .put(`user/updateProfile/${id}`, {
          graduate: true,
        })
        .then(function (response) {
          // console.log(response.data)
          api.open({
            message: "Student made a graduate Successfully!",
          });
        });
    } catch (e) {
      console.log(e);
      api.open({
        message: "Something went wrong",
      });
    }
  };

  return (
    view && (
      <div>
        {contextHolder}
        <div
          onClick={() => hndelClick()}
          className="fixed cursor-pointer bg-[#000000] opacity-50 top-0 left-0 right-0 w-full h-[100vh] z-10"
        ></div>
        <div className="fixed top-10 bottom-10 left-0 rounded-md right-0 lg:w-[60%] w-[90%] h-[90%] overflow-y-auto mx-auto z-20 bg-[#F8F7F4]">
          <div className="shadow-[0px_1px_2.799999952316284px_0px_#1E1E1E38] p-4 lg:px-12 flex justify-between">
            <p className="font-medium">View list of all Participants </p>
            <img
              onClick={() => hndelClick()}
              className="w-6 h-6 cursor-pointer"
              src="/images/icons/material-symbols_cancel-outline.svg"
              alt=""
            />
          </div>
          <div className="lg:p-10 p-4">
            <input
              type="text"
              className="border w-full mb-3 p-2 rounded-md"
              placeholder="Search"
            />
            <div className="flex mb-6">
              <div className="flex text-[#F7A60F]">
                <input type="radio" className="mr-2" />
                <p className="text-xl">Select all</p>
              </div>
              <p className="text-[#F7A60F] text-xl ml-10 ">Send Reminder</p>
            </div>
            {show ? (
              <div>
                <textarea
                  className="w-full p-3 h-44 rounded-md"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
                <button
                  className="bg-primary p-3 mt-2 text-white rounded-md"
                  onClick={() => sendReminder()}
                >
                  {loading ? <Spin /> : "Send"}
                </button>
              </div>
            ) : (
              event.enrolledStudents.map(
                (student: {
                  fullname: string;
                  _id: string;
                  profilePicture: string;
                  workspaces?: WorkspaceType[];
                }) => (
                  <div className="flex my-3 justify-between">
                    <div className="flex">
                      <input type="radio" className="mr-2" />
                      <img
                        src={
                          student.profilePicture
                            ? student.profilePicture
                            : "/images/user.png"
                        }
                        className="w-12 h-12 rounded-full"
                        alt=""
                      />
                      <p className="ml-4 my-auto lg:text-xl  font-medium capitalize">
                        {student.fullname}
                      </p>
                    </div>
                    <div className="flex">
                      <button
                        onClick={() => {
                          setShow(true), setId(student._id);
                        }}
                        className="border my-auto lg:w-44 sm:text-xs rounded-full text-primary p-2 px-3"
                      >
                        Send Reminder
                      </button>
                      <div
                        onClick={() => setId(student._id)}
                        className="my-auto ml-3"
                      >
                        <Dropdown menu={{ items }} trigger={["click"]}>
                          <img
                            className="w-4 h-4 my-auto cursor-pointer"
                            src="/images/icons/edit-icon.svg"
                            alt=""
                          />
                        </Dropdown>
                      </div>

                      {/* <Link href={`/${user.role}/message?id=${student._id}`}>
                <button className='border my-auto lg:w-32 sm:text-xs ml-3 rounded-full text-primary p-2 px-3'>Message</button>
              </Link> */}
                    </div>
                  </div>
                )
              )
            )}
            {/* <div>
          <div className='flex my-4 justify-center'>
            <button onClick={() => deleteCourse()} className='mx-4 bg-primary p-2 rounded-md'>Delete</button>
            <button onClick={() => setDelete(false)} className='mx-4'>Cancel</button>
          </div>
        </div> */}
          </div>
        </div>
        <SendAssesment
          open={assesment}
          handleClick={() => setAssesment(false)}
          studentId={id}
        />
      </div>
    )
  );
};

export default Participants;
