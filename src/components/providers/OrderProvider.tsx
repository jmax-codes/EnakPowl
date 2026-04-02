"use client";

import React, { createContext, useContext, useState } from 'react';
import { OrderOverlay } from '../layout/OrderOverlay';

type PanelType = 'left' | 'right' | null;

interface OrderContextType {
  openOrder: (panel?: PanelType) => void;
  closeOrder: () => void;
  activePanel: PanelType;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider = ({ children }: { children: React.ReactNode }) => {
  const [activePanel, setActivePanel] = useState<PanelType>(null);

  const openOrder = (panel: PanelType = 'right') => setActivePanel(panel);
  const closeOrder = () => setActivePanel(null);

  return (
    <OrderContext.Provider value={{ openOrder, closeOrder, activePanel }}>
      {children}
      <OrderOverlay activePanel={activePanel} onClose={closeOrder} />
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
};
