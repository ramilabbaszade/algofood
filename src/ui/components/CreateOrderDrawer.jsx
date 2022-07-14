import { useEffect, useState } from "react";
import { Drawer, Button, InputPicker, Input, InputNumber, Notification } from "rsuite";
import { getWorkers } from "@/services/workers.service";
import { getProducts } from "@/services/products.service";
import { createOrder } from "@/services/orders.service";
import { getOrders } from "@/services/orders.service";
import { v1 as uuidv1 } from 'uuid';
import { useToaster } from 'rsuite';


const initialFormValues = {
  id:null,
  details: [],
  tableNum: "",
  status: "inprogress",
  worker: "",
  created_at: new Date(),
}

const message = (
  <Notification type="success" header="Uğurlu əməliyyat" closable>
    <h4>Əməliyyat uğurla başa çatdı</h4>
  </Notification>
);

export const CreateOrderDrawer = ({ isOpen = false, setIsOpen }) => {
  const id = uuidv1()
  const [formValues, setFormValues] = useState(initialFormValues);
  const [workers, setWorkers] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState({id});
  const toaster = useToaster();
  
  useEffect(() => {
    getWorkers().then((res) => setWorkers(res));
    getProducts().then((res) => setProducts(res));
  }, [isOpen]);

  const handleSelectedProductCount = (e) => {
    let _selectedProduct = { ...selectedProduct };
    _selectedProduct.count = Number(e);
    _selectedProduct.totalPrice = Number(e) * Number(selectedProduct.price);
    setSelectedProduct(_selectedProduct);
  };

  const onSubmitProduct = () => {
    let _formValues = { ...formValues };
    _formValues?.details.push(selectedProduct);
    setFormValues(_formValues);
    setSelectedProduct({});
  };
  const handleSelectedProduct = (e, r) => {
    setSelectedProduct({ ...r, pId:id });
  };

  const handleRemoveSelectedProduct = (pId) => {
    let _formValues = {...formValues}
    let details = _formValues.details.filter(d=> d.pId !== pId)
    _formValues.details = details
    setFormValues(_formValues)
  }

  const handleFormValues = (value,name) => {
    let _formValues = {...formValues}
    _formValues[name] = value
    setFormValues(_formValues)
  }

  const submitCreateOrder = async () => {
    let sumPrice = 0
    formValues.details.forEach((value, index, arry)=>{
      sumPrice += value.totalPrice;
    });
    await createOrder({...formValues,sumPrice,id})
    await setIsOpen(false)
    await getOrders()
    await toaster.push(message,{placement:"bottomEnd"});
  }

  const onCancelOrder = () => {
    setIsOpen(false)
    setFormValues(initialFormValues)
  }

  return (
    <Drawer
      placement="right"
      size="md"
      open={isOpen}
      onClose={onCancelOrder}
    >
      <Drawer.Header>
        <Drawer.Title>Sifariş yarat</Drawer.Title>
        <Drawer.Actions>
          <Button onClick={onCancelOrder}>Ləğv et</Button>
          <Button
            onClick={submitCreateOrder}
            disabled={!formValues?.details?.length > 0}
            appearance="primary"
            color="green"
          >
            Sifarişi yarat
          </Button>
        </Drawer.Actions>
      </Drawer.Header>
      <Drawer.Body>
        <div className="create-drawer">
          <div>
            <div>Masa nömrəsi:</div>
            <Input placeholder="Daxil edin" onChange={(e)=>handleFormValues(e,"tableNum")} value={formValues.tableNum} />
          </div>
          <br />

          <div>
            <div>İşçi:</div>
            <InputPicker
              placeholder="Seçin"
              labelKey="fullName"
              valueKey="fullName"
              value={formValues.worker}
              onChange={(e)=>handleFormValues(e,"worker")}
              data={workers}
              style={{ width: "100%" }}
            />
          </div>

          <hr />
          <div className="create-drawer__product-inputs">
            <div>
              <div>Məhsulun adı:</div>
              <InputPicker
                placeholder="Seçin"
                data={products}
                valueKey="name"
                onSelect={(e, r) => handleSelectedProduct(e, r)}
                labelKey="name"
                style={{ width: "100%" }}
              />
            </div>
            <div className="create-drawer__product-inputs__counts">
              <div>
                <div>Miqdar:</div>
                <InputNumber
                  placeholder="Daxil edin"
                  value={selectedProduct?.count}
                  disabled={!selectedProduct.name}
                  onChange={handleSelectedProductCount}
                />
              </div>
              <div>
                <div>Qiyməti:</div>
                <div>{selectedProduct?.totalPrice} AZN</div>
              </div>
            </div>
            <Button
              disabled={selectedProduct.count < 1}
              onClick={onSubmitProduct}
              appearance="ghost"
              color="green"
            >
              Əlavə et
            </Button>
          </div>
          <div>
            {formValues?.details?.map((p, index) => {
              return (
                <div key={index}>
                  {p.count}x - {p.name} - {p.totalPrice}AZN (1x-{p.price}AZN) <b onClick={()=>handleRemoveSelectedProduct(p.pId)}>Sil</b>
                </div>
              );
            })}
          </div>
        </div>
      </Drawer.Body>
    </Drawer>
  );
};
