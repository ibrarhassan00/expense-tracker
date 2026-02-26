import React from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useUserAuth } from "../../hooks/useUserAuth";
import { API_PATHS } from "../../utils/apiPath";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axiosInstance from "../../utils/axiosinstance";
import { useEffect } from "react";
import InfoCard from "../../components/Cards/InfoCard";

import { LuHandCoins, LuWalletMinimal } from "react-icons/lu";
import { IoMdCard } from "react-icons/io";
import { addThousandSeparator } from "../../utils/helper";
import RecentTransactions from "../../components/Dashboard/RecentTransactions";
import FinaceOverview from "../../components/Dashboard/FinaceOverview";
import ExpenseTransaction from "../../components/Dashboard/ExpenseTransaction";

import RecentIncomeWithChart from "../../components/Dashboard/RecentIncomeWithChart";
import RecentIncome from "../../components/Dashboard/RecentIncome";
import Last30DaysExpenses from "../../components/Dashboard/Last30DaysExpense";
const Home = () => {
  useUserAuth();

  const naviagte = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fatchDashboardData = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await axiosInstance.get(
        `${API_PATHS.DASHBOARD.GET_DATA}`,
      );

      if (response.data) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.log("Something went wrong please try again:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fatchDashboardData();
  }, []);

  return (
    <DashboardLayout activeMenu={"Dashboard"}>
      <div className="my-5 mx-auto">
        Home Page
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InfoCard
            icon={<IoMdCard />}
            label="Total Balance"
            value={addThousandSeparator(dashboardData?.totalBalance || 0)}
            color="bg-primary"
          />

          <InfoCard
            icon={<IoMdCard />}
            label="Total Income"
            value={addThousandSeparator(dashboardData?.totalIncome || 0)}
            color="bg-orange-500"
          />

          <InfoCard
            icon={<IoMdCard />}
            label="Total Expense"
            value={addThousandSeparator(dashboardData?.totalExpense || 0)}
            color="bg-red-500"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 ">
          <RecentTransactions
            transactions={dashboardData?.recentTransactions}
            onSeeMore={() => {
              return naviagte("/expense");
            }}
          />
          <FinaceOverview
            totalBalance={dashboardData?.totalBalance || 0}
            totalIncome={dashboardData?.totalIncome || 0}
            totalExpense={dashboardData?.totalExpense || 0}
          />

          <ExpenseTransaction
            transactions={dashboardData?.last30DaysExpense?.transactions}
            onSeeMore={() => {
              return naviagte("/expense");
            }}
          />
          <Last30DaysExpenses
            data={dashboardData?.last30DaysExpense.transactions || []}
          />

          {/* dashboardData?.last60DaysIncome?.recentTransactions?.slice(0,4) || [] */}
          <RecentIncomeWithChart
            data={
              dashboardData?.last60DaysIncome?.transactions?.slice(0, 4) || []
            }
            totalIncome={dashboardData?.totalIncome || 0}
          />

          <RecentIncome
          transactions={dashboardData?.last60DaysIncome.transactions || []}
          onSeeMore={()=>{return naviagte("/income")}}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Home;
