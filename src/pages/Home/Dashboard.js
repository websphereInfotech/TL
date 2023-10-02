import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap"
import { FaPlus } from 'react-icons/fa'

function Dashboard() {
  const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);
  const [architecCount,setArchitectureCount] = useState(0);
  const [carpenterCount,setCarpenterCount] = useState(0);
  const [shopCount,setShopCount] = useState(0);
  const [quotation,setQuotation] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem( process.env.KEY);
    async function fetchData() {
        try {
            const timestamp = Date.now();
            const architecCountRes = await axios.get(`http://localhost:2002/api/architec/listdata?timestamp=${timestamp}`, {
                headers: {
                    "Authorization": `Bearer ${saved}`
                }
            });
            setArchitectureCount(architecCountRes.data.data.length);
            const carpenterCountRes = await axios.get(`http://localhost:2002/api/carpenter/listdata?timestamp=${timestamp}`, {
                headers: {
                    "Authorization": `Bearer ${saved}`
                }
            });
            setCarpenterCount(carpenterCountRes.data.data.length);
            const shopCountRes = await axios.get(`http://localhost:2002/api/shop/listdata?timestamp=${timestamp}`, {
                headers: {
                    "Authorization": `Bearer ${saved}`
                }
            });
            setShopCount(shopCountRes.data.data.length);
            const quotationRes = await axios.get(`http://localhost:2002/api/quotation/listdata?timestamp=${timestamp}`, {
                headers: {
                    "Authorization": `Bearer ${saved}`
                }
            });
            setQuotation(quotationRes.data.data.length);
        } catch (error) {
            console.error(error);
        }
    }
    fetchData();
}, []);
  const handleLogout = () => { 
    setLogoutModalOpen(true);
  };
  const handleLogoutConfirm = () => {
      localStorage.clear();
      setLogoutModalOpen(false);
      window.location.href = '/login';
  };
  const handleLogoutCancel = () => {
    setLogoutModalOpen(false);
  };
  return (
    <>
     <div className="bg-dark text-white rounded-br-full">
        <div className="container mb-3 flex justify-between py-3">
          <p className="text-2xl font-bold">TIMBERLAND</p>
          <button className="bg-light text-black mx-1 px-3 py-1" onClick={handleLogout}>
            LOG OUT
          </button>
        </div> 
      </div>
      <div className="container">
        <div className="bg-dark text-white rounded-md">
          <ul className="flex	align-middle	justify-around">
            <li>Quotation <p className="text-center">{quotation}</p></li>
            <li>Shop <p className="text-center">{shopCount}</p></li>
            <li>Architecture <p className="text-center">{architecCount}</p></li>
            <li>Carpenter <p className="text-center">{carpenterCount}</p></li>
          </ul>
        </div>
      </div>
       <Container>
        <Row>
         <Col md={6} sm={12}>
         <a href="/quotation">
            <div className="bg-zinc-600 md:m-10 sm:m-0 my-3 rounded-lg py-8 xl:px-44 lg:px-32 md:px-8 md:py-6 px-24 create">
              <div> <img src={require('../../Images/form-1.jpg')} alt="" className="w-40" />
                <p className="form border-1 px-4 py-2 font-bold bg-white rounded-md">Quotation</p>
                <div className="plus border-1 bg-white"><FaPlus className="ms-3 my-3  text-2xl" /></div>
              </div>
            </div>
         </a>
          </Col>
          <Col md={6} sm={12}>
            <a href="/Shopform">
            <div className="bg-zinc-600 md:m-10 sm:m-0 my-3 rounded-lg py-8 xl:px-44 lg:px-32 md:px-8 md:py-6 px-24 create">
              <div><img src={require('../../Images/shop-1.png')} alt="" className="w-40" /></div>
              <p className="form border-1 px-4 py-2 font-bold bg-white rounded-md">Shop</p>
              <div className="plus border-1 bg-white"><FaPlus className="ms-3 my-3 text-2xl" /></div>
            </div>
            </a>
          </Col>
        </Row>
        <Row>
          <Col md={6} sm={12}>
            <a href="/carpenterform">
            <div className="bg-zinc-600 md:m-10 my-3 sm:m-0  rounded-lg py-8 xl:px-44 lg:px-32 md:px-10 md:py-6 px-24 create">
              <div> <img src={require('../../Images/images.png')} alt="" className="w-40" /></div>
              <p className="form border-1 px-4 py-2 font-bold bg-white rounded-md">Carpenter</p>
              <div className="plus border-1 bg-white"><FaPlus className="ms-3 my-3 text-2xl" /></div>
            </div>
            </a>
          </Col>
          <Col md={6} sm={12}>
            <a href="/architecture">
            <div className="bg-zinc-600 md:m-10 sm:m-0 my-3 rounded-lg py-8 xl:px-44 lg:px-32 md:px-8 md:py-6 px-24 create">
              <div> <img src={require('../../Images/architecture.jpg')} alt="" className="w-40" /></div>
              <p className="form border-1 px-4 py-2 font-bold bg-white rounded-md">Architecture</p>
              <div className="plus border-1 bg-white"><FaPlus className="ms-3 my-3 text-2xl" /></div>
            </div>
            </a>
          </Col>
        </Row>
      </Container>
      {isLogoutModalOpen && (
        <div className="logout-modal">
          <div className="modal-content">
            <p>Are you sure you want to log out?</p>
            <div className="modal-buttons">
              <button onClick={handleLogoutConfirm}>OK</button>
              <button onClick={handleLogoutCancel}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
export default Dashboard