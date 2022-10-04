import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import appContext from '../Context/AppContext';
import { getCart, getTotal, getUser } from '../Services/LocalStorage';
import { requestOrder } from '../Services/Axios';
import NavBar from '../Components/NavBar';
import ProductBoard from '../Components/ProductBoard';

function Checkout() {
  const cart = getCart();
  const total = getTotal();
  const { id, token } = getUser();
  const [address, setAdress] = useState('');
  const [adNumber, setAdNumber] = useState(0);
  const [sellerId, setSellerId] = useState(0);
  const [btnFinishOrder, setBtnFinishOrder] = useState(true);
  const { sellers, sellersRequest } = useContext(appContext);

  const history = useNavigate();

  useEffect(() => {
    sellersRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (address !== '' && adNumber !== '' && sellerId !== 0) {
      setBtnFinishOrder(false);
    } else {
      setBtnFinishOrder(true);
    }
  }, [address, adNumber, sellerId]);

  const finishOrder = async () => {
    const orderCart = cart
      .map((item) => ({ productId: item.id, quantity: item.quantity }));

    const headers = { Authorization: token };

    const order = {
      userId: id,
      sellerId,
      totalPrice: total.toFixed(2),
      deliveryAddress: address,
      deliveryNumber: adNumber,
      salesProducts: orderCart,
    };

    const result = await requestOrder('/customer/orders', order, { headers });
    console.log(result);

    if (!result.message) {
      history(`/customer/orders/${result.id}`);
    }
  };

  return (
    <div className="products-container">
      <NavBar />
      <section>
        <h1>Finalizar Pedidos</h1>
        <ProductBoard cart={ cart } />
        <span
          data-testid="customer_checkout__element-order-total-price"
        >
          { `Total: ${total.toFixed(2).replace('.', ',')}` }
        </span>
      </section>
      <section>
        <h1>Detalhes e Endereços para Entrega</h1>
        <span>Vendedor Responsável:</span>
        { sellers !== undefined && sellers !== null && sellers.length > 0 && (
          <select
            data-testid="customer_checkout__select-seller"
            onChange={ ({ target }) => setSellerId(Number(target.value)) }
          >
            <option value={ 0 }>-</option>
            { sellers.map((seller) => (
              <option key={ seller.id } value={ seller.id }>{ seller.name }</option>
            )) }
          </select>
        ) }
        <span>Endereço</span>
        <input
          type="text"
          value={ address }
          data-testid="customer_checkout__input-address"
          onChange={ ({ target }) => setAdress(target.value) }
        />
        <span>Número</span>
        <input
          type="text"
          value={ adNumber }
          data-testid="customer_checkout__input-address-number"
          onChange={ ({ target }) => setAdNumber(Number(target.value)) }
        />
        <button
          type="button"
          disabled={ btnFinishOrder }
          data-testid="customer_checkout__button-submit-order"
          onClick={ finishOrder }
        >
          Finalizar Pedido
        </button>
      </section>
    </div>
  );
}

export default Checkout;
