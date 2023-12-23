import FooterNav from "@/components/FooterNav";
import HeaderNav from "@/components/HeaderNav";
import SliderComp from "@/components/SliderComp";
import Link from "next/link";
import { Fragment } from "react";

export default function Home() {

  return (
    <Fragment>

      <HeaderNav />
      <main className="landing">
        <section>
          <img className="h-[89vh] w-full object-cover" src="/images/hero.png" alt="" />
          <div className="absolute lg:w-[30%] left-0 text-white right-0 mx-auto text-center bottom-32">
            <h1 className="font-bold text-3xl my-4">Start Your Journey to Become
              a Digital Nomad</h1>
            <p className="text-sm my-4">Learn how to become a trained professional and gain the
              financial freedom that you want!</p>
            <Link href={"/auth/signup"}><button className="bg-primary text-black font-medium w-52 p-2 rounded-sm">Register</button></Link>
          </div>
        </section>
        <section className="lg:flex justify-between lg:mx-20 mx-4 my-20">
          <div className="lg:w-[43%] my-auto lg:order-1">
            <h3 className="text-xl mb-3 font-medium">About Experthub Trainings</h3>
            <p>We are determine to raise the next generation of global leaders and
              empower youths to harness the immense power of technology to
              overcome the challenges our planet faces, including its dwindling
              economy. Our platform is more than just a website; it's a thriving
              community of like-minded individuals who share a passion for change.
              Together, we learn, grow, and collaborate to make a tangible impact
              on our communities and planet.</p>
          </div>
          <img className="sm:mt-6 lg:order-0" src="/images/about-img.png" alt="" />

        </section>
        <section className="lg:m-0 m-4">
          <h3 className="lg:text-2xl text-xl my-10 mb-3 font-medium text-center">Improve Skills & Earn Through Our  Partners</h3>
          <div className="flex lg:w-1/2 mx-auto my-10 justify-between">
            <div>
              <img className="lg:w-20 w-10 object-cover lg:h-20 mx-auto" src="/images/expat.png" alt="" />
              <p className="lg:text-base text-xs font-medium">EXPERTHUB LLC</p>
            </div>
            <div>
              <img className="lg:w-20 w-10 mx-auto" src="/images/peoples-pow.png" alt="" />
              <p className="lg:text-base text-xs  font-medium">PEOPLES POWER</p>
            </div>
            <div>
              <img className="lg:w-20 w-10 mx-auto" src="/images/edf.png" alt="" />
              <p className="lg:text-base text-xs font-medium">ED FOUNDATION</p>
            </div>
          </div>
        </section>
        <section className="lg:mx-20 mx-4 bg-[#F9F7FFE5]">
          <div className="lg:w-1/2 py-10 mx-auto text-center">
            <h3 className="text-2xl font-medium">Explore Courses</h3>
            <p>Experthub Trainings is a training provider that specialises in accredited and
              bespoke training courses, We crush the barriers to getting a degree</p>
          </div>
          <div className="flex justify-between flex-wrap">
            <div className="p-2 lg:w-[32%] my-3 rounded-sm bg-white">
              <img className="rounded-sm w-full" src="/images/card.png" alt="" />
              <h3 className="font-medium my-3">Virtual Assistant</h3>
              <div className="flex justify-between">
                <div className="flex">
                  <img className="w-6 h-6 rounded-full" src="/images/user.png" alt="" />
                  <p className="text-sm font-medium ml-3">Michael samson</p>
                </div>
                <p className="text-sm font-medium">45 Lessons</p>
              </div>
            </div>
            <div className="p-2 my-3 lg:w-[32%] rounded-sm bg-white">
              <img className="rounded-sm w-full" src="/images/card.png" alt="" />
              <h3 className="font-medium my-3">Virtual Assistant</h3>
              <div className="flex justify-between">
                <div className="flex">
                  <img className="w-6 h-6 rounded-full" src="/images/user.png" alt="" />
                  <p className="text-sm font-medium ml-3">Michael samson</p>
                </div>
                <p className="text-sm font-medium">45 Lessons</p>
              </div>
            </div>
            <div className="p-2 my-3 lg:w-[32%] rounded-sm bg-white">
              <img className="rounded-sm w-full" src="/images/card.png" alt="" />
              <h3 className="font-medium my-3">Virtual Assistant</h3>
              <div className="flex justify-between">
                <div className="flex">
                  <img className="w-6 h-6 rounded-full" src="/images/user.png" alt="" />
                  <p className="text-sm font-medium ml-3">Michael samson</p>
                </div>
                <p className="text-sm font-medium">45 Lessons</p>
              </div>
            </div>
            <div className="p-2 my-3 lg:w-[32%] rounded-sm bg-white">
              <img className="rounded-sm w-full" src="/images/card.png" alt="" />
              <h3 className="font-medium my-3">Virtual Assistant</h3>
              <div className="flex justify-between">
                <div className="flex">
                  <img className="w-6 h-6 rounded-full" src="/images/user.png" alt="" />
                  <p className="text-sm font-medium ml-3">Michael samson</p>
                </div>
                <p className="text-sm font-medium">45 Lessons</p>
              </div>
            </div>
          </div>
          <div className="text-center my-10">
            <button className="bg-primary p-3 rounded-sm px-10">View Less Courses</button>
          </div>
        </section>
        <section className="">
          <div className="lg:w-[35%] py-10 mx-auto text-center">
            <h3 className="text-2xl font-medium">Get To Your Success In 3 Simple Steps</h3>
            <p>Here's a glimpse into the 3 stages we'll adopt to execute this
              transformative training initiative</p>
          </div>
          <div className="lg:flex justify-between my-10 lg:px-20 px-4 border-t border-[#1E1E1EA6]">
            <div className="lg:-mt-6 mt-6 lg:w-[32%]">
              <div className="bg-[#DC9F08] w-12 h-12 text-xl pt-[10px] text-white font-mediun text-center rounded-full">1</div>
              <div className="mt-4">
                <h3 className="mb-3 font-medium">Needs Assessment and Skill Profiling</h3>
                <p>Before embarking on any journey, it's crucial to understand
                  the terrain. We will start by conducting a comprehensive
                  needs assessment to identify the specific digital skills in
                  demand. Our experts will also profile the existing skillsets
                  of aspiring learners to tailor our training programs effectively.
                  This stage ensures that each participant's learning path is
                  personalized, setting them up for success.</p>
              </div>
            </div>
            <div className="lg:-mt-6 mt-6 lg:w-[32%]">
              <div className="bg-[#1E1E1E] w-12 h-12 text-xl pt-[10px] text-white font-mediun text-center rounded-full">2</div>
              <div className="mt-4">
                <h3 className="mb-3 font-medium">Specialized Training Modules</h3>
                <p>Compac Consult is committed to offering a diverse
                  range of training modules that cater to the digital
                  ecosystem's multifaceted needs. Whether it's coding
                  data analysis, digital marketing, cybersecurity, or any
                  other tech domain, our training programs are designed
                  to foster expertise. We will bring in industry professionals
                  and subject matter experts to provide real-world insights
                  ensuring that our participants receive the most relevant
                  and up-to-date knowledge.</p>
              </div>
            </div>
            <div className="lg:-mt-6 mt-6 lg:w-[32%]">
              <div className="bg-[#1E1E1E] w-12 h-12 text-xl pt-[10px] text-white font-mediun text-center rounded-full">3</div>
              <div className="mt-4">
                <h3 className="mb-3 font-medium">Hands-On Experience and Placement</h3>
                <p>Learning by doing is our mantra. We believe in the power
                  of practical experience. In this stage, our participants will
                  work on real-world projects, gaining hands-on skills in a
                  supervised environment. Additionally, we'll collaborate with
                  leading tech companies to offer internship opportunities and
                  support in job placement through our platform 'ExpertHub LLC'
                  an International Company Registered in the state of New York,
                  USA. Our ultimate goal is to facilitate the placement of 30,000
                  technical talents across Nigeria (and beyond) in this first phase.</p>
              </div>
            </div>
          </div>
        </section>
        <section className=" bg-[#F9F7FFE5]">
          <div className="lg:w-1/2 py-10 mx-auto text-center">
            <h3 className="text-2xl font-medium">Shape the future workforce</h3>
            <p>We invite individuals and trainers all over the word to submit applications for the initial phase of the training</p>
          </div>
          <div className="lg:flex justify-between">
            <div className="lg:w-[49%] relative">
              <img className="w-full lg:h-[80vh] object-cover" src="/images/fellow.png" alt="" />
              <div className="absolute w-[80%] left-0 text-white right-0 mx-auto text-center bottom-10">
                <h1 className="font-bold text-2xl my-4">Become A Fellow</h1>
                <p className="text-sm my-4">You don't need any previous knowledge just great English
                  speaking skills. It's easy fill and submit the form.</p>
                <button className="bg-primary text-black font-medium w-52 p-2 rounded-sm">Sign Up Now</button>
              </div>
            </div>
            <div className="lg:w-[49%] relative">
              <img className="w-full lg:h-[80vh] object-cover" src="/images/trainer.png" alt="" />
              <div className="absolute w-[80%] left-0 text-white right-0 mx-auto text-center bottom-10">
                <h1 className="font-bold text-2xl my-4">Become A Trainer</h1>
                <p className="text-sm my-4">Organizations & Individuals interested in becoming part of our network of
                  training providers to educate African fellows throughout as we develop
                  an effective strategy for training and deploying technical talents
                </p>
                <button className="bg-primary text-black font-medium w-52 p-2 rounded-sm">Sign Up Now</button>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="lg:w-[35%] py-10 sm:px-4 mx-auto text-center">
            <h3 className="text-2xl font-medium">Our Instructors</h3>
            <p>Connect with top instructors that are sound and see the future in teaching</p>
          </div>
          <SliderComp />
        </section>
        <section className="my-20 relative">
          <img className="sm:h-[100vh]" src="/images/trainings-bg.png" alt="" />
          <div className="flex justify-between absolute lg:top-8 top-6 lg:left-20 sm:p-4">
            <div className="lg:w-[40%]">
              <h3 className="font-medium mb-5 text-2xl">Experthub Trainings Is Going To</h3>
              <ul>
                <li className="p-2">Provide comprehensive training programs that cover a wide
                  spectrum of tech skills, ensuring that you receive a well-rounded
                  education in your chosen field.</li>
                <li className="p-2">Provide insights, guidance, and practical expertise based on real
                  world experience from experienced and knowledgeable instructors.</li>
                <li className="p-2">Highly increase your confidence level to undertake bolder projects
                  in your industry and even in others</li>
                <li className="p-2">Tailor their training programs to suit your individual learning needs
                  ensuring that you receive a personalized education that matches
                  your pace and style.</li>
                <li className="p-2">Offer career placement services, helping you secure employment
                  or internships.</li>
                <li className="p-2">Teach you hands-on projects and exercises to reinforce your learning</li>
              </ul>
            </div>
            <img className="lg:block hidden" src="/images/trainings.png" alt="" />
          </div>
        </section>
        <section className="lg:mx-20 mx-4">
          <div className="lg:w-[70%] py-10 mx-auto text-center">
            <h3 className="text-2xl font-medium">JOIN OUR NETWORKS</h3>
            <p>We're not just a training provider; we're a career accelerator. We are dedicated to helping you
              not only become an expert in your field but also to apply that expertise to meaningful and financially rewarding work.</p>
          </div>
          <div className="lg:flex justify-between">
            <div className="lg:w-[33%] my-3 relative">
              <img src="/images/network_1.png" alt="" />
              <div className="absolute p-3 left-0 right-0 top-0">
                <div className="flex mb-3 text-white justify-between">
                  <p className="text-xl font-medium uppercase w-[60%]">Mentorship Beyond
                    Training</p>
                  <img src="/images/icons/mic.svg" alt="" />
                </div>
                <p className="text-white">Mentorship is the cornerstone of success in any field, and at Expert Hub LLC, we understand its importance. As you complete your training, we don't leave you hanging. We provide mentorship to guide you through your career path. Our mentors are seasoned professionals with a wealth of experience in their respective fields. They will offer insights, advice, and support to help you navigate the complexities of your chosen industry.</p>
              </div>
            </div>
            <div className="lg:w-[33%] my-3 relative">
              <img src="/images/network_2.png" alt="" />
              <div className="absolute p-3 left-0 right-0 top-0">
                <div className="flex mb-3 text-white justify-between">
                  <p className="text-xl font-medium uppercase w-[60%]">Opportunities to Make Money</p>
                  <img src="/images/icons/mic.svg" alt="" />
                </div>
                <p className="text-white">At Expert Hub LLC, we're not just about learning; we're about application. As soon as you complete your training, we're thrilled to enlist you into our prestigious network of experts. What does this mean for you? It means you gain access to a diverse pool of businesses and clients looking for your expertise</p>
              </div>
            </div>
            <div className="lg:w-[33%] my-3 relative">
              <img src="/images/network_1.png" alt="" />
              <div className="absolute p-3 left-0 right-0 top-0">
                <div className="flex mb-3 text-white justify-between">
                  <p className="text-xl font-medium uppercase w-[60%]">Join Our Network of Experts</p>
                  <img src="/images/icons/mic.svg" alt="" />
                </div>
                <p className="text-white">Our platform is a marketplace of opportunity. As a member of our expert network, you can browse through a wide range of job listings and projects that align with your skills and interests. Whether you're a tech guru, a virtual assistant, or a journalist, there are opportunities waiting for you. Your journey doesn't stop at learning – it continues with earning.</p>
              </div>
            </div>
          </div>
        </section>
        <section className="my-20">
          <div className="text-center">
            <h3 className="text-2xl font-medium">Frequently Asked Questions</h3>
            <div className="w-20 my-6 mx-auto h-1 bg-primary"></div>
          </div>

        </section>
      </main>
      <FooterNav />
    </Fragment>
  )
}
