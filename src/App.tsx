import React from "react";
import PayloadCard from "./components/PayloadCard";
import { getMissionsFromFile } from "./components/utils/missionUtils";

const getMissions = () => {
  return getMissionsFromFile();
};

function App() {
  const missions = getMissions();

  return (
    <div className="m-5 md:m-20">
      <PayloadCard title="Payload Per Mission" missions={missions} />
    </div>
  );
}

export default App;
