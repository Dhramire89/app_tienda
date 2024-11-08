import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import Blog from "./Componentes/Blog";
import Inicio from "./Componentes/Inicio";
import Tienda from "./Componentes/Tienda";
import Error404 from "./Componentes/Error404";
import Carrito from "./Componentes/Carrito";

function App() {
  const productos = [
    { id: 1, nombre: "Producto 1" },
    { id: 2, nombre: "Producto 2" },
    { id: 3, nombre: "Producto 3" },
    { id: 4, nombre: "Producto 4" },
    { id: 5, nombre: "Producto 5" },
  ];

  const [carrito, setCarrito] = useState([]);

  const agregarProductoAlCarrito = (idProductoAgregar, nombre) => {
    // si el cartito esta vacio
    if (carrito.length === 0) {
      setCarrito([{ id: idProductoAgregar, nombre: nombre, cantidad: 1 }]);
    } else {
      // revisar que el producto no exita
      // si ya lo tiene actualizar la cantidad
      // si no tiene el producto entonces se agrega
      // para poder editar el arreglo se tiene que clonar
      const nuevoCarrito = [...carrito];
      // comprobar si el carrito ya tiene el ID del producto a agregar
      const yaEstaEnCarrito =
        nuevoCarrito.filter((prductoDeCarrito) => {
          return prductoDeCarrito.id === idProductoAgregar;
        }).length > 0;
      // si ya tiene el producto entonces lo actualizamos
      if (yaEstaEnCarrito) {
        // para ello tenemos que burcarlo, obtener su posicion en el arreglo
        // y en base a su posicion ya actualizamos el valor
        nuevoCarrito.forEach((prductoDeCarrito, index) => {
          if (prductoDeCarrito.id === idProductoAgregar) {
            const cantidad = nuevoCarrito[index].cantidad;
            nuevoCarrito[index] = {
              id: idProductoAgregar,
              nombre: nombre,
              cantidad: cantidad + 1,
            };
          }
        });
      } else {
        nuevoCarrito.push({
          id: idProductoAgregar,
          nombre: nombre,
          cantidad: 1,
        });
      }
      // actualizar el carrito
      setCarrito(nuevoCarrito);
    }
  };

  return (
    <Contenedor>
      <Menu>
        <NavLink to="/">Inicio</NavLink>
        <NavLink to="/blog">Blog</NavLink>
        <NavLink to="/tienda">Tienda</NavLink>
      </Menu>
      <Routes>
        <Route path="*" element={<Error404 />} />
        <Route path="/" element={<Inicio />} />
        <Route path="/blog" element={<Blog />} />
        <Route
          path="/tienda"
          element={
            <Tienda
              productos={productos}
              agregarProductoAlCarrito={agregarProductoAlCarrito}
            />
          }
        />
      </Routes>
      <main>
        <aside>
          <Carrito carrito={carrito} />
        </aside>
      </main>
    </Contenedor>
  );
}

const Contenedor = styled.div`
  max-width: 1000px;
  padding: 40px;
  width: 90%;
  display: grid;
  gap: 20px;
  grid-template-columns: 2fr 1fr;
  background: #fff;
  margin: 40px 0;
  border-radius: 10px;
  box-shadow: 0px 0px 5px rgba(129, 129, 129, 0.1);
`;

const Menu = styled.nav`
  width: 100%;
  text-align: center;
  background: #092c4c;
  grid-column: span 2;
  border-radius: 3px;

  a {
    color: #fff;
    display: inline-block;
    padding: 15px 20px;
  }

  a:hover {
    background: #1d85e8;
    text-decoration: none;
  }
`;
export default App;
