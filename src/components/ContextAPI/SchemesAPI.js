import React, { useState, createContext, useEffect } from "react";
import axios from "axios";

export const SchemeContext = createContext();
export const SchemeProvider = (props) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = () => {
    axios
      .get(`https://sleepy-wildwood-51098.herokuapp.com/schemes/all`)
      .then((res) => {
        // console.log(res.data);
        setData(res.data);
      });
  };

  return (
    <SchemeContext.Provider value={[data]}>
      {props.children}
    </SchemeContext.Provider>
  );
};
