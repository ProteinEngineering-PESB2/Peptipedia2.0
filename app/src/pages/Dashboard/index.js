import './index.css'

import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AiFillDashboard } from "@react-icons/all-files/ai/AiFillDashboard";
import { FaUserAlt } from "@react-icons/all-files/fa/FaUserAlt";
import { FiAlignLeft } from "@react-icons/all-files/fi/FiAlignLeft";

import { AppContext } from '../../context/AppContext'

import Blast from '../../components/Dashboard/Blast';
import MSA from '../../components/Dashboard/MSA';

const Dashboard = () => {
  const [toggleButton, setToggleButton] = useState(false)
  const [section, setSection] = useState("")
  const [showArrow, setShowArrow] = useState(false)

  const navigate = useNavigate()

  const { state } = useContext(AppContext)

  const { alignmentType } = state

  useEffect(() => {
    if (alignmentType === "") {
      navigate("/alignment")
    } else if (alignmentType === "blast") {
      setSection("blast")
    } else if (alignmentType === "msa") {
      setSection("msa")
    }
  }, [])

  const handleToggleButton = () => {
    setToggleButton(!toggleButton)
    setShowArrow(true)
  }

  const onChangeSection = (section) => {
    setSection(section)
    setShowArrow(false)
  }

  return (
    <div className={toggleButton ? "d-flex toggled" : "d-flex"} id="wrapper">
      <div className="bg-white" id="sidebar-wrapper">
        <div className="sidebar-heading text-center py-3 fs-4 fw-bold text-uppercase border-bottom">
          <div className="d-flex">
            <i className="primary-text me-2 d-flex justify-content-center align-items-center">
              <AiFillDashboard />
            </i>
            <span className="primary-text">Codersbite</span>
          </div>
        </div>

        {alignmentType === "msa" && (
          <div className="list-group list-group-flush">
            <a
              onClick={() => onChangeSection("msa")}
              className="d-flex align-items-center sidebar-item list-group-item list-group-item-action bg-transparent second-text"
            >
              <i className={section === "msa" ? "me-2 active d-flex" : "me-2 d-flex"}>
                <AiFillDashboard />
              </i>
              <span className={section === "msa" ? "me-2 active" : "me-2"}>MSA</span>
            </a>
            <a
              onClick={() => onChangeSection("prueba")}
              className="d-flex align-items-center sidebar-item list-group-item list-group-item-action bg-transparent second-text"
            >
              <i className={section === "prueba" ? "me-2 active d-flex" : "me-2 d-flex"}>
                <AiFillDashboard />
              </i>
              <span className={section === "prueba" ? "me-2 active" : "me-2"}>Prueba</span>
            </a>
          </div>
        )}
        {alignmentType === "blast" && (
          <div className="list-group list-group-flush">
            <a
              onClick={() => onChangeSection("blast")}
              className="d-flex align-items-center sidebar-item list-group-item list-group-item-action bg-transparent second-text"
            >
              <i className={section === "blast" ? "me-2 active d-flex" : "me-2 d-flex"}>
                <AiFillDashboard />
              </i>
              <span className={section === "blast" ? "me-2 active" : "me-2"}>Blast</span>
            </a>
            <a
              onClick={() => onChangeSection("prueba")}
              className="d-flex align-items-center sidebar-item list-group-item list-group-item-action bg-transparent second-text"
            >
              <i className={section === "prueba" ? "me-2 active d-flex" : "me-2 d-flex"}>
                <AiFillDashboard />
              </i>
              <span className={section === "prueba" ? "me-2 active" : "me-2"}>Prueba</span>
            </a>
          </div>
        )}
        
      </div>

      <div id="page-content-wrapper" className="second-bg">
        <nav className="navbar navbar-expand-lg navbar-light bg-transparent py-4 px-4">
          <div className="d-flex align-items-center">
              <i
                onClick={handleToggleButton}
                className="toggle-icon fs-4 me-3 fw-bold" 
                id="menu-toggle"
              >
                <FiAlignLeft/>
              </i>
          </div>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
              aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                  <li className="nav-item dropdown">
                      <a className="d-flex align-items-center nav-link dropdown-toggle second-text fw-bold" href="#" id="navbarDropdown"
                          role="button" data-bs-toggle="dropdown" aria-expanded="false">
                          <i className="me-2"><FaUserAlt/></i><span>Claudio Guevara</span>
                      </a>
                      <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                          <li><a className="dropdown-item" href="#">Profile</a></li>
                          <li><a className="dropdown-item" href="#">Settings</a></li>
                          <li><a className="dropdown-item" href="#">Logout</a></li>
                      </ul>
                  </li>
              </ul>
          </div>
        </nav>

        <div className="container-fluid px-4">
          {section === "msa" && (
            <MSA showArrow={showArrow} setShowArrow={setShowArrow}/>
          )}
          {section === "blast" && <Blast/>}
        </div>
      </div>
    </div>
  )
}

export default Dashboard