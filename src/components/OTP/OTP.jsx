import React, { useState, useRef, useEffect } from 'react';

function OTPInput({ length = 6, onChange = ()=>{} }) {
  const [otp, setOtp] = useState(Array(length).fill(''));
  const inputsRef = useRef([]);

  useEffect(() => {
    focusInput(0);
  }, []);

  
  useEffect(() => {
    onChange(otp.join(''));
  }, [otp, onChange]);

  const focusInput = (index) => {
    if (inputsRef.current[index]) {
      inputsRef.current[index].focus();
      inputsRef.current[index].select();
    }
  };

  const handleChange = (e, index) => {
    const val = e.target.value;
    if (!/^\d*$/.test(val)) return; // allow only digits

    const newOtp = [...otp];
    newOtp[index] = val.slice(-1); // only last digit
    setOtp(newOtp);

    if (val && index < length - 1) {
      focusInput(index + 1);
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      focusInput(index - 1);
    }
  };

  return (
    <div className="w-full flex items-center justify-center" style={{ display: 'flex', gap: 8 }}>
      {otp.map((digit, idx) => (
        <input
          key={idx}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(e, idx)}
          onKeyDown={(e) => handleKeyDown(e, idx)}
          ref={(el) => (inputsRef.current[idx] = el)}
          style={{
            width: 40,
            height: 40,
            textAlign: 'center',
            fontSize: 24,
            border: '1px solid #ccc',
            borderRadius: 4,
          }}
        />
      ))}
    </div>
  );
}

export default React.memo(OTPInput);
