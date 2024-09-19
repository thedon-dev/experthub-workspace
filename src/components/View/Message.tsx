'use client'

import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

interface User {
  _id: string;
  fullname: string;
  profilePicture?: string;
  email: string;
}

interface Message {
  file: string | undefined;
  to: string;
  from: string;
  type: string;
  created_at: number;
  text: string;
}

interface Chat {
  error: any;
  _id: string;
  participants: User[];
  messages: Message[];
}

interface SocketResponse {
  conversation_id: string;
  message: Message;
}

const socket = io('https://seashell-app-nejbh.ondigitalocean.app/');
import { useAppSelector } from '@/store/hooks';
import { useRouter, useSearchParams } from 'next/navigation';
import { formatDate } from '../modals/Notification';

const Message: React.FC = () => {
  const [message, setMessage] = useState<string>('');
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [conversations, setConversations] = useState<Chat[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Chat | null>(null);
  const user = useAppSelector((state) => state.value);
  const [userId, setUserId] = useState<string>(user.id); // Replace with your user ID logic
  const toUserId = useSearchParams().get("id")
  const router = useRouter()
  const uploadRef = useRef<HTMLInputElement>(null)
  const [filesPreview, setFilePreview] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Receive chat history from server
    socket.emit('get_direct_conversations', { user_id: userId }, (existing_conversations: Chat[]) => {
      console.log(existing_conversations)
      setConversations(existing_conversations.reverse());
    });

    // Receive new message from server
    socket.on('new_message', (data: SocketResponse) => {
      if (data.conversation_id === selectedConversation?._id) {
        setChatHistory((prevHistory) => [...prevHistory, data.message]);
      }
    });

    // Cleanup on unmount
    return () => {
      socket.off('new_message');
    };
  }, [selectedConversation, userId]);

  useEffect(() => {
    if (toUserId) {
      startConversation(toUserId as string);
      router.push(user.role === "student" ? "/applicant/message" : user.role === "admin" ? '/admin/message' : "/tutor/message")
    }
  }, [toUserId]);

  const startConversation = (to: string) => {
    const from = userId;

    // Check if there is any existing conversation
    const existing_conversation = conversations.find(
      (conv) => conv.participants.length === 2 && conv.participants.some((p) => p._id === to)
    );

    if (!existing_conversation) {
      socket.emit('start_conversation', { to, from }, (new_chat: Chat) => {
        if (new_chat.error) {
          console.error(new_chat.error);
        } else {
          setSelectedConversation(new_chat);
          setChatHistory([]);
        }
      });
    } else {
      setSelectedConversation(existing_conversation);
      socket.emit('get_messages', { conversation_id: existing_conversation._id }, (messages: Message[]) => {
        setChatHistory(messages);
      });
    }
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    const reader = new FileReader()
    if (files && files.length > 0) {
      reader.readAsDataURL(files[0])
      reader.onloadend = () => {
        if (reader.result) {
          const type = files[0].name.substr(files[0].name.length - 3)
          sendFile(
            reader.result as string,
            checkFileType(type)
          )
          // setFilePreview({
          //   url: reader.result as string,
          //   type: type === "mp4" ? "Video" : "Image"
          // })
        }
      }
    }
  }

  const sendFile = (url: string, type: string) => {
    setLoading(true)
    if (selectedConversation) {
      const newMessage = {
        from: userId,
        to: selectedConversation.participants.find((p) => p._id !== userId)?._id || '',
        type: type,
        created_at: Date.now(),
        file: url,
        conversation_id: selectedConversation?._id
      };
      socket.emit('send_dm', newMessage);
      setChatHistory((prevHistory) => [...prevHistory, newMessage]);
    }
    setSelectedConversation(selectedConversation)
    setLoading(false)
  }

  const handleSendMessage = () => {
    if (message.trim() && selectedConversation) {
      const newMessage = {
        from: userId,
        to: selectedConversation.participants.find((p) => p._id !== userId)?._id || '',
        type: 'Text',
        created_at: Date.now(),
        text: message,
        conversation_id: selectedConversation?._id
      };
      socket.emit('send_dm', newMessage);
      setChatHistory((prevHistory) => [...prevHistory, newMessage]);
      setMessage('');
    }
  };

  const handleConversationSelect = (conversation: Chat) => {
    setSelectedConversation(conversation);
    socket.emit('get_messages', { conversation_id: conversation._id }, (messages: Message[]) => {
      setChatHistory(messages);
    });
  };

  return (
    <div className='flex flex-col lg:flex-row'>
      <div className='lg:w-[35%] w-full px-3 border-r border-[#15121233] lg:h-[80vh] overflow-y-scroll'>
        <p>{user.role === 'student' ? 'Instructors' : user.role === 'tutor' ? 'Students' : 'Instructors and Students'}</p>
        <ul>
          {conversations.map((conv) => (
            <li
              key={conv._id}
              onClick={() => handleConversationSelect(conv)}
              className={`cursor-pointer p-2 ${selectedConversation?._id === conv._id ? 'bg-gray-300' : ''}`}
            >
              {conv.participants
                .filter((p) => p._id !== userId)
                .map((p) => (
                  <React.Fragment key={p._id}>
                    <div className='flex justify-between my-1'>
                      <div className='flex'>
                        <img src={p.profilePicture || '/images/user.png'} alt={p.fullname} className='w-10 h-10 rounded-full mr-2' />
                        <div className='ml-1'>
                          <p className='capitalize sm:text-sm'>{p.fullname}</p>

                          <p className='text-xs'>{conv.messages[conv.messages.length - 1]?.text === null ? 'Attachment' : conv.messages[conv.messages.length - 1]?.text.substring(0, 10)}</p>
                        </div>
                      </div>
                      {conv.messages.length >= 1 && <p className='text-xs my-auto'>{formatDate(new Date(conv.messages[conv.messages.length - 1]?.created_at))}</p>}
                    </div>
                  </React.Fragment>
                ))}
            </li>
          ))}
        </ul>
      </div>
      <div className={`lg:w-[65%] w-full p-4 lg:h-[80vh] overflow-y-scroll ${selectedConversation ? 'sm:fixed sm:top-[70px] sm:h-screen sm:left-0 sm:bg-white' : 'sm:hidden'}`}>
        <div>

          <div className='flex-1'>
            {selectedConversation ? (
              <>
                <div className='flex'>
                  <button onClick={() => setSelectedConversation(null)} className='bg-primary rounded-full h-8 w-8 my-auto mr-4 p-2 lg:hidden sm:block text-white'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
                    </svg>
                  </button>
                  {
                    selectedConversation.participants
                      .filter((p) => p._id !== userId)
                      .map((p) => (
                        <React.Fragment key={p._id}>
                          <div className='flex justify-between my-1'>
                            <div className='flex'>
                              <img src={p.profilePicture || '/images/user.png'} alt={p.fullname} className='lg:w-10 lg:h-10 w-8 h-8 rounded-full mr-2' />
                              <div className='ml-1 my-auto'>
                                <p className='capitalize my-auto sm:text-sm'>{p.fullname}</p>
                              </div>
                            </div>
                          </div>
                        </React.Fragment>
                      ))
                  }
                </div>

                <ul className='mb-32'>
                  {chatHistory.map((msg, index) => (
                    <div key={index}>
                      {msg.from === userId ?
                        <li className='w-1/2 my-1 sm:text-sm bg-primary p-1 text-white rounded-md ml-auto'>{msg.text !== null ? msg.text : msg.type === 'Image' ? <img src={msg.file} alt="" /> :
                          msg.type === 'Video' ?
                            <video controls src={msg.file}></video> : <div className='flex'>
                              <span className='text-3xl mr-3'>📁</span>
                              <a href={msg.file} download target='_blank' className='text-white my-auto'>Download</a>
                            </div>
                        }</li> :
                        <li className='w-1/2 my-1  sm:text-sm'>{msg.text !== null ? msg.text : msg.type === 'Image' ? <img src={msg.file} alt="" /> : msg.type === 'Video' ?
                          <video controls src={msg.file}></video> : <div className='flex'>
                            <span className='text-3xl mr-3'>📁</span>
                            <a href={msg.file} download target='_blank' className='text-white my-auto'>Download</a>
                          </div>} </li>}
                    </div>
                  ))}
                </ul>
              </>
            ) : <div className='w-1/2 mx-auto text-center'>
              <img src="/images/unread.jpg" className='w-full mx-auto' alt="" />
              <p className='lg:text-lg'>Start having a conversation with your {user.role === 'student' ? 'Instructors' : user.role === 'tutor' ? 'Students' : 'Instructors and Students'}
              </p>
            </div>}
          </div>

          {toUserId || selectedConversation ? (
            <div className='p-4 fixed bottom-0 lg:left-[48%] left-0 right-0'>
              <div className='sm:flex sm:flex-col'>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className='lg:h-20 h-10 p-2 w-full'
                  placeholder='Write a message'
                />
                <div className='flex'>
                  <input type="file" ref={uploadRef} className="hidden" onChange={(e) => handleImage(e)} />
                  <button onClick={handleSendMessage} className='mt-2 lg:mt-0 border lg:p-2 p-1 bg-primary text-white'>
                    {loading ? '...' : 'Send'}
                  </button>
                  <button onClick={() => uploadRef.current?.click()} className='p-2 rounded-full shadow-[0px_1px_2.799999952316284px_0px_#1E1E1E38] w-10 h-10 flex justify-center ml-6'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi my-auto bi-plus" viewBox="0 0 16 16">
                      <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Message;


function checkFileType(fileName: string) {
  // Define extensions for each type
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg', 'webp'];
  const videoExtensions = ['mp4', 'avi', 'mov', 'wmv', 'flv', 'mkv', 'webm'];
  const documentExtensions = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'txt', 'csv'];

  // Extract file extension from the file name
  const fileExtension: any = fileName.split('.').pop()?.toLowerCase();

  // Check file type based on the extension
  if (imageExtensions.includes(fileExtension)) {
    return 'Image';
  } else if (videoExtensions.includes(fileExtension)) {
    return 'Video';
  } else if (documentExtensions.includes(fileExtension)) {
    return 'Document';
  } else {
    return 'Unknown file type';
  }
}