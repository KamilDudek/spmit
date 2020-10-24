import React, { useState } from "react";
import { Accordion, Form, Icon, Message, Segment } from "semantic-ui-react";
import Localization from "./Localization";
import LockerList from "./LockerList";
import axios from "axios";

const RoadDetailsForm = () => {
  const [activeIndex, setActiveIndex] = useState(true);
  const [latitude, setlatitude] = useState(null);
  const [longtitude, setlongtitude] = useState(null);
  const [lockers, setLockers] = useState([]);
  const [lockerError, setLockerError] = useState(false);

  const handleClick = (e) => {
    setActiveIndex(!activeIndex);
  };

  const onButtonSubmit = async (e) => {
    e.preventDefault();

    if (lockers.length === 0) {
      setLockerError(true);
    } else {
      setLockerError(false);
      const lockersArray = lockers.map((element) => element.text);
      console.log("send: ", latitude, longtitude, lockersArray);

      const response = await axios.get(
        "http://localhost:5000/api/1/lockers",
        {}
      );

      console.log(response);
    }
  };

  return (
    <Segment inverted>
      <Accordion inverted>
        <Accordion.Title active={activeIndex} index={0} onClick={handleClick}>
          <Icon name="dropdown" />
          Formularz
        </Accordion.Title>
        <Accordion.Content active={activeIndex}>
          <Form error={lockerError} inverted onSubmit={onButtonSubmit}>
            <Localization
              latitude={latitude}
              setlatitude={setlatitude}
              longtitude={longtitude}
              setlongtitude={setlongtitude}
            />
            <LockerList lockers={lockers} setLockers={setLockers} />
            <Message
              error
              header="Nie wybrano żadnego paczkomatu"
              content="Proszę wybrać paczkomat z listy"
            />
            <Form.Button floated="right" color="orange" size="large">
              Zapisz
            </Form.Button>
            <div style={{ clear: "both" }}></div>
          </Form>
        </Accordion.Content>
      </Accordion>
    </Segment>
  );
};

export default RoadDetailsForm;
