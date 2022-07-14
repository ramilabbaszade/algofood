import React, { useEffect, useState } from "react";
import { OrdersTable } from "@/ui/components/OrdersTable";
import { Navigation } from "@/ui/components/Navigation";
import { CreateOrderDrawer } from "@/ui/components/CreateOrderDrawer";

import { useSelector } from 'react-redux'
import { getOrders } from "@/services/orders.service";

export const Home = () => {
  const [isModalOpen,setIsModalOpen] = useState(false)
  const {orders, finihedOrdersLength, inprogressOrdersLength, sumRevunue} = useSelector((state) => state.order)
  useEffect(()=>{
    getOrders()
  },[])

  const openModal = () => {
    setIsModalOpen(true)
  }

  return (
    <>
      <Navigation />
      <CreateOrderDrawer isOpen={isModalOpen} setIsOpen={setIsModalOpen}/>
      <div className="home">
        <div className="home__grid">
          <div className="card card__blue" onClick={openModal}>
            <h1>Yeni <br/> Sifariş Yarat</h1>
          </div>
          <div className="card">
            <h4>Aktiv sifariş sayı:</h4>
            <div className="card__unit-number">{inprogressOrdersLength}</div>
          </div>
          <div className="card">
            <h4>Tamamlanmış sifarişlərin sayı:</h4>
            <div className="card__unit-number">{finihedOrdersLength}</div>
          </div>
          <div className="card card__green">
            <h4>Gəlir (AZN):</h4>
            <div className="card__unit-number">{sumRevunue} </div>
          </div>
        </div>
        <br/>
        <h4>Son sifarişlər</h4>
        <hr/>
        <OrdersTable data={orders}/>
      </div>
    </>
  );
};
