'use client'

import React, { useContext, useEffect, useRef, useState } from 'react';
import { useAppSelector } from '@/store/hooks';
import { CategoryType, CourseType } from '@/types/CourseType';
import { notification } from 'antd';
import Select from 'react-select';
import { UserType } from '@/types/UserType';
import { Spin } from 'antd';
import AddResources from './AddResources';
import apiService from '@/utils/apiService';
import Play from '../icons/play';
import Pause from '../icons/pause';
import Video from '../icons/video';
import Replace from '../icons/replace';
import Bin from '../icons/bin';
import { AxiosProgressEvent } from 'axios';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween'
import advancedFormat from 'dayjs/plugin/advancedFormat'
dayjs.extend(isBetween)
dayjs.extend(advancedFormat)

const AddCourse = ({ open, handleClick, course }: { open: boolean, handleClick: any, course: CourseType | null }) => {
  const user = useAppSelector((state) => state.value);
  // const { zoomUser } = useZoom()

  const uploadRef = useRef<HTMLInputElement>(null)
  const pdfUploadRef = useRef<HTMLInputElement>(null)
  const [api, contextHolder] = notification.useNotification();
  const [active, setActive] = useState(0)
  const [about, setAbout] = useState(course?.about || "")
  const [startDate, setStartDate] = useState(course?.startDate || dayjs().format('YYYY-MM-DD'))
  const [endDate, setEndDate] = useState(course?.endDate.toString() || "")
  const [startTime, setStartTime] = useState(course?.startTime || dayjs().format('HH:mm'))
  const [endTime, setEndTime] = useState(course?.endTime || "")
  const [striked, setStriked] = useState<number>(course?.strikedFee || 0)
  const [fee, setFee] = useState<number>(course?.fee || 0)
  const [duration, setDuration] = useState<number>(course?.duration || 0)
  const [category, setCategory] = useState(course?.category || "")
  const [categoryIndex, setCategoryIndex] = useState("")
  const [resources, setResource] = useState(false)
  const [liveCourses, setLiveCourses] = useState([])


  const [privacy, setPrivacy] = useState(course?.privacy || "")
  const [type, setType] = useState(course?.type || "offline")
  const [title, setTitle] = useState(course?.title || "")
  const [image, setImage] = useState<any>(course?.thumbnail || null)
  const [location, setLocation] = useState(course?.loaction || "")
  const [target, setTarget] = useState(course?.target || 0)

  const [room, setRoom] = useState(course?.room || "")
  const [loading, setLoading] = useState(false)
  const [students, setStudents] = useState([])
  const [scholarship, setScholarship] = useState([])

  const getStudents = () => {
    apiService.get('user/students')
      .then(function (response) {
        setStudents(response.data.students)
        // console.log(response.data)
      })
  }

  const [pdf, setPdf] = useState("")
  let layout = {
    title: "",
    videoUrl: "",
    video: null
  }
  let module = {
    title: "",
    description: ""
  }
  const [videos, setVideos] = useState(course?.videos || [layout])

  const [uploadedCount, setUploadedCount] = useState(0);
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploading, setUploading] = useState(false)


  const [categories, setCategories] = useState<CategoryType[]>([])

  const [modules, setModules] = useState(course?.modules || [module])
  const [benefits, setBenefits] = useState(course?.benefits || [""])
  const [days, setDays] = useState(course?.days || [{
    day: "Monday",
    startTime: "",
    endTime: "",
    checked: false
  },
  {
    day: "Tuesday",
    startTime: "",
    endTime: "",
    checked: false
  },
  {
    day: "Wednesday",
    startTime: "",
    endTime: "",
    checked: false
  },
  {
    day: "Thursday",
    startTime: "",
    endTime: "",
    checked: false
  },
  {
    day: "Friday",
    startTime: "",
    endTime: "",
    checked: false
  },
  {
    day: "Saturday",
    startTime: "",
    endTime: "",
    checked: false
  }])


  const [playingIndex, setPlayingIndex] = useState<number | null>(null)

  const handlePlayClick = (index: number) => {
    const video = document.querySelector(`video.video${index}`) as HTMLVideoElement;

    if (video) {
      if (video.paused) {
        video.play();
        setPlayingIndex(index)
      } else {
        video.pause();
        setPlayingIndex(null)
      }
    }
  };

  const uploadVideo = async (index: number) => {
    try {
      const { video, videoUrl } = videos[index];

      if (videoUrl.includes(`res.cloudinary.com`)) return;
      if (!video) return;
      const { data } = await apiService.get('courses/cloudinary/signed-url');
      console.log(data);

      const formData = new FormData();
      formData.append('file', video);
      formData.append('api_key', data.apiKey);
      formData.append('timestamp', data.timestamp);
      formData.append('signature', data.signature);

      const { data: dataCloud } = await apiService.post(`https://api.cloudinary.com/v1_1/${data.cloudname}/video/upload`, formData, {
        onUploadProgress: (progressEvent: AxiosProgressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1));
          setUploadProgress(percentCompleted);
        }
      });
      console.log(dataCloud);

      setUploadedCount(prev => prev + 1);
      setVideos(prevVideos => {
        const updatedVideos = [...prevVideos];
        updatedVideos[index] = {
          ...updatedVideos[index],
          videoUrl: dataCloud.secure_url
        };
        return updatedVideos;
      });
    } catch (e) {
      console.error(e, `\n from uploader`);
      throw e
    }
  };
  const getCategories = () => {
    apiService.get('category/all').then(function (response) {
      setCategories(response.data.category)
    }).catch(error => {
      console.log(error)
    })
  }

  const handleModulesInputChange = (index: number, field: string, value: string | number | boolean) => {
    const updatedObjects = [...modules];
    updatedObjects[index] = { ...updatedObjects[index], [field]: value };
    setModules(updatedObjects);
  };

  const handleBenefitsInputChange = (index: number, value: string | number | boolean) => {
    const updatedObjects = [...benefits];
    updatedObjects[index] = value;
    setBenefits(updatedObjects);
  };

  const handleDaysInputChange = (index: number, field: string, value: string | number | boolean) => {
    const updatedObjects = [...days];
    if (type === `online`) {
      if (value) {
        updatedObjects[index] = { ...updatedObjects[index], startTime, endTime, [field]: value };
        return setDays(updatedObjects)
      } else {
        updatedObjects[index] = { ...updatedObjects[index], startTime: ``, endTime: ``, [field]: value };
        return setDays(updatedObjects)
      }
    }
    updatedObjects[index] = { ...updatedObjects[index], [field]: value };
    return setDays(updatedObjects);
  };

  const handleInputChange = (index: number, field: string, value: string | number) => {
    const updatedObjects = [...videos];
    updatedObjects[index] = { ...updatedObjects[index], [field]: value };
    setVideos(updatedObjects);
  };

  const handleVideo = (e: React.ChangeEvent<HTMLInputElement>, index: any) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const updatedObjects = [...videos];
      const videoUrl = URL.createObjectURL(files[0]);
      updatedObjects[index] = { ...updatedObjects[index], video: files[0], videoUrl };
      setVideos(updatedObjects);

    }

  };
  const removeVideo = (index: number) => {
    const newVideos = videos.filter((_, i) => i !== index)
    if (newVideos.length === 0) {
      setVideos([...newVideos, layout])
    } else {
      setVideos([...newVideos])
    }

  };


  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {

    const files = e.target.files
    // setFile(e.target.files)

    const reader = new FileReader()
    if (files && files.length > 0) {

      reader.readAsDataURL(files[0])
      reader.onloadend = () => {
        if (reader.result) {
          const type = files[0].name.substr(files[0].name.length - 3)
          setImage({
            type: type === "mp4" ? "video" : "image",
            url: reader.result as string
          })
        }
      }
    }
  }

  const handlePdf = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files

    const reader = new FileReader()
    if (files && files.length > 0) {
      reader.readAsDataURL(files[0])
      reader.onloadend = () => {
        if (reader.result) {
          setPdf(reader.result as string)
          // setImage(reader.result as string)
        }
      }
    }
  }

  const getScholarship = () => {
    const arrayOfIds = scholarship.map((object: any) => object.value)
    return arrayOfIds
  }


  const edit = () => {
    try {
      setLoading(true)

      apiService.put(`courses/edit/${course?._id}`,
        {
          // image,
          title,
          benefits,
          days: days,
          about,
          modules,
          duration: duration.toString(),
          type,
          startDate,
          target,
          endDate,
          startTime,
          endTime,
          category,
          privacy,
          fee: fee.toString(),
          strikedFee: striked.toString(),
          enrolledStudents: course && [...course?.enrolledStudents, ...getScholarship()],
          room,
          location,
          // videos,
          // pdf
        }
      )
        .then(function (response) {
          console.log(response.data)
          setLoading(false)
          handleClick()
        })
    } catch (e) {
      console.log(e)

    }
  }


  const add = async () => {

    if (type === 'video') {
      try {
        console.log(videos.filter(video => video.video === null));

        if (videos.filter(video => video.video === null).length > 0) {
          return api.open({
            message: `You must upload a video file to create this course`,
          });
        }

        setUploading(true);
        console.log(videos);

        await Promise.all(videos.map((_, index) => uploadVideo(index)));
        setUploading(false);
      } catch (e) {
        console.error(e);
        setUploading(false);
        return api.open({
          message: `Something went wrong during video upload`,
        });
      }
    }



    if (
      title &&
      about &&
      duration &&
      category &&
      image &&
      benefits.length >= 1 &&
      (type === "offline" ? startDate && endDate && startTime && endTime && room && location :
        type === "online" ? startDate && endDate && startTime && endTime :
          type === "video" ? videos : pdf)
    ) {
      setLoading(true);
      apiService.post(`courses/add-course/${user.id}`, {
        asset: image,
        title,
        target,
        about,
        duration: duration.toString(),
        type,
        startDate: new Date(`${startDate}T${startTime}:00`),
        endDate: new Date(`${endDate}T${endTime}:00`),
        startTime,
        endTime,
        category: category === "" ? categoryIndex : category,
        privacy,
        fee: fee.toString(),
        strikedFee: striked.toString(),
        room,
        modules,
        location,
        videos,
        pdf,
        days,
        benefits,
        scholarship: getScholarship(),
      })
        .then(function (response) {
          api.open({
            message: "Course successfully created!",
          });
          console.log(response.data);
          setLoading(false);
          setResource(true);
          handleClick();
        })
        .catch(error => {
          console.log(error);
          setLoading(false);
          api.open({
            message: error.response.data.message,
          });
        });
    } else {
      api.open({
        message: "Please fill all fields!",
      });
    }
  };

  const getLiveCourses = () => {
    apiService.get('courses/live')
      .then(function (response) {
        setLiveCourses(response.data)
      }).catch(e => {
        console.log(e);

      })
  }
  useEffect(() => {
    getStudents()
    getCategories()
    getLiveCourses()
  }, [])



  const formattedOptions = students.map((option: UserType) => ({ value: option.studentId, label: option.fullname }));

  const removeBenefits = (targetIndex: any) => {
    const newArray = benefits.filter((item: any, index: any) => index !== targetIndex);
    setBenefits(newArray)
  }

  const removeModules = (targetIndex: any) => {
    const newArray = modules.filter((item: any, index: any) => index !== targetIndex);
    setModules(newArray)
  }



  useEffect(() => {
    if (type === 'online' && startTime) {
      const [hours, minutes] = startTime.split(':');
      const startDateIn = new Date(new Date(startDate).setHours(parseInt(hours), parseInt(minutes)));
      const endDateIn = new Date()
      endDateIn.setTime(startDateIn.getTime() + ((duration || 1) * 60000))
      const endTime = dayjs(endDateIn).format('HH:mm')
      setEndTime(endTime);

      setDays((prev: any) => prev.map((day: any) => {
        if (day.checked) {
          return { ...day, startTime, endTime }
        }
        return { ...day, startTime: "", endTime: "" }
      }))

    } else {
      setDuration(0);
    }
    if (duration > 40) {
      setDuration(40);
    }
  }, [type, startTime, duration]);




  return (
    open ? <div>
      <div onClick={() => handleClick()} className='fixed cursor-pointer bg-[#000000] opacity-50 top-0 left-0 right-0 w-full h-[100vh] z-10'></div>
      <div className='fixed top-10 bottom-10 left-0 overflow-y-auto rounded-md right-0 lg:w-[70%] w-[95%] mx-auto z-20 bg-[#F8F7F4]'>
        <div className='shadow-[0px_1px_2.799999952316284px_0px_#1E1E1E38] p-4 lg:px-12 flex justify-between'>
          <p className='font-medium'>Add Course</p>
          <img onClick={() => handleClick()} className='w-6 h-6 cursor-pointer' src="/images/icons/material-symbols_cancel-outline.svg" alt="" />
        </div>
        {contextHolder}
        <div className='lg:flex justify-between lg:mx-12 mx-4 my-4'>
          <div className='lg:w-[48%]'>
            <div>
              <p className='text-sm font-medium my-1'>Course Image/Video Overview</p>
              {image ? image.type === 'image' ? <img onClick={() => uploadRef.current?.click()} src={image?.url} className='w-full object-cover h-52' alt="" /> : <video
                onClick={() => uploadRef.current?.click()}
                src={image.url}
                width="500"
                autoPlay
                controls
                className="embed-responsive-item w-full object-cover h-full"
              >
                <source src={image.url} type="video/mp4" />
              </video> :
                <button className='border border-[#1E1E1ED9] p-2 my-1 rounded-md font-medium w-full' onClick={() => uploadRef.current?.click()}>
                  <img src="/images/icons/upload.svg" className='w-8 mx-auto' alt="" />
                  <p> Add course</p>
                </button>}

              {
                (liveCourses.length !== 0 && type === `online`) && <div className='flex flex-col mt-7'>
                  <p className='text-[19px]'> Upcoming courses</p>
                  <span className='text-slate-400'>You cannot create courses within these times</span>
                  <div className='flex flex-col gap-1 overflow-y-auto max-h-[500px] mt-7 '>
                    {
                      liveCourses.map((course: any, i: number) => <div className='flex  items-center justify-between border-b py-2 border-slate-400'>
                        <span className='font-normal text-ellipsis whitespace-nowrap capitalize'>{i + 1})</span>

                        <span className='font-normal text-ellipsis whitespace-nowrap capitalize'>{course.title}</span>
                        <div className='flex flex-col' >
                          <span className='flex'>{dayjs(course.startDate).format('Do MMMM YYYY')} -  {dayjs(course.endDate).format('Do MMMM YYYY')}</span>

                          <div className='flex items-center gap-2'>
                            Every - <span className='text-sm'>{course.days.filter((day: any) => day.checked).map((day: any, i: number) => <span>{day.day + `${(i + 1 !== course.days.filter((day: any) => day.checked).length) ? `, ` : ``}`}</span>)}</span>

                          </div>
                          <div className='flex items-center'>
                            @ {course.startTime} - {course.endTime}
                          </div>
                        </div>
                      </div>)
                    }

                  </div>
                </div>
              }


            </div>
            <div className='flex my-1'>
            </div>
            <input
              onChange={handleImage}
              type="file"
              name="identification"
              ref={uploadRef}
              accept='video/*,image/*'
              hidden
              multiple={false}
            />

            {
              type === 'pdf' && <div>
                <p className='text-sm font-medium my-1'>Course Content</p>
                <button className='border border-[#1E1E1ED9] h-32 p-2 my-1 rounded-md font-medium w-full' onClick={() => pdfUploadRef.current?.click()}>
                  <img src="/images/icons/upload.svg" className='w-8 mx-auto' alt="" />
                  <p> Click to upload</p></button>
                <p className='text-sm'>{pdf === "" ? "" : pdf.slice(0, 20)}</p>
              </div>
            }
            <input
              onChange={handlePdf}
              type="file"
              name="identification"
              accept=".pdf"
              ref={pdfUploadRef}
              hidden
              multiple={false}
            />
            {/* <Dragger {...props}>
              <div className=''>
                <img src="/images/icons/upload.svg" className='mx-auto' alt="" />
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
              </div>
            </Dragger> */}
          </div>
          <div className='lg:w-[48%]'>
            <div className='border-b font-medium flex justify-between border-[#1E1E1E12]'>
              <div className={active === 0 ? 'border-b border-primary p-2' : 'p-2 cursor-pointer'}>
                <p onClick={() => setActive(0)}>Course Details</p>
              </div>
              <div className={active === 1 ? 'border-b border-primary p-2' : 'p-2 cursor-pointer'}>
                <p onClick={() => setActive(1)}>Descriptions</p>
              </div>
              <div className={active === 2 ? 'border-b border-primary p-2' : 'p-2 cursor-pointer'}>
                <p onClick={() => setActive(2)}>Fee</p>
              </div>
              <div className={active === 3 ? 'border-b border-primary p-2' : 'p-2 cursor-pointer'}>
                <p onClick={() => setActive(3)}>Modules</p>
              </div>
            </div>
            <div>
              {(() => {
                switch (active) {
                  case 0:
                    return <div>
                      <div className='flex justify-between my-1'>
                        <div className='w-full'>
                          <label className='text-sm font-medium my-1'>Course Category</label>
                          <select onChange={e => setCategoryIndex(e.target.value)} value={categoryIndex} className='border rounded-md w-full border-[#1E1E1ED9] p-2 bg-transparent'>
                            <option className='hidden' value="">Select Category</option>
                            {categories.map((single, index) => <option key={index} value={single.category}>{single.category}</option>)}
                          </select>
                        </div>
                        {categories.map(single => single.category === categoryIndex && single.subCategory.length >= 1 && <div key={single._id} className='w-full ml-3'>
                          <label className='text-sm font-medium my-1'>Sub Category</label>
                          <select onChange={e => setCategory(e.target.value)} value={category} className='border rounded-md w-full border-[#1E1E1ED9] p-2 bg-transparent'>
                            <option className='hidden' value="">Select Sub-Category</option>
                            {single.subCategory.map((sub, index) => <option key={index} value={sub}>{sub}</option>)}
                          </select>
                        </div>)}
                      </div>
                      <div className='my-1'>
                        <label className='text-sm font-medium my-1'>Target</label>
                        <input onChange={e => setTarget(e.target.value)} value={target} type="text" className='border rounded-md w-full border-[#1E1E1ED9] p-2 bg-transparent' />
                      </div>

                      <div className='my-1'>
                        <label className='text-sm font-medium my-1'>Course title</label>
                        <input onChange={e => setTitle(e.target.value)} value={title} type="text" className='border rounded-md w-full border-[#1E1E1ED9] p-2 bg-transparent' />
                      </div>
                      <div className='my-1'>
                        <label className='text-sm font-medium my-1'>About course</label>
                        <textarea onChange={e => setAbout(e.target.value)} value={about} className='border rounded-md border-[#1E1E1ED9] w-full h-32 p-2 bg-transparent'></textarea>
                      </div>

                      <div className='my-1'>
                        <label className='text-sm font-medium my-1' >Course Benefits</label>
                        {benefits.map((single: string, index: any) => <div className='flex'>
                          <input onChange={e => handleBenefitsInputChange(index, e.target.value)} className='border rounded-md w-full border-[#1E1E1ED9] p-2 my-1 bg-transparent' key={index} value={single} type="text" />
                          <div onClick={() => removeBenefits(index)} className='my-auto ml-5 cursor-pointer'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                              <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                            </svg>
                          </div>
                        </div>)}
                        <button onClick={() => setBenefits([...benefits, ""])} className='p-2 bg-primary rounded-md mt-2'>Add</button>
                      </div>
                    </div>
                  case 1:
                    return <div>
                      {/* <div className='my-1'>
                        <label className='text-sm font-medium my-1'>Instructor Name</label>
                        <input onChange={e => setAuthor(e.target.value)} value={author} type="text" className='border rounded-md w-full border-[#1E1E1ED9] p-2 bg-transparent' />
                      </div> */}
                      <div className='flex justify-between mt-6 my-1'>
                        <div className='w-[48%]'>
                          <label className='text-sm font-medium my-1 inline-flex items-center'>Course type</label>
                          <select onChange={e => { setType(e.target.value) }} value={type} className='border rounded-md w-full border-[#1E1E1ED9] p-2.5 bg-transparent'>
                            <option value="offline">Offline</option>
                            <option value="online">Live</option>
                            <option value="video">Video</option>
                            <option value="pdf">PDF</option>
                          </select>
                          {/* {type === "online" && <>
                            {
                              zoomUser === null ? (
                                <p className="text-red-500 text-sm my-2">
                                  You need to sign in with Zoom to create a live course.
                                  <button onClick={handleZoomLogin} className="text-blue-600 underline">Sign in with Zoom</button>
                                </p>
                              ) : <div className=' text-sm'>
                                Zoom account - <span className='font-medium'>{zoomUser.email}</span>
                                <button onClick={handleZoomLogin} className="text-blue-600 underline flex text-[12px]">Switch Account</button>
                              </div>
                            }

                          </>} */}
                        </div>

                        <div className='w-[48%]'>
                          <label className='text-sm font-medium my-1 inline-flex items-center gap-1'>Duration {
                            type === `online` && <>
                              - <span className='text-orange-500 leading-3 font-thin text-[12px]'>{process.env.NEXT_PUBLIC_MEETING_DURATION}min max for Live</span>
                            </>
                          } </label>
                          <input onChange={e => setDuration(parseInt(e.target.value))} max={type === 'online' ? parseFloat(process.env.NEXT_PUBLIC_MEETING_DURATION as string) : undefined} value={duration} type="number" className='border disabled:cursor-not-allowed rounded-md w-full border-[#1E1E1ED9] p-2 bg-transparent ' />
                        </div>

                      </div>
                      {type === 'online' ? <>
                        <div className='flex justify-between my-1'>
                          <div className='w-[48%]'>
                            <label className='text-sm font-medium my-1'>Start date</label>
                            <input onChange={e => setStartDate(e.target.value)} value={startDate} min={new Date().toISOString().split('T')[0]} type="date" className='border rounded-md w-full border-[#1E1E1ED9] p-2 bg-transparent' />
                          </div>
                          <div className='w-[48%]'>
                            <label className='text-sm font-medium my-1'>End date</label>
                            <input onChange={e => setEndDate(e.target.value)} value={endDate} min={new Date().toISOString().split('T')[0]} type="date" className='border rounded-md w-full border-[#1E1E1ED9] p-2 bg-transparent disabled:cursor-not-allowed disabled:border-[#bdbcbc] disabled:text-[#acabab]' />
                          </div>
                        </div>
                        <div className='flex justify-between my-1'>
                          <div className='w-[48%]'>
                            <label className='text-sm font-medium my-1 inline-flex items-center'>Start time</label>
                            <input onChange={e => setStartTime(e.target.value)} value={startTime} type="time" className='border rounded-md w-full border-[#1E1E1ED9] p-2 bg-transparent' />
                          </div>
                          <div className='w-[48%]'>
                            <label className='text-sm font-medium my-1 inline-flex items-center justify-center gap-1'>End time </label>
                            <input onChange={e => setEndTime(e.target.value)} value={endTime} disabled readOnly min={new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} type="time" className='border rounded-md w-full disabled:cursor-not-allowed border-[#1E1E1ED9] disabled:border-[#bdbcbc] disabled:text-[#acabab] p-2 bg-transparent' />
                          </div>
                        </div>
                      </> : null}
                      {type === 'offline' && <>
                        <div className='flex justify-between my-1'>
                          <div className='w-[48%]'>
                            <label className='text-sm font-medium my-1'>Start date</label>
                            <input onChange={e => setStartDate(e.target.value)} value={startDate} type="date" min={new Date().toISOString().split('T')[0]} className='border rounded-md w-full border-[#1E1E1ED9] p-2 bg-transparent' />
                          </div>
                          <div className='w-[48%]'>
                            <label className='text-sm font-medium my-1'>End date</label>
                            <input onChange={e => setEndDate(e.target.value)} value={endDate} type="date" min={new Date().toISOString().split('T')[0]} className='border rounded-md w-full border-[#1E1E1ED9] p-2 bg-transparent' />
                          </div>
                        </div>
                        <div className='flex justify-between my-1'>
                          <div className='w-[48%]'>
                            <label className='text-sm font-medium my-1'>Start time</label>
                            <input onChange={e => setStartTime(e.target.value)} value={startTime} type="time" className='border rounded-md w-full border-[#1E1E1ED9] p-2 bg-transparent' />
                          </div>
                          <div className='w-[48%]'>
                            <label className='text-sm font-medium my-1'>End time</label>
                            <input onChange={e => setEndTime(e.target.value)} value={endTime} type="time" className='border rounded-md w-full border-[#1E1E1ED9] p-2 bg-transparent' />
                          </div>
                        </div>
                        <div className='flex justify-between my-1'>
                          <div className='w-[48%]'>
                            <label className='text-sm font-medium my-1'>Course Location</label>
                            <input placeholder='Place where this course will be held' onChange={e => setLocation(e.target.value)} value={location} type="text" className='border rounded-md w-full border-[#1E1E1ED9] p-2 bg-transparent' />
                          </div>
                          <div className='w-[48%]'>
                            <label className='text-sm font-medium my-1'>Course Room</label>
                            <input placeholder='Room No.' onChange={e => setRoom(e.target.value)} value={room} type="text" className='border rounded-md w-full border-[#1E1E1ED9] p-2 bg-transparent' />
                          </div>
                        </div>
                      </>}

                      {type === 'offline' || type === 'online' ? <>
                        <p className='font-medium'>Set your weekly hours</p>
                        {days.map((day: { checked: boolean | undefined; day: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; startTime: string | number | readonly string[] | undefined; endTime: string | number | readonly string[] | undefined; }, index: any) => <div key={index} className='flex justify-between my-1'>
                          <input className='cursor-pointer' onChange={e => handleDaysInputChange(index, 'checked', e.target.checked)} checked={day.checked} type="checkbox" />
                          <p className='w-24 my-auto'>{day.day}</p>
                          <input readOnly={type === `online`} disabled={type === `online`} value={day.startTime} onChange={e => handleDaysInputChange(index, 'startTime', e.target.value)} className={day.checked === true && day.startTime === "" ? 'py-1 px-2 border border-[#FF0000] rounded-sm disabled:cursor-not-allowed' : 'py-1 px-2 rounded-sm disabled:cursor-not-allowed'} type="time" />
                          <p className='my-auto'>-</p>
                          <input readOnly={type === `online`} disabled={type === `online`} value={day.endTime} onChange={e => handleDaysInputChange(index, 'endTime', e.target.value)} className={day.checked === true && day.endTime === "" ? 'py-1 px-2 border border-[#FF0000] rounded-sm disabled:cursor-not-allowed' : 'py-1 px-2 rounded-sm disabled:cursor-not-allowed'} type="time" />
                        </div>)}
                      </> : null}

                      {
                        type === 'video' && <>
                          {
                            videos.map((video, index) => <div key={index}>
                              <div className='my-1'>
                                <label className='text-sm font-medium my-1'>Sub Title</label>
                                <input onChange={e => handleInputChange(index, 'title', e.target.value)} value={video.title} type="text" className='border rounded-md w-full border-[#1E1E1ED9] p-2 bg-transparent' />
                              </div>
                              <input
                                onChange={(e) => handleVideo(e, index)}
                                type="file"
                                name="identification"
                                accept="video/*"
                                id={`video${index}`}
                                hidden
                                multiple={false}
                              />
                              <label className='flex cursor-pointer h-full   ' htmlFor={`video${index}`} >

                                {
                                  video.videoUrl === "" ? <div className='w-full gap-1 flex items-center'>
                                    <span className='text-primary text-[18px]'><Video /></span>
                                    <span className='text-sm'>Add Video to Sub-title</span>
                                  </div> : <div className='relative w-[250px] group  h-full'>

                                    <video key={video.videoUrl} className={`rounded-lg w-full video${index}`} width="250" >
                                      <source src={video.videoUrl} type="video/mp4" />
                                    </video>
                                    <div className='absolute inset-0 bg-[rgb(0,0,0,0.3)] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform scale-90 group-hover:scale-100 flex justify-center gap-2 items-center'>
                                      <button className='text-primary text-[40px] transform scale-75 group-hover:scale-100 transition-transform duration-300' onClick={(e) => { e.stopPropagation(); e.preventDefault(); handlePlayClick(index) }}>
                                        {playingIndex === index ? <Pause /> : <Play />}
                                      </button>

                                    </div>
                                    <div className='absolute bg-[rgb(0,0,0,0.3)] bottom-0 w-full transform scale-0 group-hover:scale-100 transition-transform duration-300'>
                                      <div className='px-3 py-1.5 flex items-center gap-3'>
                                        <label title='Change Video' htmlFor={`video${index}`} className='cursor-pointer text-white hover:text-gray text-[13px]'><Replace /></label>
                                        <button className='text-white hover:text-red-400 text-[13px]' title='remove video' onClick={(e) => { e.stopPropagation(); e.preventDefault(); removeVideo(index) }}><Bin /></button>
                                      </div>
                                    </div>

                                  </div>
                                }


                                {/* <p className='text-sm'>{video.videoUrl === "" ?  : video.videoUrl.slice(0, 20)}</p> */}
                              </label>
                            </div>)
                          }
                          <button className='px-3 bg-gray rounded-md py-1 mt-4 font-medium' onClick={() => setVideos([...videos, layout])}>Add Videos </button>
                        </>
                      }

                    </div>
                  case 2:
                    return <div>
                      <div className='my-1'>
                        <label className='text-sm font-medium my-1'>Course Fee</label>
                        <input onChange={e => setFee(parseInt(e.target.value))} value={fee} type="number" className='border rounded-md w-full border-[#1E1E1ED9] p-2 bg-transparent' />
                        <p className='text-xs'>Set course fee to 0 for a free course</p>
                      </div>
                      <div className='my-1'>
                        <label className='text-sm font-medium my-1'>Who gets this course for free (Scholarship)</label>
                        <Select
                          isMulti
                          options={formattedOptions}
                          className="basic-multi-select"
                          classNamePrefix="select"
                          onChange={(e: any) => { setScholarship(e) }}
                        />
                      </div>
                      <div className='my-5'>
                        <label className='text-sm font-medium my-1'>Show striked out original cost fee</label>
                        <input type='number' onChange={e => setStriked(parseInt(e.target.value))} value={striked} className='border rounded-md border-[#1E1E1ED9] w-full h-20 p-2 bg-transparent' />
                      </div>
                    </div>
                  case 3:
                    return <div>
                      {modules.map((single: any, index: number) => <div key={index}>
                        <div>
                          <label className='text-sm font-medium my-1'>Module {index + 1} Title</label> <br />
                          <div className='flex'>
                            <input onChange={e => handleModulesInputChange(index, 'title', e.target.value)} value={single.title} className=' border rounded-md w-full border-[#1E1E1ED9] p-2 bg-transparent' type="text" />
                            <div onClick={() => removeModules(index)} className='my-auto ml-5 cursor-pointer'>
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                              </svg>
                            </div>
                          </div>
                        </div>
                        <div>
                          <label className='text-sm font-medium my-1'>Module {index + 1} Description</label> <br />
                          <textarea onChange={e => handleModulesInputChange(index, 'description', e.target.value)} value={single.description} className='h-18 border rounded-md w-full border-[#1E1E1ED9] p-2 bg-transparent'></textarea>
                        </div>
                      </div>)}
                      <button onClick={() => setModules([...modules, module])} className='bg-primary py-2 px-5 rounded-md'>Add</button>
                    </div>
                  default:
                    return null
                }
              })()}
              <div>
                <p className='text-sm my-4'>By uploading you agree that this course is a product of you
                  and not being forged<input className='ml-2' type="checkbox" /></p>

                {
                  (type === `video` && uploading) && <div className='flex  flex-col mb-5 '>
                    <h3>Video Upload</h3>
                    <div className='mt-3'>
                      <div className='w-full bg-gray p-0.5 rounded-md'>
                        <div style={{ width: `${uploadProgress}%` }} className='bg-primary h-2 rounded-md'></div>
                      </div>
                      <p className='text-[14px] text-slate-500'>Uploaded {uploadedCount} of {videos.length} videos.</p>
                    </div>
                  </div>
                }
                <div className='flex'>
                  {course === null ? active === 3 ? <button disabled={uploading} onClick={() => add()} className='p-2 bg-primary font-medium w-40 rounded-md text-sm'>{loading ? <Spin /> : "Add Course"}</button> : <button onClick={() => setActive(active + 1)} className='p-2 bg-primary font-medium w-40 rounded-md text-sm'>Next</button> : active === 3 ? <button onClick={() => edit()} className='p-2 bg-primary font-medium w-40 rounded-md text-sm'>{loading ? <Spin /> : "Edit Course"}</button> : <button onClick={() => setActive(active + 1)} className='p-2 bg-primary font-medium w-40 rounded-md text-sm'>Next</button>}
                  <button onClick={() => handleClick()} className='mx-4'>Cancel</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> : resources ? <AddResources handleClick={() => setResource(false)} open={resources} /> : null
  );
};

export default AddCourse;