import React, { useState } from "react";
import BabyInfo from './babyInfo';
import PersonalInfo from './personalInfo';
import ConfirmEmail from './confirmEmail';
import './registration.css';

const Registration = () => {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({});

  const handleDataChange = (id, value) => {
    setData({
      ...data,
      [id]: value,
    })
  };

  return (
    <div className="register">
      <h1>Sign up to create a list</h1>

      {step === 0 && (<BabyInfo setStep={setStep} data={data} handleDataChange={handleDataChange} />)}
      {step === 1 && (<PersonalInfo setStep={setStep} data={data} handleDataChange={handleDataChange} />)}
      {step === 2 && (<ConfirmEmail setStep={setStep} data={data} handleDataChange={handleDataChange} />)}                   
    </div>
  );
}

export default Registration;
