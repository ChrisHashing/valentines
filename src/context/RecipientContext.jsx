import React, { createContext, useContext, useState } from 'react';

const RecipientContext = createContext();

export function RecipientProvider({ children }) {
  const [selectedRecipient, setSelectedRecipient] = useState('');

  return (
    <RecipientContext.Provider value={{ selectedRecipient, setSelectedRecipient }}>
      {children}
    </RecipientContext.Provider>
  );
}

export function useRecipient() {
  return useContext(RecipientContext);
}