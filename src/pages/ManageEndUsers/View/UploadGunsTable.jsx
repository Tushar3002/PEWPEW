import React, { useEffect, useState } from "react";
import { gunListByUser } from "../../../api/EndUsers/endUserViewApi";

function UploadGunsTable({userId}) {
  const [data, setData] = useState([]);
  const [page, setPage] = useState({
    skip: 0,
    take: 10,
  });

  useEffect(() => {
    fetchUploadGun();
  }, [page, userId]);

  const fetchUploadGun = async () => {
    console.log("UserID",userId);
    
    const body = {
      pageNumber: page.skip / page.take + 1,
      pageSize: page.take,
    //   search: "",
      userId,
    };
    try {
      const res = await gunListByUser(body);
      setData(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error?.response);
    }
  };

  return (
    <>
      
    </>
  );
}

export default UploadGunsTable;
