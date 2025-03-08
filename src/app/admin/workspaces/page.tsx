"use client";

import DashboardLayout from "@/components/DashboardLayout";
import React, { useState, useEffect } from "react";
import { DownOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown } from "antd";
import AddCourse from "@/components/modals/AddWorkspace";
import AddResources from "@/components/modals/AddResources";
import CoursesCard from "@/components/cards/CoursesCard";
import Slider from "react-slick";
import { WorkspaceType } from "@/types/CourseType";
import Link from "next/link";
import AddEvents from "@/components/modals/AddEvents";
import CategoryModal from "@/components/modals/CategoryModal";
import apiService from "@/utils/apiService";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

type GroupedWorkspace = {
  category: string;
  workspaces: WorkspaceType[];
};

const courses = () => {
  const [workspace, setWorkspace] = useState<GroupedWorkspace[]>([]);
  const [all, setAll] = useState<GroupedWorkspace[]>([]);
  const [pending, setPending] = useState<WorkspaceType | []>([]);
  const [open, setOpen] = useState(false);
  const [resources, setResources] = useState(false);
  const [event, setEvent] = useState(false);
  const [category, setCategory] = useState(false);

  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <p onClick={() => setOpen(true)}>Courses</p>,
    },
    {
      key: "2",
      label: <p onClick={() => setEvent(true)}>Events</p>,
    },
    // {
    //   key: '3',
    //   label: (
    //     <p onClick={() => setResources(true)}>Resources</p>
    //   ),
    // },
    {
      key: "4",
      label: <p onClick={() => setCategory(true)}>Add Category</p>,
    },
  ];

  const getWorkspaces = async () => {
    try {
      const response = await apiService.get("workspace/all");
      const workspaces: WorkspaceType[] = response.data.workspaces;

      // Group by category
      const grouped = workspaces.reduce<Record<string, WorkspaceType[]>>(
        (acc, workspace) => {
          const category = workspace.category || "Uncategorized";
          if (!acc[category]) {
            acc[category] = [];
          }
          acc[category].push(workspace);
          return acc;
        },
        {}
      );

      // Transform to array format for mapping
      const groupedArray: GroupedWorkspace[] = Object.keys(grouped).map(
        (category) => ({
          category,
          workspaces: grouped[category],
        })
      );

      setWorkspace(groupedArray);
      setAll(groupedArray);
    } catch (error) {
      console.error("Error fetching workspaces:", error);
    }
  };

  const getPendngWorkspaces = () => {
    apiService.get("workspace/unapproved").then(function (response) {
      setPending(response.data.courses);
      console.log(response.data);
    });
  };

  useEffect(() => {
    getPendngWorkspaces();
    getWorkspaces();
  }, []);

  const search = (value: string) => {
    const results = all
      .map((group) => ({
        category: group.category,
        workspaces: group.workspaces.filter((workspace) =>
          workspace.category.toLowerCase().includes(value.toLowerCase())
        ),
      }))
      .filter((group) => group.workspaces.length > 0); // Remove empty categories

    setWorkspace(results);
  };

  return (
    <DashboardLayout>
      <section className="p-4">
        <div className="flex justify-between">
          <div>
            <p className="text-xl">All Workspaces</p>
            <p className="text-sm">
              You will never go wrong with our workspaces
            </p>
          </div>
          <div className="">
            <Dropdown menu={{ items }} trigger={["click"]}>
              <button className="bg-primary p-2 font-medium text-sm rounded-md">
                + Add Workspaces
                <DownOutlined />
              </button>
            </Dropdown>
          </div>
          <div></div>
        </div>
        <div className="lg:w-[55%] w-full flex relative mb-4">
          <input
            onChange={(e) => search(e.target.value)}
            type="text"
            className="pl-10 p-2 w-full rounded-md border border-[#1E1E1E8A] bg-transparent"
            placeholder="Search"
          />
          <img
            className="absolute top-2 w-6 left-2"
            src="/images/icons/search.svg"
            alt=""
          />
        </div>
        <div className="lg:w-[97%] mx-auto">
          {workspace.map(
            (
              workspaceGroup: {
                category: string;
                workspaces?: WorkspaceType[];
              },
              index: number
            ) => (
              <div key={index}>
                <p className="font-bold mt-4">{workspaceGroup.category}</p>
                <div className="shadow-[0px_1px_2.799999952316284px_0px_#1E1E1E38] my-2">
                  <Slider {...settings}>
                    {workspaceGroup.workspaces?.map((item: WorkspaceType) => (
                      <div key={item._id} className="p-1 w-full">
                        <CoursesCard
                          getWorkspace={() => getWorkspaces()}
                          workspace={item}
                        />
                      </div>
                    ))}
                  </Slider>
                </div>
              </div>
            )
          )}
        </div>
        {/* <div className='my-6'>
          <p className='text-xl'>Courses Under Review</p>
          {pending.length >= 1 ? <div>
            <Slider {...settings}>
              {pending.map((item: CourseType, index: React.Key | null | undefined) => <div key={index} className='p-1 w-full'>
                <div className='border my-4 border-[#1E1E1E59] p-4 rounded-md flex justify-between'>
                  {typeof item.thumbnail === 'string' ? '' : item.thumbnail.type === 'image' ? <img className='rounded-md w-1/2 h-32 object-cover shadow-[26px_0px_32.099998474121094px_0px_#FDC3324D]' src={item.thumbnail.url} alt="" /> :
                    <div className='rounded-md w-1/2 h-32 object-cover shadow-[26px_0px_32.099998474121094px_0px_#FDC3324D]'>
                      <video
                        src={item.thumbnail.url}
                        width="100"
                        autoPlay muted
                        className="embed-responsive-item w-full object-cover h-full"
                      >
                        <source src={item.thumbnail.url} type="video/mp4" />
                      </video>
                    </div>}
                  <div className='pl-10 w-full'>
                    <h4 className='text-xl my-2 font-medium'>{item.title}</h4>
                    <p className='text-xs my-3'>{item.about.substring(0, 30)}</p>
                    <Link href={`/admin/${item._id}?page=${item.type}`}>
                      <button className='p-2 px-6 rounded-sm bg-primary'>Publish</button>
                    </Link>
                  </div>
                </div>
              </div>)}
            </Slider>
          </div> : <div>No courses to review</div>}
        </div> */}
        <AddCourse
          workspace={null}
          open={open}
          handleClick={() => setOpen(!open)}
        />
        {/* <AddResources open={resources} handleClick={() => setResources(!resources)} /> */}
        <AddEvents
          open={event}
          handleClick={() => setEvent(!event)}
          course={null}
        />
        <CategoryModal
          open={category}
          category={null}
          handleClick={() => setCategory(false)}
        />
      </section>
    </DashboardLayout>
  );
};

export default courses;
