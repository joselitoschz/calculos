import { useEffect, useState } from "react";

const sheetId = "1gXnDMuYP5IwxR-LGUarjsPaVZfQP-ClGxA248OTGaU0"; 
const apiKey = "AIzaSyCtyY5Ji_S3eB_PUDnHCNGfVwuNX0Hlyhw"; 
const specificCell = "M6"; // celda específica para totalBalance
const gastos = "M5";
const numpedidos = "M7";
const facturado = "M107";
export interface DailySales {
  date: string;
  sales: number;
  revenue: number;
  orders: number;
}

export interface SalesMetrics {
  totalBalance: number;
  totalOrders: number;
  todaySales: number;
  totalExpenses: number;
  todayRevenue: number;
  dailyData: DailySales[];
}

// Datos iniciales
const initialSalesData: SalesMetrics = {
  totalBalance: 0,
  totalExpenses: 0, // 👈 AÑADIDO
  totalOrders: 0,
  todaySales: 0,
  todayRevenue: 0.0,
  dailyData: [

    { date: '01/01', sales: 28, revenue: 2340.0, orders: 28 },
    { date: '02/01', sales: 32, revenue: 2680.0, orders: 32 },
    { date: '03/01', sales: 25, revenue: 2100.0, orders: 25 },
    { date: '04/01', sales: 38, revenue: 3180.0, orders: 38 },
    { date: '05/01', sales: 42, revenue: 3520.0, orders: 42 },
    { date: '06/01', sales: 30, revenue: 2510.0, orders: 30 },
    { date: '07/01', sales: 34, revenue: 2890.0, orders: 34 },
  ],
};

// Hook personalizado para manejar salesData y actualizar totalBalance
export const useSalesData = () => {
  const [salesData, setSalesData] = useState<SalesMetrics>(initialSalesData);

  const fetchTotalBalance = async () => {
    // INGRESOS
    try {
      const M6 = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${specificCell}?key=${apiKey}`;
      const res = await fetch(M6);
      const result = await res.json();

      console.log("Resultado del fetch:", result);

      if (result.values && result.values[0] && result.values[0][0]) {
        const totalBalance = result.values[0][0];
        setSalesData(prev => ({ ...prev, totalBalance }));
      }
    } catch (error) {
      console.error("Error fetching Google Sheets data:", error);
    }
    // GASTOS
    try {
      const gasto = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${gastos}?key=${apiKey}`;
      const res = await fetch(gasto);
      const result = await res.json();

      console.log("Resultado del fetch:", result);

      if (result.values && result.values[0] && result.values[0][0]) {
        const totalExpenses = result.values[0][0];
        setSalesData(prev => ({ ...prev, totalExpenses }));
      }
    } catch (error) {
      console.error("Error fetching Google Sheets data:", error);
    }
//NUMERO DE PEDIDOS
try {
      const M7 = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${numpedidos}?key=${apiKey}`;
      const res = await fetch(M7);
      const result = await res.json();

      console.log("Resultado del fetch:", result);

      if (result.values && result.values[0] && result.values[0][0]) {
        const totalOrders = result.values[0][0];
        setSalesData(prev => ({ ...prev, totalOrders }));
      }
    } catch (error) {
      console.error("Error fetching Google Sheets data:", error);
    }
 // Facturado
    try {
      const facturar = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${facturado}?key=${apiKey}`;
      const res = await fetch(facturar);
      const result = await res.json();

      console.log("Resultado del fetch:", result);

      if (result.values && result.values[0] && result.values[0][0]) {
        const todayRevenue = result.values[0][0];
        setSalesData(prev => ({ ...prev, todayRevenue }));
      }
    } catch (error) {
      console.error("Error fetching Google Sheets data:", error);
    }
  };

  // Llamar al fetch al montar el hook y cada 5 segundos
  useEffect(() => {
    fetchTotalBalance(); // primer fetch
    const interval = setInterval(fetchTotalBalance, 3000);
    return () => clearInterval(interval);
  }, []);

  return salesData;
};
