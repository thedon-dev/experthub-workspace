"use client";

import DashboardLayout from "@/components/DashboardLayout";
import { useAppSelector } from "@/store/hooks";
import { AssesmentType } from "@/types/AssesmentType";
import apiService from "@/utils/apiService";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const SingleAssessment: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const user = useAppSelector((state) => state.value);
  const type = searchParams.get("type");

  const [assessment, setAssessment] = useState<AssesmentType | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [answers, setAnswers] = useState<{ answer: string }[]>([]);
  const [showGradeModal, setShowGradeModal] = useState(false);

  useEffect(() => {
    const getAssessment = async () => {
      try {
        const response = await apiService.get(
          `assessment/single/${pathname.split("/").pop()}`
        );
        const fetchedAssessment = response.data.myAssesment[0];
        setAssessment(fetchedAssessment);
        setAnswers(
          new Array(fetchedAssessment.assesment.length).fill({ answer: "" })
        );
        setSelectedAnswers(
          new Array(fetchedAssessment.assesment.length).fill(-1)
        );
      } catch (error) {
        console.error("Error fetching assessment:", error);
      }
    };
    getAssessment();
  }, [pathname]);

  const handleInputChange = (index: number, value: string) => {
    setAnswers((prev) => {
      const updated = [...prev];
      updated[index] = { answer: value };
      return updated;
    });
  };

  const handleSelect = (questionIndex: number, answerIndex: number) => {
    setSelectedAnswers((prev) => {
      const updated = [...prev];
      updated[questionIndex] = answerIndex;
      return updated;
    });
  };

  const calculateGrade = (): number => {
    if (!assessment) return 0;
    return assessment.assesment.reduce(
      (grade: any, question: any, index: any) => {
        return (
          grade +
          (selectedAnswers[index] === question.correctAnswerIndex ? 1 : 0)
        );
      },
      0
    );
  };

  const isEligibleForCertificate = (): boolean => {
    if (!assessment) return false;
    const totalScore = calculateGrade();
    const totalQuestions = assessment.assesment.length;
    return (
      (totalScore / totalQuestions) * 100 >= 50 ||
      (totalScore === 1 && totalQuestions === 1)
    );
  };

  const handleSubmit = async () => {
    if (!assessment || selectedAnswers.includes(-1)) {
      alert("Please answer all questions before submitting.");
      return;
    }
    setShowGradeModal(true);
  };

  const send = async () => {
    try {
      await apiService.post(
        `assessment/submit-assessment/${pathname.split("/").pop()}`,
        {
          studentId: user.id,
          answers,
        }
      );
      alert("Assessment submitted!");
      router.back();
    } catch (error) {
      console.error("Error submitting assessment:", error);
    }
  };

  const claimCertificate = async () => {
    if (!assessment) return;
    try {
      await apiService.post("certificate/claim", {
        user: user.id,
        title: assessment.title,
        tutor: assessment.tutor,
      });
      alert("Certificate claimed successfully!");
      router.back();
    } catch (error) {
      console.error("Error claiming certificate:", error);
    }
  };

  return (
    <DashboardLayout>
      <div className="p-4">
        <p className="text-lg font-medium">Welcome, {user.fullName}</p>
        <p>
          Confirm Your Skill & Technical Level (
          {assessment?.title || "Loading..."})
        </p>

        {assessment?.assesment.map((question: any, index: number) => (
          <div key={index} className="bg-white p-4 my-3 rounded-md">
            <p className="font-medium">Question {index + 1}</p>
            <p>{question.question}</p>
            {type === "theory" ? (
              <textarea
                onChange={(e) => handleInputChange(index, e.target.value)}
                placeholder="Enter your response here"
                className="p-2 bg-gray-200 w-full h-16"
              />
            ) : (
              ["A", "B", "C"].map((option, optionIndex) => (
                <div key={optionIndex} className="flex items-center">
                  <input
                    type="radio"
                    checked={selectedAnswers[index] === optionIndex}
                    onChange={() => handleSelect(index, optionIndex)}
                  />
                  <p className="ml-2">{question[`answer${option}`]}</p>
                </div>
              ))
            )}
          </div>
        ))}

        <button
          onClick={type === "theory" ? send : handleSubmit}
          className="p-2 px-10 bg-yellow-500 rounded-md"
        >
          Submit
        </button>

        {showGradeModal && (
          <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-md text-center">
              <h1 className="text-2xl font-medium">
                Congratulations {user.fullName}!
              </h1>
              <p>
                {isEligibleForCertificate()
                  ? "You passed and can claim your certificate."
                  : "You scored below average. Retake the test to qualify."}
              </p>
              <div className="flex justify-center mt-4">
                {isEligibleForCertificate() && (
                  <button
                    onClick={claimCertificate}
                    className="p-2 px-6 bg-green-500 text-white rounded-md mr-4"
                  >
                    Claim Certificate
                  </button>
                )}
                <button
                  onClick={() => router.back()}
                  className="p-2 px-6 bg-gray-500 text-white rounded-md"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default SingleAssessment;
