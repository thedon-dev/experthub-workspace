import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useAppSelector } from '@/store/hooks';
import { CategoryType, CourseType } from '@/types/CourseType';
import { notification } from 'antd';
import Select from 'react-select';
import { UserType } from '@/types/UserType';
import { Spin } from 'antd';
import AddResources from './AddResources';


const AddCourse = ({ open, handleClick, course }: { open: boolean, handleClick: any, course: CourseType | null }) => {
  const user = useAppSelector((state) => state.value);
  const uploadRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLInputElement>(null)
  const pdfUploadRef = useRef<HTMLInputElement>(null)
  const [api, contextHolder] = notification.useNotification();

  const [active, setActive] = useState(0)
  const [about, setAbout] = useState(course?.about || "")
  const [startDate, setStartDate] = useState(course?.startDate || "")
  const [endDate, setEndDate] = useState(course?.endDate.toString() || "")
  const [startTime, setStartTime] = useState(course?.startTime || "")
  const [endTime, setEndTime] = useState(course?.endTime || "")
  const [striked, setStriked] = useState<number>(course?.strikedFee || 0)
  const [fee, setFee] = useState<number>(course?.fee || 0)
  const [duration, setDuration] = useState<number>(course?.duration || 0)
  const [category, setCategory] = useState(course?.category || "")
  const [categoryIndex, setCategoryIndex] = useState("")
  const [resources, setResource] = useState(false)

  const [privacy, setPrivacy] = useState(course?.privacy || "")
  const [type, setType] = useState(course?.type || "offline")
  const [title, setTitle] = useState(course?.title || "")
  const [image, setImage] = useState<any>(course?.thumbnail || null)
  const [location, setLocation] = useState(course?.loaction || "")
  const [target, setTarget] = useState(course?.target || 0)

  const [room, setRoom] = useState(course?.room || "")
  const [loading, setLoading] = useState(false)
  const [file, setFile] = useState<FileList | null>()
  const [students, setStudents] = useState([])
  const [scholarship, setScholarship] = useState([])

  const getStudents = () => {
    axios.get('user/students')
      .then(function (response) {
        setStudents(response.data.students)
        // console.log(response.data)
      })
  }

  const [pdf, setPdf] = useState("")
  let layout = {
    title: "",
    videoUrl: ""
  }
  let module = {
    title: "",
    description: ""
  }
  const [videos, setVideos] = useState(course?.videos || [layout])
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

  const getCategories = () => {
    axios.get('category/all').then(function (response) {
      // console.log(response.data)
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
    updatedObjects[index] = { ...updatedObjects[index], [field]: value };
    setDays(updatedObjects);
  };

  const handleInputChange = (index: number, field: string, value: string | number) => {
    const updatedObjects = [...videos];
    updatedObjects[index] = { ...updatedObjects[index], [field]: value };
    setVideos(updatedObjects);
  };


  const handleVideo = (e: React.ChangeEvent<HTMLInputElement>, index: any) => {

    const files = e.target.files

    const reader = new FileReader()
    if (files && files.length > 0) {

      reader.readAsDataURL(files[0])
      reader.onloadend = () => {
        if (reader.result) {
          handleInputChange(index, 'videoUrl', reader.result as string)
        }
      }
    }
  }


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

      axios.put(`courses/edit/${course?._id}`,
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


  const add = () => {
    if (title && about && duration && category && image && benefits.length > 1 && type === "offline" ? startDate && endDate && startTime && endTime && room && location : type === "online" ? startDate && endDate && startTime && endTime : type === "video" ? videos : pdf) {
      setLoading(true)
      axios.post(`courses/add-course/${user.id}`,
        {
          asset: image,
          title,
          target,
          about,
          duration: duration.toString(),
          type,
          startDate,
          endDate,
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
          days: days,
          benefits,
          scholarship: getScholarship()
        }
      )
        .then(function (response) {
          api.open({
            message: "Course succesfully created!",
          });
          console.log(response.data)
          setLoading(false)
          setResource(true)
          handleClick()
        }).catch(error => {
          console.log(error)
          api.open({
            message: error.response.data.message
          });
        })
    } else {
      api.open({
        message: "Please fill all fields!"
      });
    }
  }

  useEffect(() => {
    getStudents()
    getCategories()
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
                          <label className='text-sm font-medium my-1'>Course type</label>
                          <select onChange={e => setType(e.target.value)} value={type} className='border rounded-md w-full border-[#1E1E1ED9] p-2 bg-transparent'>
                            <option value="offline">Offline</option>
                            <option value="online">Live</option>
                            <option value="video">Video</option>
                            <option value="pdf">PDF</option>
                          </select>
                        </div>

                        <div className='w-[48%]'>
                          <label className='text-sm font-medium my-1'>Duration</label>
                          <input onChange={e => setDuration(parseInt(e.target.value))} value={duration} type="number" className='border rounded-md w-full border-[#1E1E1ED9] p-2 bg-transparent' />
                        </div>

                      </div>
                      {type === 'online' ? <>
                        <div className='flex justify-between my-1'>
                          <div className='w-[48%]'>
                            <label className='text-sm font-medium my-1'>Start date</label>
                            <input onChange={e => setStartDate(e.target.value)} value={startDate} type="date" className='border rounded-md w-full border-[#1E1E1ED9] p-2 bg-transparent' />
                          </div>
                          <div className='w-[48%]'>
                            <label className='text-sm font-medium my-1'>End date</label>
                            <input onChange={e => setEndDate(e.target.value)} value={endDate} type="date" className='border rounded-md w-full border-[#1E1E1ED9] p-2 bg-transparent' />
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
                      </> : null}
                      {type === 'offline' && <>
                        <div className='flex justify-between my-1'>
                          <div className='w-[48%]'>
                            <label className='text-sm font-medium my-1'>Start date</label>
                            <input onChange={e => setStartDate(e.target.value)} value={startDate} type="date" className='border rounded-md w-full border-[#1E1E1ED9] p-2 bg-transparent' />
                          </div>
                          <div className='w-[48%]'>
                            <label className='text-sm font-medium my-1'>End date</label>
                            <input onChange={e => setEndDate(e.target.value)} value={endDate} type="date" className='border rounded-md w-full border-[#1E1E1ED9] p-2 bg-transparent' />
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
                          <input onChange={e => handleDaysInputChange(index, 'checked', e.target.checked)} checked={day.checked} type="checkbox" />
                          <p className='w-24 my-auto'>{day.day}</p>
                          <input value={day.startTime} onChange={e => handleDaysInputChange(index, 'startTime', e.target.value)} className={day.checked === true && day.startTime === "" ? 'py-1 px-2 border border-[#FF0000] rounded-sm' : 'py-1 px-2 rounded-sm'} type="time" />
                          <p className='my-auto'>-</p>
                          <input value={day.endTime} onChange={e => handleDaysInputChange(index, 'endTime', e.target.value)} className={day.checked === true && day.endTime === "" ? 'py-1 px-2 border border-[#FF0000] rounded-sm' : 'py-1 px-2 rounded-sm'} type="time" />
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
                                accept="/*"
                                ref={videoRef}
                                hidden
                                multiple={false}
                              />
                              <div className='flex cursor-pointer' onClick={() => videoRef.current?.click()}>
                                <img className='w-5 h-5 my-auto mr-2' src="/images/icons/charm_camera-video.svg" alt="" />
                                <p className='text-sm'>{video.videoUrl === "" ? "Add Video to Sub-title" : video.videoUrl.slice(0, 20)}</p>
                              </div>
                            </div>)
                          }
                          <button className='px-3 font-medium' onClick={() => setVideos([...videos, layout])}>Add </button>
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
                      <button onClick={() => setModules([...modules, module])} className='bg-primary p-2 rounded-md'>Add</button>
                    </div>
                  default:
                    return null
                }
              })()}
              <div>
                <p className='text-sm my-4'>By uploading you agree that this course is a product of you
                  and not being forged<input className='ml-2' type="checkbox" /></p>
                <div className='flex'>
                  {course === null ? active === 3 ? <button onClick={() => add()} className='p-2 bg-primary font-medium w-40 rounded-md text-sm'>{loading ? <Spin /> : "Add Course"}</button> : <button onClick={() => setActive(active + 1)} className='p-2 bg-primary font-medium w-40 rounded-md text-sm'>Next</button> : active === 3 ? <button onClick={() => edit()} className='p-2 bg-primary font-medium w-40 rounded-md text-sm'>{loading ? <Spin /> : "Edit Course"}</button> : <button onClick={() => setActive(active + 1)} className='p-2 bg-primary font-medium w-40 rounded-md text-sm'>Next</button>}
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