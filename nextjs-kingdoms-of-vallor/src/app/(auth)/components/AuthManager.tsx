'use client';

/**
 * Step 1 = LoginButtons
 * Step 2 = LoginWithEmail
 * Step 3 = RegisterWithEmail
 */

import { useState } from 'react';

import { LoginButtons } from '../steps/LoginButtons';
import { LoginWithEmail } from '../steps/LoginWithEmail';
import { RegisterWithEmail } from '../steps/RegisterWithEmail';

export function AuthManager() {
  const [currentStep, setCurrentStep] = useState<number>(1);

  return (
    <>
      {currentStep === 1 && (
        <LoginButtons onLoginWithEmail={() => setCurrentStep(2)} />
      )}
      {currentStep === 2 && (
        <LoginWithEmail
          onReturn={() => setCurrentStep(1)}
          onRegisterWithEmail={() => setCurrentStep(3)}
        />
      )}
      {currentStep === 3 && (
        <RegisterWithEmail onReturn={() => setCurrentStep(2)} />
      )}
    </>
  );
}
