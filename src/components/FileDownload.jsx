import React from 'react';

const FileDownload = ({ file }) => {
  function insertAtIndex(str, index) {
    // console.log(str.slice(0, index) + `f_auto/fl_attachment:${course.title}/` + str.slice(index))
    return str.slice(0, index) + `fl_attachment/` + str.slice(index);
  }

  return (
    file && <div>
      <a href={insertAtIndex(file, 65)} download target='_blank'> <button className='bg-primary p-1 mx-auto my-3 rounded-md px-8'>Download/Read</button></a>
    </div>
  );
};

export default FileDownload;