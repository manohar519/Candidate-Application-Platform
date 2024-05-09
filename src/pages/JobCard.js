import React, { useEffect, useState } from "react";
import { JobPostingCard } from "../components/Card";
import ReactSelect from "react-select";
import {
  convertToSelecjobRole,
  convertToSelect,
  convertToSelectLocation,
  uniqueArray,
} from "../components/utils";

export const JobCard = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [options, setOptions] = useState();
  const [filerData, setFilterData] = useState([]);
  const [location, setLocation] = useState([]);
  const [locationfilterData, setLocationFilterData] = useState([]);
  const [expFilterData, setExpFilterData] = useState([]);
  const [search, setSearch] = useState("");
  const body = JSON.stringify({
    limit: 10,
    offset: page,
  });
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body,
  };
  const getData = () => {
    fetch(
      "https://api.weekday.technology/adhoc/getSampleJdJSON",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setData((prevData) => [...prevData, ...result.jdList]);

        // setOptions(opt);
      })
      .catch((error) => console.error(error));
  };
  const keys = [
    "companyName",
    "jobRole",
    "location",
    "maxExp",
    "maxJdSalary",
    "minExp",
  ];
  useEffect(() => {
    getData();
  }, [page]);
  useEffect(() => {
    const opt = convertToSelecjobRole(data);
    const uniqueJobRoles = uniqueArray(opt);
    setOptions(uniqueJobRoles);
    const loc = convertToSelectLocation(data);
    const uniqueLocations = uniqueArray(loc);
    setLocation(uniqueLocations);
  }, [data]);
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.offsetHeight
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };
  const salary = [
    { id: 1, label: "0LPA" },
    { id: 2, label: "5LPA" },
    { id: 3, label: "10LPA" },
    { id: 4, label: "20LPA" },
    { id: 5, label: "30LPA" },
    { id: 6, label: "40LPA" },
    { id: 7, label: "50LPA" },
    { id: 8, label: "60LPA" },
    { id: 9, label: "70LPA" },
  ];
  const exp = [
    { id: 1, label: "1" },
    { id: 2, label: "2" },
    { id: 3, label: "3" },
    { id: 4, label: "4" },
    { id: 5, label: "5" },
    { id: 6, label: "6" },
    { id: 7, label: "7" },
    { id: 8, label: "8" },
    { id: 9, label: "9" },
  ];
  let filteredList = [];
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const jobRoleFilter = (option) => {
    console.log(option);
    const lastElement = option[option.length - 1];
    // setSearch((search) => [...search, lastElement]);
    filteredList = data.filter((item1) =>
      option.some((item2) => item1.jobRole === item2.value)
    );
    console.log(filteredList);
    setFilterData(filteredList);
  };
  const locationFilter = (location) => {
    console.log(location);
    const lastElement = location[location.length - 1];
    // setSearch((search) => [...search, lastElement]);
    const locationFilterList = filerData.filter((item1) =>
      location?.some((item2) => item1.location === item2.value)
    );
    console.log(locationFilterList);
    setFilterData(locationFilterList);
  };
  const expFilter = (exp) => {
    console.log(exp);
    const expFilterList = data.filter((item1) => item1.minExp >= exp.id);
    console.log(expFilterList);

    setExpFilterData(expFilterList);
  };

  const filters = {
    location: locationfilterData,
    jobRole: filerData,
    experience: expFilterData,
  };
  // console.log(filters);
  // const filteredData = data.filter(
  //   (item) =>
  //     (!filters.location ||
  //       filters.location.some((loc) => item.location.includes(loc.location))) &&
  //     (!filters.jobRole ||
  //       filters.jobRole.some((loc) => item.jobRole.includes(loc.jobRole))) &&
  //     (!filters.experience || item.experience >= filters.experience)
  // );
  // console.log(filteredData);
  // concatenatedArray = filters?.jobRole?.concat(filters?.location,filters?.experience);
  console.log("search", search);
  const arrayToMap = filerData.length === 0 ? data : filerData;
  // if (arrayToMap.length === 0) {
  //   return <h1>No Match found..</h1>;
  // }
  return (
    <div>
      <div style={{ display: "flex", gap: "10px" }}>
        <ReactSelect
          isMulti
          placeholder="Job Role"
          name="Job Role"
          options={options}
          onChange={jobRoleFilter}
        />
        <ReactSelect
          placeholder="Experience"
          options={exp}
          onChange={expFilter}
        />
        <ReactSelect
          isMulti
          placeholder="Location"
          options={location}
          onChange={locationFilter}
        />
        <ReactSelect
          placeholder="Minimum Base pay salary"
          options={salary}
          onChange={locationFilter}
        />
        <input
          style={{ borderRadius: "5px", borderColor: "gray" }}
          placeholder="Search Company Name"
          type="search"
          onChange={(e) => {
            console.log(e);
            setSearch(e.target.value);
          }}
        />
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "50px",
          margin: "20px",
        }}
      >
        {arrayToMap.length === 0 ? (
          <h1>No matches found</h1>
        ) : (
          <>
            {" "}
            {data
              .filter((i) =>
                keys.some((key) =>
                  i[key]?.toUpperCase().includes(search?.toUpperCase())
                )
              )
              .map((item, index) => (
                <div key={index}>
                  <JobPostingCard
                    companyName={item.companyName}
                    jobDescription={item?.jobDetailsFromCompany}
                    jobLocation={item?.location}
                    url={item?.logoUrl}
                    jobRole={item?.jobRole}
                    location={item?.location}
                    minJdSalary={item?.minJdSalary}
                    maxJdSalary={item?.maxJdSalary}
                    minExp={item?.minExp}
                  />
                </div>
              ))}
          </>
        )}
      </div>
    </div>
  );
};
