"use client";

import React from 'react'

//Componentes
import BadgeComponent from './Badge';
import { Table } from "react-bootstrap";
import OffcanvasTransaction from './Modal/OffcanvasTransaction';

// Icons
import { IoTrashOutline } from "react-icons/io5";

const TableComponent: React.FC = () => {
  return (
    <>
        <Table hover responsive className='transaction-table'>
            <thead className='transaction-table-header'>
                <tr>
                    <th className='col-2'>Nome</th>
                    <th>Tipo</th>
                    <th>Categoria</th>
                    <th className='col-2'>Método</th>
                    <th className='col-2'>Data</th>
                    <th>Valor</th>
                    <th />
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Salário</td>
                    <td>
                        <BadgeComponent variant='GAIN'/>
                    </td>
                    <td>Outros</td>
                    <td>Pix</td>
                    <td className='data'>28 de Março 2023</td>
                    <td>R$ 1.750.00</td>
                    <td className='td-icons-container'>
                        <OffcanvasTransaction />
                        <IoTrashOutline className='td-icons'/>
                    </td>
                </tr>

                <tr>
                    <td>Salário</td>
                    <td>
                        <BadgeComponent variant='SPENT'/>
                    </td>
                    <td>Outros</td>
                    <td>Pix</td>
                    <td className='data'>28 de Março 2023</td>
                    <td>R$ 1.750.00</td>
                    <td className='td-icons-container'>
                        <OffcanvasTransaction />
                        <IoTrashOutline className='td-icons'/>
                    </td>
                </tr>

                <tr>
                    <td>Salário</td>
                    <td>
                        <BadgeComponent variant='INVESTMENT'/>
                    </td>
                    <td>Outros</td>
                    <td>Pix</td>
                    <td className='data'>28 de Março 2023</td>
                    <td>R$ 1.750.00</td>
                    <td className='td-icons-container'>
                        <OffcanvasTransaction />
                        <IoTrashOutline className='td-icons'/>
                    </td>
                </tr>
            </tbody>
        </Table>
    </>
  )
}

export default TableComponent;