"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import apiService from "@/utils/apiService";
import HeaderNav from "@/components/HeaderNav";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { WorkspaceType } from "@/types/CourseType";

const WorkspacesPage = () => {
  const [workspaces, setWorkspaces] = useState<WorkspaceType[]>([]);
  const router = useRouter();

  useEffect(() => {
    apiService
      .get("workspace/all")
      .then((response) => {
        console.log(response.data);
        setWorkspaces(response.data.workspaces);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const handleEnroll = (workspaceId: string) => {
    const accessToken = localStorage.getItem("tid"); // Check if the user is logged in

    if (!accessToken) {
      router.push("/auth/login"); // Redirect to login if no token is found
    } else {
      router.push(`/workspace/enroll/${workspaceId}`); // Proceed to enroll page if logged in
    }
  };

  return (
    <>
      <HeaderNav />
      <div className="bg-yellow-50 px-[5%] lg:px-[10%] py-20">
        <h1 className="text-3xl font-bold text-center text-yellow-600 mb-6">
          Available Workspaces
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-20">
          {workspaces.map((workspace) => (
            <div
              key={workspace._id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <Image
                src={workspace.thumbnail.url}
                alt={workspace.workSpaceTitle}
                width={400}
                height={250}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-yellow-700">
                  {workspace.workSpaceTitle}
                </h2>
                <p className="text-gray-600 text-sm">{workspace.category}</p>
                <p className="text-gray-800 mt-2">{workspace.about}</p>
                <p className="mt-2 font-medium text-yellow-800">
                  Duration: {workspace.workDuration}
                </p>
                <p className="text-gray-700 font-semibold">
                  Fee: ₦{workspace.strikedFee.toLocaleString()}
                </p>
                <button
                  onClick={() => handleEnroll(workspace._id)}
                  className="mt-4 bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700"
                >
                  Enroll
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default WorkspacesPage;
