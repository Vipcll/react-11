import ItemCarrito from './ItemCarrito';
import { Link } from "react-router-dom";
import React from "react";
import { useContext } from 'react';
import { CartContext } from "../contenedores/CartContext";

const Cart = () => {
    const { cartList, clear, precioTotal } = useContext(CartContext); // Traigo el carrito y las funciones necesarias guardadas en el contexto CartContext

    return (
        <div className="contenedor-carrito">
            <h1>Carrito</h1>

            {
            (cartList.length == 0)
            ? // Retorna únicamente el siguiente div si el carrito está vacío
            <div className="carritoVacio">
                <p>El carrito está vacío. Visita la&nbsp;</p>
                <Link to="/">página principal</Link>
                <p>&nbsp;para ver todas nuestras ofertas</p>
            </div>
            :
            <>
            <div className="carrito">
                { // Recorro el carrito colocando todos sus elementos en el DOM
                cartList.map( item =>
                    <ItemCarrito
                    key = {item.id}
                    id = {item.id}
                    img = {item.img}
                    title = {item.title}
                    cantidad = {item.cantidad}
                    price = {item.price}
                    />
                )
                }
            </div>
            <div className="divFinalizarCompra">
                <p>Total: ${precioTotal()}</p>
                <div>
                    <button className="botonComprar">Finalizar compra</button>
                    <button className="botonBorrar" onClick={clear}>Vaciar carrito</button>
                </div>
            </div>
            </>
            }
        </div>
    )
}

export default Cart;