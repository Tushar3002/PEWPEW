import React, { useState } from 'react'

function AccessoriesMaster() {
    const [data, setData] = useState([]);
      const [page, setPage] = useState({
        skip: 0,
        take: 10,
      });
      const [total, setTotal] = useState(0);
      const [search, setSearch] = useState("");
      const [searchInput, setSearchInput] = useState("");
      const [sort, setSort] = useState([]);


      
  return (
    <div>AccessoriesMaster</div>
  )
}

export default AccessoriesMaster