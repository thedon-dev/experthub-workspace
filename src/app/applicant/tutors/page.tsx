"use client";

import DashboardLayout from "@/components/DashboardLayout";
import AdmissionCard from "@/components/cards/AdmissionCard";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "@/store/hooks";
import { UserType } from "@/types/UserType";
import apiService from "@/utils/apiService";

const tutor = () => {
  const [instructors, setInstructors] = useState<UserType | []>([]);
  const user = useAppSelector((state) => state.value);
  const [all, setAll] = useState<UserType | []>([]);
  const [showPremuim, setShowPremuim] = useState(false);

  const getTutors = () => {
    apiService.get("workspaces/all").then(function (response) {
      setInstructors(response.data.instructors);
      setAll(response.data.instructors);
      console.log(response.data);
    });
  };

  const search = (value: string) => {
    const results = all.filter((obj: UserType) =>
      obj.fullname.toLowerCase().includes(value.toLowerCase())
    );
    setInstructors(results);
  };

  useEffect(() => {
    getTutors();
  }, []);
  return (
    <DashboardLayout>
      {/* <SearchNav /> */}
      <section className="m-4">
        <p className="text-lg my-3 font-medium">Workspace Providers</p>
        <div className="w-1/2 relative">
          <input
            onChange={(e) => search(e.target.value)}
            type="text"
            className="pl-10 p-2 w-full rounded-md border border-[#1E1E1E8A] bg-transparent"
            placeholder="Search workspaces"
          />
          <img
            className="absolute top-2 w-6 left-2"
            src="/images/icons/search.svg"
            alt=""
          />
        </div>
        {instructors.length > 0 ? (
          instructors.map((tutor: UserType, index: any) => (
            <AdmissionCard
              setShowPremium={setShowPremuim}
              role="mentors"
              tutor={tutor}
              key={index}
            />
          ))
        ) : (
          <p>No workspace available!</p>
        )}
      </section>
    </DashboardLayout>
  );
};

export default tutor;
