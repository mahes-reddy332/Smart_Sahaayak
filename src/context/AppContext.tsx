import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { InventoryItem, Sale, Contact, Reminder } from '../types';

interface AppState {
  inventory: InventoryItem[];
  sales: Sale[];
  contacts: Contact[];
  reminders: Reminder[];
  userTier: 'free' | 'pro';
}

type AppAction = 
  | { type: 'ADD_INVENTORY_ITEM'; payload: InventoryItem }
  | { type: 'UPDATE_INVENTORY_ITEM'; payload: InventoryItem }
  | { type: 'DELETE_INVENTORY_ITEM'; payload: string }
  | { type: 'ADD_SALE'; payload: Sale }
  | { type: 'UPDATE_INVENTORY_AFTER_SALE'; payload: { itemId: string; quantitySold: number } }
  | { type: 'ADD_CONTACT'; payload: Contact }
  | { type: 'UPDATE_CONTACT'; payload: Contact }
  | { type: 'DELETE_CONTACT'; payload: string }
  | { type: 'ADD_REMINDER'; payload: Reminder }
  | { type: 'UPDATE_REMINDER'; payload: Reminder }
  | { type: 'DELETE_REMINDER'; payload: string }
  | { type: 'UPGRADE_TO_PRO' }
  | { type: 'DOWNGRADE_TO_FREE' };

// Enhanced sample data for better analytics
const generateSampleData = () => {
  const now = new Date();
  const sales: Sale[] = [];
  const inventory: InventoryItem[] = [
    {
      id: '1',
      name: 'Basmati Rice (5kg)',
      quantity: 45,
      costPrice: 220,
      sellingPrice: 280,
      category: 'Grains',
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01')
    },
    {
      id: '2',
      name: 'Sunflower Oil (1L)',
      quantity: 32,
      costPrice: 120,
      sellingPrice: 145,
      category: 'Oils',
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01')
    },
    {
      id: '3',
      name: 'Sugar (1kg)',
      quantity: 8,
      costPrice: 40,
      sellingPrice: 50,
      category: 'Sweeteners',
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01')
    },
    {
      id: '4',
      name: 'Wheat Flour (10kg)',
      quantity: 25,
      costPrice: 350,
      sellingPrice: 420,
      category: 'Grains',
      createdAt: new Date('2024-01-02'),
      updatedAt: new Date('2024-01-02')
    },
    {
      id: '5',
      name: 'Toor Dal (1kg)',
      quantity: 18,
      costPrice: 85,
      sellingPrice: 110,
      category: 'Pulses',
      createdAt: new Date('2024-01-02'),
      updatedAt: new Date('2024-01-02')
    },
    {
      id: '6',
      name: 'Tea Powder (250g)',
      quantity: 40,
      costPrice: 180,
      sellingPrice: 220,
      category: 'Beverages',
      createdAt: new Date('2024-01-03'),
      updatedAt: new Date('2024-01-03')
    },
    {
      id: '7',
      name: 'Milk (1L)',
      quantity: 6,
      costPrice: 45,
      sellingPrice: 55,
      category: 'Dairy',
      createdAt: new Date('2024-01-03'),
      updatedAt: new Date('2024-01-03')
    },
    {
      id: '8',
      name: 'Onions (1kg)',
      quantity: 50,
      costPrice: 25,
      sellingPrice: 35,
      category: 'Vegetables',
      createdAt: new Date('2024-01-04'),
      updatedAt: new Date('2024-01-04')
    },
    {
      id: '9',
      name: 'Potatoes (1kg)',
      quantity: 35,
      costPrice: 20,
      sellingPrice: 30,
      category: 'Vegetables',
      createdAt: new Date('2024-01-04'),
      updatedAt: new Date('2024-01-04')
    },
    {
      id: '10',
      name: 'Tomatoes (1kg)',
      quantity: 4,
      costPrice: 30,
      sellingPrice: 45,
      category: 'Vegetables',
      createdAt: new Date('2024-01-05'),
      updatedAt: new Date('2024-01-05')
    },
    {
      id: '11',
      name: 'Biscuits Pack',
      quantity: 60,
      costPrice: 15,
      sellingPrice: 20,
      category: 'Snacks',
      createdAt: new Date('2024-01-05'),
      updatedAt: new Date('2024-01-05')
    },
    {
      id: '12',
      name: 'Soap Bar',
      quantity: 25,
      costPrice: 25,
      sellingPrice: 35,
      category: 'Personal Care',
      createdAt: new Date('2024-01-06'),
      updatedAt: new Date('2024-01-06')
    }
  ];

  // Generate sales data for the last 30 days
  for (let i = 0; i < 30; i++) {
    const saleDate = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    const numSalesPerDay = Math.floor(Math.random() * 8) + 2; // 2-10 sales per day
    
    for (let j = 0; j < numSalesPerDay; j++) {
      const randomItem = inventory[Math.floor(Math.random() * inventory.length)];
      const quantity = Math.floor(Math.random() * 3) + 1; // 1-3 quantity
      const totalAmount = randomItem.sellingPrice * quantity;
      const profit = (randomItem.sellingPrice - randomItem.costPrice) * quantity;
      
      sales.push({
        id: `sale-${i}-${j}`,
        itemId: randomItem.id,
        itemName: randomItem.name,
        quantitySold: quantity,
        unitPrice: randomItem.sellingPrice,
        totalAmount,
        profit,
        createdAt: new Date(saleDate.getTime() - j * 60 * 60 * 1000) // Spread throughout the day
      });
    }
  }

  return { inventory, sales };
};

const { inventory: sampleInventory, sales: sampleSales } = generateSampleData();

const initialState: AppState = {
  inventory: sampleInventory,
  sales: sampleSales,
  contacts: [
    {
      id: '1',
      name: 'राज होलसेल मार्केट • Raj Wholesale Market',
      phone: '+91-9876543210',
      type: 'supplier',
      email: 'raj@wholesale.com',
      address: 'मंडी रोड, दिल्ली • Mandi Road, Delhi',
      createdAt: new Date('2024-01-01')
    },
    {
      id: '2',
      name: 'प्रिया शर्मा • Priya Sharma',
      phone: '+91-8765432109',
      type: 'customer',
      address: 'सेक्टर 15, गुड़गांव • Sector 15, Gurgaon',
      createdAt: new Date('2024-01-02')
    },
    {
      id: '3',
      name: 'अमित ट्रेडर्स • Amit Traders',
      phone: '+91-7654321098',
      type: 'supplier',
      email: 'amit@traders.in',
      address: 'करोल बाग, दिल्ली • Karol Bagh, Delhi',
      createdAt: new Date('2024-01-03')
    },
    {
      id: '4',
      name: 'सुनीता देवी • Sunita Devi',
      phone: '+91-6543210987',
      type: 'customer',
      address: 'लाजपत नगर, दिल्ली • Lajpat Nagar, Delhi',
      createdAt: new Date('2024-01-04')
    },
    {
      id: '5',
      name: 'गुप्ता एंटरप्राइजेज • Gupta Enterprises',
      phone: '+91-5432109876',
      type: 'supplier',
      email: 'gupta@enterprises.co.in',
      address: 'आज़ादपुर मंडी, दिल्ली • Azadpur Mandi, Delhi',
      createdAt: new Date('2024-01-05')
    }
  ],
  reminders: [
    {
      id: '1',
      title: 'चीनी का स्टॉक खत्म • Sugar Stock Running Low',
      description: 'चीनी की मात्रा कम है। आपूर्तिकर्ता से संपर्क करें। • Sugar quantity is low. Contact supplier.',
      recipientName: 'राज होलसेल मार्केट • Raj Wholesale Market',
      recipientPhone: '+91-9876543210',
      dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
      isCompleted: false,
      createdAt: new Date()
    },
    {
      id: '2',
      title: 'टमाटर रीस्टॉक करें • Restock Tomatoes',
      description: 'टमाटर का स्टॉक बहुत कम है। तुरंत ऑर्डर करें। • Tomato stock is very low. Order immediately.',
      recipientName: 'अमित ट्रेडर्स • Amit Traders',
      recipientPhone: '+91-7654321098',
      dueDate: new Date(Date.now() + 12 * 60 * 60 * 1000),
      isCompleted: false,
      createdAt: new Date()
    },
    {
      id: '3',
      title: 'दूध की डिलीवरी • Milk Delivery',
      description: 'कल सुबह दूध की डिलीवरी का समय। • Tomorrow morning milk delivery time.',
      recipientName: 'सुनीता देवी • Sunita Devi',
      recipientPhone: '+91-6543210987',
      dueDate: new Date(Date.now() + 18 * 60 * 60 * 1000),
      isCompleted: false,
      createdAt: new Date()
    }
  ],
  userTier: 'free'
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'ADD_INVENTORY_ITEM':
      return {
        ...state,
        inventory: [...state.inventory, action.payload]
      };
    case 'UPDATE_INVENTORY_ITEM':
      return {
        ...state,
        inventory: state.inventory.map(item => 
          item.id === action.payload.id ? action.payload : item
        )
      };
    case 'DELETE_INVENTORY_ITEM':
      return {
        ...state,
        inventory: state.inventory.filter(item => item.id !== action.payload)
      };
    case 'ADD_SALE':
      return {
        ...state,
        sales: [...state.sales, action.payload]
      };
    case 'UPDATE_INVENTORY_AFTER_SALE':
      return {
        ...state,
        inventory: state.inventory.map(item => 
          item.id === action.payload.itemId 
            ? { ...item, quantity: item.quantity - action.payload.quantitySold }
            : item
        )
      };
    case 'ADD_CONTACT':
      return {
        ...state,
        contacts: [...state.contacts, action.payload]
      };
    case 'UPDATE_CONTACT':
      return {
        ...state,
        contacts: state.contacts.map(contact => 
          contact.id === action.payload.id ? action.payload : contact
        )
      };
    case 'DELETE_CONTACT':
      return {
        ...state,
        contacts: state.contacts.filter(contact => contact.id !== action.payload)
      };
    case 'ADD_REMINDER':
      return {
        ...state,
        reminders: [...state.reminders, action.payload]
      };
    case 'UPDATE_REMINDER':
      return {
        ...state,
        reminders: state.reminders.map(reminder => 
          reminder.id === action.payload.id ? action.payload : reminder
        )
      };
    case 'DELETE_REMINDER':
      return {
        ...state,
        reminders: state.reminders.filter(reminder => reminder.id !== action.payload)
      };
    case 'UPGRADE_TO_PRO':
      return {
        ...state,
        userTier: 'pro'
      };
    case 'DOWNGRADE_TO_FREE':
      return {
        ...state,
        userTier: 'free'
      };
    default:
      return state;
  }
}

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}