import React from 'react';

import { ErrorMessageProps } from './TypesErrorMessage';

const ErrorMessage: React.FC<ErrorMessageProps> = ({ text, textSize }) => {
  return (
    <h3 style={{ fontSize: textSize }} className="error-message">
      {text}
    </h3>
  );
};

export default ErrorMessage;
