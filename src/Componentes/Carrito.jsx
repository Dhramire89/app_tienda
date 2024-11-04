import React from "react";
import { useState } from "react";
import styled from "styled-components";

const Carrito = ({ carrito }) => {
  return (
    <div>
      <h3>Carrtito de compras</h3>
      {carrito.length > 0 ? (
        carrito.map((producto, index) => {
          return (
            <Producto key={index}>
              <NombreProducto>{producto.nombre}</NombreProducto>
              Cantidad: {producto.cantidad}
            </Producto>
          );
        })
      ) : (
        <p>Carrito vacio </p>
      )}
    </div>
  );
};

const Producto = styled.div`
  padding: 10px;
  border-bottom: 1px solid #ebebf3;
  font-size: 14px;
`;
const NombreProducto = styled.p`
  font-weight: bold;
  color: #000;
  font-size: 16px;
`;

export default Carrito;
