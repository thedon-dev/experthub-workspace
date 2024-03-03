import React, { useRef, useState } from 'react';
import axios from 'axios';
import { useAppSelector } from '@/store/hooks';
import { CourseType } from '@/types/CourseType';


const AddCourse = ({ open, handleClick, course }: { open: boolean, handleClick: any, course: CourseType | null }) => {
  const user = useAppSelector((state) => state.value);
  const uploadRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLInputElement>(null)
  const pdfUploadRef = useRef<HTMLInputElement>(null)

  const [active, setActive] = useState(0)
  const [author, setAuthor] = useState("")
  const [about, setAbout] = useState(course?.about || "")
  const [startDate, setStartDate] = useState(course?.startDate || "")
  const [endDate, setEndDate] = useState(course?.endDate.toString() || "")
  const [startTime, setStartTime] = useState(course?.startTime || "")
  const [endTime, setEndTime] = useState(course?.endTime || "")
  const [striked, setStriked] = useState<number>(course?.strikedFee || 0)
  const [fee, setFee] = useState<number>(course?.fee || 0)
  const [duration, setDuration] = useState<number>(course?.duration || 0)
  const [category, setCategory] = useState(course?.category || "")
  const [privacy, setPrivacy] = useState(course?.privacy || "")
  const [type, setType] = useState(course?.type || "online")
  const [title, setTitle] = useState(course?.title || "")
  const [image, setImage] = useState(course?.thumbnail || "")
  const [location, setLocation] = useState(course?.loaction || "")
  const [room, setRoom] = useState(course?.room || "")
  const [loading, setLoading] = useState(false)
  const [file, setFile] = useState<FileList | null>()
  const [pdf, setPdf] = useState("")
  let layout = {
    title: "",
    videoUrl: ""
  }
  const [videos, setVideos] = useState([layout])

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
    setFile(e.target.files)

    const reader = new FileReader()
    if (files && files.length > 0) {

      reader.readAsDataURL(files[0])
      reader.onloadend = () => {
        if (reader.result) {
          // const type = files[0].name.substr(files[0].name.length - 3)
          setImage(reader.result as string)
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

  const edit = () => {
    try {
      setLoading(true)


      axios.put(`courses/edit/${course?._id}`,
        {
          // image,
          title,
          about,
          duration: duration.toString(),
          type,
          startDate,
          endDate,
          startTime,
          endTime,
          category,
          privacy,
          fee: fee.toString(),
          strikedFee: striked.toString(),
          scholarship: "students",
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
    try {
      setLoading(true)
      axios.post(`courses/add-course/${user.id}`,
        {
          image,
          title,
          about,
          duration: duration.toString(),
          type,
          startDate,
          endDate,
          startTime,
          endTime,
          category,
          privacy,
          fee: fee.toString(),
          strikedFee: striked.toString(),
          scholarship: "students",
          room,
          location,
          videos,
          pdf
        }
      )
        .then(function (response) {
          console.log(response.data)
          setLoading(false)
          handleClick()
        })
    } catch (e) {
      setLoading(false)
      console.log(e)
    }
  }

  return (
    open && <div>
      <div onClick={() => handleClick()} className='fixed cursor-pointer bg-[#000000] opacity-50 top-0 left-0 right-0 w-full h-[100vh] z-10'></div>
      <div className='fixed top-10 bottom-10 left-0 overflow-y-auto rounded-md right-0 lg:w-[70%] w-[95%] mx-auto z-20 bg-[#F8F7F4]'>
        <div className='shadow-[0px_1px_2.799999952316284px_0px_#1E1E1E38] p-4 lg:px-12 flex justify-between'>
          <p className='font-medium'>Add Thumbnail</p>
          <img onClick={() => handleClick()} className='w-6 h-6 cursor-pointer' src="/images/icons/material-symbols_cancel-outline.svg" alt="" />
        </div>
        <div className='lg:flex justify-between lg:mx-12 mx-4 my-4'>
          <div className='lg:w-[48%]'>
            <div>
              <p className='text-sm font-medium my-1'>Course Image</p>
              {image ? <img onClick={() => uploadRef.current?.click()} src={image} className='w-full h-40' alt="" /> :
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
              accept="image/*"
              ref={uploadRef}
              hidden
              multiple={false}
            />

            {
              type === 'pdf' && <div>
                <p className='text-sm font-medium my-1'>Course Content</p>
                <button className='border border-[#1E1E1ED9] h-32 p-2 my-1 rounded-md font-medium w-full' onClick={() => pdfUploadRef.current?.click()}>
                  <img src="/images/icons/upload.svg" className='w-8 mx-auto' alt="" />
                  <p> Click to upload</p></button>
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
            </div>
            <div>
              {(() => {
                switch (active) {
                  case 0:
                    return <div>
                      <div className='flex justify-between my-1'>
                        <div className='w-[48%]'>
                          <label className='text-sm font-medium my-1'>Course Category</label>
                          <select onChange={e => setCategory(e.target.value)} value={category} className='border rounded-md w-full border-[#1E1E1ED9] p-2 bg-transparent'>
                            <option value="Virtual Assistant">Virtual Assistant</option>
                            <option value="Product Management">Product Management</option>
                            <option value="Cybersecurity">Cybersecurity </option>
                            <option value="Software Development">Software Development</option>
                            <option value="AI / Machine Learning">AI / Machine Learning</option>
                            <option value="Data Analysis & Visualisation">Data Analysis & Visualisation</option>
                            <option value="Story Telling">Story Telling</option>
                            <option value="Animation">Animation</option>
                            <option value="Cloud Computing">Cloud Computing</option>
                            <option value="Dev Ops">Dev Ops</option>
                            <option value="UI/UX Design">UI/UX Design</option>
                            <option value="Journalism">Journalism</option>
                            <option value="Game development">Game development</option>
                            <option value="Data Science">Data Science</option>
                            <option value="Digital Marketing">Digital Marketing</option>
                            <option value="Advocacy">Advocacy</option>
                          </select>
                        </div>
                        <div className='w-[48%]'>
                          <label className='text-sm font-medium my-1'>Privacy</label>
                          <input onChange={e => setPrivacy(e.target.value)} value={privacy} type="text" className='border rounded-md w-full border-[#1E1E1ED9] p-2 bg-transparent' />
                        </div>
                      </div>
                      <div className='my-1'>
                        <label className='text-sm font-medium my-1'>Course title</label>
                        <input onChange={e => setTitle(e.target.value)} value={title} type="text" className='border rounded-md w-full border-[#1E1E1ED9] p-2 bg-transparent' />
                      </div>
                      <div className='my-1'>
                        <label className='text-sm font-medium my-1'>About course</label>
                        <textarea onChange={e => setAbout(e.target.value)} value={about} className='border rounded-md border-[#1E1E1ED9] w-full h-32 p-2 bg-transparent'></textarea>
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
                          <label className='text-sm font-medium my-1'>Duration</label>
                          <input onChange={e => setDuration(parseInt(e.target.value))} value={duration} type="number" className='border rounded-md w-full border-[#1E1E1ED9] p-2 bg-transparent' />
                        </div>
                        <div className='w-[48%]'>
                          <label className='text-sm font-medium my-1'>Course type</label>
                          <select onChange={e => setType(e.target.value)} value={type} className='border rounded-md w-full border-[#1E1E1ED9] p-2 bg-transparent'>
                            <option value="online">Online</option>
                            <option value="offline">Offline</option>
                            <option value="video">Video</option>
                            <option value="pdf">PDF</option>
                          </select>
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
                      <div className='my-5'>
                        <label className='text-sm font-medium my-1'>Show striked out original cost fee</label>
                        <input type='number' onChange={e => setStriked(parseInt(e.target.value))} value={striked} className='border rounded-md border-[#1E1E1ED9] w-full h-20 p-2 bg-transparent' />
                      </div>
                    </div>
                  default:
                    return null
                }
              })()}
              <div>
                <p className='text-sm my-4'>By uploading you agree that this course is a product of you
                  and not being forged<input className='ml-2' type="checkbox" /></p>
                <div className='flex'>
                  {course === null ? active === 2 ? <button onClick={() => add()} className='p-2 bg-primary font-medium w-40 rounded-md text-sm'>{loading ? "Loading..." : "Add Course"}</button> : <button onClick={() => setActive(active + 1)} className='p-2 bg-primary font-medium w-40 rounded-md text-sm'>Next</button> : active === 2 ? <button onClick={() => edit()} className='p-2 bg-primary font-medium w-40 rounded-md text-sm'>{loading ? "Loading..." : "Edit Course"}</button> : <button onClick={() => setActive(active + 1)} className='p-2 bg-primary font-medium w-40 rounded-md text-sm'>Next</button>}
                  <button onClick={() => handleClick()} className='mx-4'>Cancel</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;