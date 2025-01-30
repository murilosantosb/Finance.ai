"use client"

import React from 'react'

import { Doughnut } from "react-chartjs-2"
import { data, options } from "@/utils/graphSettings"
import Icon from '../Icon'

const FinanceChart: React.FC = () => {
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
                    <strong>60%</strong>
                </div>

                <div>
                    <span>
                      <Icon size={25} variant='graph_down_arrow' background_color='background-icon-secondary-expenses'/>
                      <p>Gastos</p>
                    </span>
                    <strong>22%</strong>
                </div>

                <div>
                   <span>
                    <Icon size={25} variant='piggy_bank' background_color='background-icon-tertialy'/>
                    <p>Investimentos</p>
                   </span>
                   <strong>18%</strong>
                </div>

            </section>
    </section>
  )
}

export default FinanceChart