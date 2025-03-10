import React, { useState } from "react";
import { Dropdown, MenuProps, Progress } from "antd";
import { usePathname } from "next/navigation";
import CourseDetails from "../modals/CourseDetails";
import AddCourse from "../modals/AddWorkspace";
import { WorkspaceType } from "@/types/CourseType";
import Share from "../Share";
import Link from "next/link";
import AssignTutor from "../modals/AssignTutor";
import EnrollStudent from "../modals/EnrollStudent";
import { useAppSelector } from "@/store/hooks";
import ImageViewer from "../ImageViewer";
import Participants from "../Participants";
import apiService from "@/utils/apiService";
import AppointmentModal from "../modals/AppointmentModal";
import { useRouter } from "next/navigation";
import AddResources from "../modals/AddResources";

const CoursesCard = ({
    workspace,
    getWorkspace,
}: {
    workspace: WorkspaceType;
    getWorkspace: () => Promise<void>;
}) => {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);
    const [resources, setResources] = useState(false);
    const [edit, setEdit] = useState(false);
    const [deletec, setDelete] = useState(false);
    const [enrolled, setEnrolled] = useState(false);
    const [enroll, setEnroll] = useState(false);
    const user = useAppSelector((state) => state.value);
    const [assign, setAssign] = useState(false);
    const [participants, setParticipants] = useState(false);
    const [appointment, setAppointment] = useState(false);
    const router = useRouter();

    const items: MenuProps["items"] = [
        {
            key: "1",
            label: <Share course={workspace} />,
        },
        ...(pathname.includes("admin")
            ? [
                  {
                      key: "2",
                      label: (
                          <p onClick={() => setEnroll(true)}>Enroll Client</p>
                      ),
                  },
                  {
                      key: "3",
                      label: (
                          <p onClick={() => setAssign(true)}>Asign Provider</p>
                      ),
                  },
              ]
            : []),
        ...(workspace.instructorId === user.id || user.role === "admin"
            ? [
                  {
                      key: "4",
                      label: (
                          <p
                              onClick={() => {
                                  setDelete(true);
                              }}
                          >
                              Delete workspace
                          </p>
                          // <p onClick={() => { course.enrolledStudents.length >= 1 ? setEnrolled(true) : setDelete(true) }}>Delete course</p>
                      ),
                  },
                  {
                      key: "5",
                      label: (
                          <p
                              className={`${
                                  workspace.type === `online`
                                      ? `cursor-not-allowed`
                                      : ``
                              }`}
                              onClick={() =>
                                  workspace.type !== `online` && setEdit(true)
                              }
                          >
                              Edit workspace
                          </p>
                      ),
                  },
                  {
                      key: "6",
                      label: (
                          <p onClick={() => setParticipants(true)}>
                              View Participants
                          </p>
                      ),
                  },
                  {
                      key: "7",
                      label: (
                          <p onClick={() => setResources(true)}>
                              Add Resources
                          </p>
                      ),
                  },
              ]
            : []),
    ];

    const deleteWorkspace = async () => {
        apiService
            .delete(`/workspace/delete/${workspace._id}`)
            .then(function (response) {
                getWorkspace();
                setDelete(false);
                console.log(response);
            });
    };

    function calculateProgress(enrolled: number, target: number) {
        return (enrolled / target) * 100;
    }

    return (
        <div className="p-2 w-full shadow-md my-3 rounded-md bg-white">
            <div className="flex my-2">
                {/* <img
          className="w-6 h-6 rounded-full"
          src={workspace.thumbnail.url || "/images/user.png"}
          alt=""
        /> */}
                <img
                    className="w-6 h-6 rounded-full"
                    src={
                        typeof workspace.thumbnail === "object" &&
                        workspace.thumbnail.url
                            ? workspace.thumbnail.url
                            : "/images/user.png"
                    }
                    alt=""
                />
                <p className="font-medium ml-3 text-sm">
                    Workspace by {workspace.workSpaceTitle}
                </p>
            </div>
            <ImageViewer image={workspace.thumbnail} />
            {/* <img className="rounded-md w-full h-44 object-cover" src={course.thumbnail} alt="" /> */}
            <h3 className="font-medium my-3">
                {workspace.title}
                {pathname.includes("courses") && pathname.includes("admin") ? (
                    <Link
                        href={`/admin/${workspace._id}?page=${workspace.type}`}
                    >
                        <button className="bg-primary p-2 rounded-md">
                            {workspace.type}
                        </button>{" "}
                    </Link>
                ) : pathname.includes("courses") ? (
                    <button
                        onClick={() => setOpen(true)}
                        className="bg-primary p-2 rounded-md"
                    >
                        {" "}
                        {workspace.type === "online"
                            ? "Join Live"
                            : workspace.type}
                    </button>
                ) : (
                    <button
                        onClick={() => setOpen(true)}
                        className="bg-primary p-2 rounded-md"
                    >
                        {workspace.type === "online"
                            ? "Join Live"
                            : workspace.type}
                    </button>
                )}{" "}
            </h3>

            <p className="text-xs">{workspace.about.substring(0, 50)}...</p>

            <div className="flex justify-between my-3">
                <div>
                    <p className="text-xs my-1">
                        Clients {workspace.registeredClients.length}
                    </p>
                    <div className="flex ml-1">
                        {workspace.registeredClients
                            .slice(0, 6)
                            .map((wkspace: WorkspaceType) => (
                                <img
                                    key={wkspace._id}
                                    src={
                                        typeof wkspace.thumbnail === "object" &&
                                        wkspace.thumbnail.url
                                            ? wkspace.thumbnail.url
                                            : "/images/user.png"
                                    }
                                    className="w-5 rounded-full h-5 -ml-1"
                                    alt=""
                                />
                            ))}
                        {/* // <img src="/images/user.png" className="w-5 h-5" alt="" />
            // <img src="/images/user.png" className="w-5 h-5 -ml-2" alt="" />
            // <img src="/images/user.png" className="w-5 h-5 -ml-2" alt="" /> */}
                    </div>
                </div>

                <div className="w-[70%] ">
                    <div className="ml-auto text-right">
                        <Dropdown menu={{ items }} trigger={["click"]}>
                            <button className="bg-transparent">
                                <img
                                    className="w-4 h-4"
                                    src="/images/icons/edit.svg"
                                    alt=""
                                />
                            </button>
                        </Dropdown>
                    </div>
                    <div className="flex my-auto">
                        <p className="text-xs font-medium w-full">
                            Overall progress
                        </p>
                        <Progress
                            percent={parseInt(
                                calculateProgress(
                                    workspace.registeredClients.length,
                                    workspace.target,
                                ).toFixed(),
                            )}
                            size="small"
                        />
                    </div>
                </div>
            </div>
            <CourseDetails
                workspace={workspace}
                action={"Course"}
                course={workspace}
                open={open}
                call={null}
                type="view"
                handleClick={() => setOpen(false)}
            />
            <AddCourse
                workspace={workspace}
                open={edit}
                handleClick={() => setEdit(false)}
            />
            <EnrollStudent
                open={enroll}
                handleClick={() => setEnroll(false)}
                workspace={workspace}
                course={workspace}
            />
            <AssignTutor
                open={assign}
                handleClick={() => setAssign(false)}
                workspace={workspace}
                getCourse={() => getWorkspace()}
            />
            {deletec && (
                <div>
                    <div
                        onClick={() => setDelete(false)}
                        className="fixed cursor-pointer bg-[#000000] opacity-50 top-0 left-0 right-0 w-full h-[100vh] z-10"
                    ></div>
                    <div className="fixed top-10 bottom-10 left-0 rounded-md right-0 lg:w-[30%] w-[90%] h-[50%] mx-auto z-20 bg-[#F8F7F4]">
                        <div className="shadow-[0px_1px_2.799999952316284px_0px_#1E1E1E38] p-4 lg:px-12 flex justify-between">
                            <p className="font-medium"></p>
                            <img
                                onClick={() => setDelete(false)}
                                className="w-6 h-6 cursor-pointer"
                                src="/images/icons/material-symbols_cancel-outline.svg"
                                alt=""
                            />
                        </div>
                        <div className="lg:p-10 p-4 text-center">
                            <h1 className="text-2xl">
                                Are you sure you want to delete this workspace?
                            </h1>
                            <div>
                                <div className="flex my-4 justify-center">
                                    <button
                                        onClick={() => deleteWorkspace()}
                                        className="mx-4 bg-primary p-2 rounded-md"
                                    >
                                        Delete
                                    </button>
                                    <button
                                        onClick={() => setDelete(false)}
                                        className="mx-4"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {enrolled && (
                <div>
                    <div
                        onClick={() => setEnrolled(false)}
                        className="fixed cursor-pointer bg-[#000000] opacity-50 top-0 left-0 right-0 w-full h-[100vh] z-10"
                    ></div>
                    <div className="fixed top-10 bottom-10 left-0 rounded-md right-0 lg:w-[30%] w-[90%] h-[50%] mx-auto z-20 bg-[#F8F7F4]">
                        <div className="shadow-[0px_1px_2.799999952316284px_0px_#1E1E1E38] p-4 lg:px-12 flex justify-between">
                            <p className="font-medium"></p>
                            <img
                                onClick={() => setEnrolled(false)}
                                className="w-6 h-6 cursor-pointer"
                                src="/images/icons/material-symbols_cancel-outline.svg"
                                alt=""
                            />
                        </div>
                        <div className="lg:p-10 p-4 text-center">
                            <h1 className="text-2xl">
                                You can't delete this course because someone has
                                already enrolled!
                            </h1>
                            <div>
                                <div className="flex my-4 justify-center">
                                    <button
                                        onClick={() => setEnrolled(false)}
                                        className="mx-4 bg-primary p-2 rounded-md"
                                    >
                                        Go back
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <Participants
                view={participants}
                event={workspace}
                hndelClick={() => setParticipants(false)}
                type="Course"
            />
            <AddResources
                course={workspace._id}
                open={resources}
                handleClick={() => setResources(false)}
            />
        </div>
    );
};

export default CoursesCard;
