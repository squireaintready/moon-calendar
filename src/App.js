import "./App.css";
import "react-calendar/dist/Calendar.css";

import Button from "@mui/material/Button";
import Input from "@mui/material/Input";

import React, { useState } from "react";
import Calendar from "react-calendar";

export default function App() {
  const JSJoda = require("js-joda");
  const LocalDate = JSJoda.LocalDate;
  const [birthday, setBirthday] = useState();
  const [value, setValue] = useState(new Date());

  // converts date format to simple string
  const formatToEzString = (date) => {
    let year = date.getFullYear();
    let month =
      date.getMonth() + 1 >= 10
        ? date.getMonth() + 1
        : `0${date.getMonth() + 1}`;
    let day = date.getDate() >= 10 ? date.getDate() : `0${date.getDate()}`;
    let endDate = `${year}-${month}-${day}`;
    return endDate;
  };

  // calls function to calculate difference between days.
  const convertDateToDaysLived = (date) => {
    // return days lived
    let bdayFormatted = formatToEzString(birthday);
    let tempDate = new Date(date.date);
    let dateFormatted = formatToEzString(tempDate);
    return getNumberOfDays(bdayFormatted, dateFormatted);
  };

  // returns difference between two days
  function getNumberOfDays(start, end) {
    const start_date = new LocalDate.parse(start);
    const end_date = new LocalDate.parse(end);
    return JSJoda.ChronoUnit.DAYS.between(start_date, end_date);
  }

  // returns tileContent to be rendered
  const tileContent = (date) => {
    if (birthday && date.view === "month") {
      let temp = convertDateToDaysLived(date);
      let moonPhase = temp % 27;
      if (temp >= 0) {
        return (
          <>
            <img src={`./moons/moon${moonPhase}.gif`} alt="" />
            <span>{temp}</span>
          </>
        );
      }
    }
  };

  // apppends class to highlight every 100 days
  const tileClassName = (date) => {
    if (birthday && date.view === "month") {
      if (convertDateToDaysLived(date) % 100 === 0) {
        return "highlight100";
      } else {
        return "monthTile";
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setBirthday(new Date(e.target[0].value));
  };

  const onChange = (nextValue) => {
    setValue(nextValue);
  };

  return (
    <div className="app">
      <form className="app-form" type="submit" onSubmit={handleSubmit}>
        <Input type="date" color="secondary" id="birthday" name="birthday" />
        <Button type="submit">Moon Me</Button>
      </form>
      <Calendar
        onChange={onChange}
        tileClassName={tileClassName}
        value={value}
        tileContent={tileContent}
        minDate={birthday}
        activeStartDate={birthday}
      />
    </div>
  );
}
