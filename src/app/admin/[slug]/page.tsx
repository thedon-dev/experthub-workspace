import { WorkspaceType } from "@/types/CourseType";
import DashboardLayout from "@/components/DashboardLayout";
import AddCourse from "@/components/modals/AddWorkspace";
import SinglePage from "@/components/SinglePage";
import apiService from "@/utils/apiService";

export async function generateStaticParams() {
  try {
    const response = await apiService.get("courses");

    if (!response.data || !Array.isArray(response.data.courses)) {
      console.error("Invalid API response:", response.data);
      return [];
    }

    return response.data.courses.map((course: { id: string }) => ({
      slug: course.id,
    }));
  } catch (error) {
    console.error("Error fetching courses:", error);
    return [];
  }
}

const SingleCourse = async ({ params }: { params: { slug: string } }) => {
  let repo: WorkspaceType | null = null;

  try {
    const response = await apiService.get(
      `workspace/single-workspace/${params.slug}`
    );
    repo = response.data.course;
  } catch (error) {
    console.error("Error fetching course data:", error);
  }

  const approve = async () => {
    try {
      await apiService.put(`courses/approve/${params.slug}`);
      console.log("Course approved");
    } catch (error) {
      console.error("Error approving course:", error);
    }
  };

  return (
    <DashboardLayout>
      <section>
        <div className="flex">
          <button className="p-4 bg-primary m-6" onClick={approve}>
            Publish
          </button>
        </div>
        {repo && (
          <SinglePage pathname="course" repo={repo} page={params.slug} />
        )}
        {repo && (
          <AddCourse workspace={repo} open={false} handleClick={() => {}} />
        )}
      </section>
    </DashboardLayout>
  );
};

export default SingleCourse;
