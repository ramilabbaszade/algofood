import moment from "moment";
import React, { useState } from "react";
import { Table, Button } from 'rsuite';
import { getSingleOrder } from "@/services/orders.service";
import { OrderViewModal } from "./OrderViewModal";

export const OrdersTable = ({data}) => {
  const [sortColumn, setSortColumn] = useState();
  const [sortType, setSortType] = useState();
  const [loading, setLoading] = useState(false);
  const [openModal,setOpenModal] = useState(false)
  const [singleOrder,setSingleOrder] = useState({})

  const handleSortColumn = (sortColumn, sortType) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSortColumn(sortColumn);
      setSortType(sortType);
    }, 500);
  };


  const statusColor = (status) => {
    if(status === "inprogress") return "yellow"
    else if(status === "done") return "green"
    else if(status === "canceled") return "red"
  }

  const openClickedRow = (id) => {
    getSingleOrder(id).then(res=>{
      setSingleOrder(res)
      toggleModal()
    })
  }
  const toggleModal = () => setOpenModal(!openModal)

  return (
    <div className="orders_table">
      <OrderViewModal data={singleOrder} open={openModal} toggleModal={toggleModal}/>
      <Table
        height={1000}
        virtualized
        data={data}
        sortColumn={sortColumn}
        sortType={sortType}
        onSortColumn={handleSortColumn}
        loading={loading}
      >
        <Table.Column width={70} align="center" fixed sortable>
          <Table.HeaderCell>Sırası</Table.HeaderCell>
          <Table.Cell>{(rowData,index) => index+1}</Table.Cell>
        </Table.Column>

        <Table.Column align="center" width={100} fixed sortable>
          <Table.HeaderCell>Masa</Table.HeaderCell>
          <Table.Cell dataKey="tableNum" />
        </Table.Column>



        <Table.Column width={300} align="center">
          <Table.HeaderCell>İşçi</Table.HeaderCell>
          <Table.Cell dataKey="worker" />
        </Table.Column>

        <Table.Column align="center">
          <Table.HeaderCell>Qiymət (AZN)</Table.HeaderCell>
          <Table.Cell dataKey="sumPrice" />
        </Table.Column>

        <Table.Column align="center" width={200} fixed sortable>
          <Table.HeaderCell>Yaradıldı</Table.HeaderCell>
          <Table.Cell>{rowData => moment(rowData.created_at).format("DD.MM.YYYY, hh:mm a") }</Table.Cell>
        </Table.Column>
        
        <Table.Column align="center" width={200} fixed sortable>
          <Table.HeaderCell>Sonlandırıldı</Table.HeaderCell>
          <Table.Cell>{rowData => rowData.finished_at && moment(rowData.finished_at).format("DD.MM.YYYY, hh:mm a") }</Table.Cell>
        </Table.Column>

        <Table.Column align="center" width={130} fixed sortable>
          <Table.HeaderCell>Status</Table.HeaderCell>
          <Table.Cell>{rowData => 
            rowData.status && <Button color={statusColor(rowData.status)} size="sm" appearance="ghost">
            {rowData.status}
          </Button>
          }</Table.Cell>
          
        </Table.Column>

        <Table.Column align="center" width={130} fixed sortable>
          <Table.HeaderCell>Əməliyyat</Table.HeaderCell>
          <Table.Cell>{rowData => <Button onClick={()=> openClickedRow(rowData.id)}>Bax</Button>}</Table.Cell>
        </Table.Column>
      </Table>
    </div>
  );
};
