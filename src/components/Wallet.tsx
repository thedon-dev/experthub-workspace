"use client"

import DashboardLayout from '@/components/DashboardLayout';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAppSelector } from '@/store/hooks';

const Wallet = () => {
  const user = useAppSelector((state) => state.value);
  const [balance, setBalance] = useState('')
  const [transactions, setTransactions] = useState<any[]>([])

  const getBalance = () => {
    axios.get(`transactions/balance/${user.id}`)
      .then(function (response) {
        console.log(response.data)
        setTransactions(response.data.transactions)
        setBalance(response.data.balance)
      })
  }

  useEffect(() => {
    getBalance()
  }, [])

  return (
    <DashboardLayout>
      <div className='p-6'>
        <div>
          <p>Balance</p>
          <p className='text-3xl font-bold'># {balance}</p>
          <button className='bg-primary text-white p-3 rounded-md px-10 my-4'>Withdraw</button>
        </div>
        <div className=''>
          <div className='border-b py-3 border-[#1E1E1E80]'>
            <p className='font-bold'>Transactions</p>
          </div>
          <div className='w-full'>
            <table className="table-auto w-full">
              <thead>
                <tr className='!text-left border-b border-[#1E1E1E80]'>
                  <th className='py-3'>Course</th>
                  <th>Amount</th>
                  <th>Type</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction, index) => <tr key={index}>
                  <td>{transaction.courseId.title}</td>
                  <td>{transaction.amount}</td>
                  <td>{transaction.type}</td>
                  <td>{transaction.data}</td>
                </tr>)}

              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Wallet;