import React, { useState, useEffect } from "react";

let Users = () => {
  let [data, setData] = useState([]);
  let [page, setPage] = useState(1);


  

  useEffect(() => {
    const fetchData = async () => {
      let perPage=15;
      try {
        const response = await fetch(`https://api.github.com/search/users?q=followers:>0&sort=followers&order=desc&page=${page}&per_page=${perPage}`);
        const jsonData = await response.json();

        setData((prevData) => [...prevData, ...jsonData.items]);

      } 
      
      catch (error) {
        console.error("Error fetching data:", error);
      }
    };


    fetchData();
  }, [page]);


  useEffect(() => {

    window.addEventListener("scroll", () => {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;

      if (scrollTop + clientHeight + 1 >= scrollHeight) {
        setPage((prevPage) => prevPage + 1);
      } else {
      }
    });
  }, []);



  return (
    <>   

        <div className="main">  

      {data &&
        data.map((e, i) => (

          <div className="box" key={i}>
            <button className="btn">{i+1}</button>
            <br/>
            <span>Name is: {`${e.login}`}</span>
            <br />
            <span>ID is: {`${e.id}` }</span>
            <br />
           
            <br />
            <div>
            <span><img src={`${e.avatar_url}`} /></span>
            </div>
            <span>
              <br/>




            <button><a href={`${e.html_url}`} target="_blank">Profile</a></button>




            </span>

          </div>
        ))}
         </div>

    </>

  );
};

export default Users;
