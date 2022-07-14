import { Modal, Button } from "rsuite"
import moment from "moment"
import { getOrders, updateOrderStatus } from "@/services/orders.service"

export const OrderViewModal = ({data,open,toggleModal}) => {

    const buttonsDisabled = data.status === "done" || data.status === "canceled"

    const updateStatus = async (status) => {
        const orderValues = {status,finished_at:new Date()}
        await updateOrderStatus(orderValues,data.id)
        await toggleModal()
        await getOrders()
    }

  return (
    <Modal size="md" overflow open={open} onClose={toggleModal}>
        <Modal.Header>
          <Modal.Title>Sifariş</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <h4>Sifariş</h4>
            <ul>
                <li>id: {data.id}</li>
                <li>Stol: {data.tableNum}</li>
                <li>Işçi: {data.worker}</li>
                <li>Status: {data.status}</li>
                <li>Yaradilma tarixi: {moment(data.created_at).format("DD.MM.YYYY, hh:mm a")}</li>
                <li>Sonlanma tarixi: {moment(data.finished_at).format("DD.MM.YYYY, hh:mm a")}</li>
            </ul>
            <h4>Detallar</h4>
            <ul>
                {
                    data?.details?.map((p,index)=>{
                        return <li key={index}>{p.count}x - {p.name} - {p.totalPrice}AZN (1x-{p.price}AZN)</li> 
                    })
                }
                
            </ul>

          
        </Modal.Body>
        <Modal.Footer>
          <Button disabled={buttonsDisabled} onClick={()=>updateStatus("done")} appearance="primary" color="green">
            Sifarişi bitir
          </Button>
          <Button disabled={buttonsDisabled} onClick={()=>updateStatus("canceled")}  appearance="primary" color="red">
            Sifarişi ləğv et
          </Button>
          <Button onClick={toggleModal} appearance="subtle">
            Bağla
          </Button>
        </Modal.Footer>
      </Modal>
  )
}
