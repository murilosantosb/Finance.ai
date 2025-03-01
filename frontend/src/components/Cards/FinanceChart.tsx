"use client"

import React, { useEffect } from 'react'

import { Doughnut } from "react-chartjs-2"
import { getChartData, options } from "@/utils/graphSettings"
import Icon from '../Icon'
import percentagesStore from '@/store/percentagesStore'
import userStore from '@/store/userStore'

const FinanceChart: React.FC = () => {
  const data = getChartData();
  const { percentages, calculateUserPencentages } = percentagesStore();
  const { user } = userStore();
  
  const total = user.revenue + user.investment + user.expenses;

  const gain = user.revenue / total * 100;
  const investment = user.investment / total * 100;
  const spent = user.expenses / total * 100;

  
  useEffect(() => {   
    calculateUserPencentages({
      gain: Number(gain.toFixed(1)),
      investment: Number(investment.toFixed(1)),
      spent: Number(spent.toFixed(1)),
    })
  }, [calculateUserPencentages, gain, investment, spent])

  return (
    <section className='finance-chart'>
            <section className='chart-content'>
                <Doughnut data={data} options={options}/>
            </section>

            <section className='finance-chart-content'>

                <div>
                    <span>
                      <Icon size={25} variant="graph_up_arrow" background_color='background-icon-secondary-revenue'/>
                      <p>Ganhos</p>
                    </span>
                    <strong>{percentages.gain ? percentages.gain : 0}%</strong>
                </div>

                <div>
                    <span>
                      <Icon size={25} variant='graph_down_arrow' background_color='background-icon-secondary-expenses'/>
                      <p>Gastos</p>
                    </span>
                    <strong>{percentages.spent ? percentages.spent : 0}%</strong>
                </div>

                <div>
                   <span>
                    <Icon size={25} variant='piggy_bank' background_color='background-icon-tertialy'/>
                    <p>Investimentos</p>
                   </span>
                   <strong>{percentages.investment ? percentages.investment: 0}%</strong>
                </div>

            </section>
    </section>
  )
}

export default FinanceChart