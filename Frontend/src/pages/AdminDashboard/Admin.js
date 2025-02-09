import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome,faAddressBook,faClipboardList,faChartBar} from '@fortawesome/free-solid-svg-icons';
import './Admin.scss'
const AdminDashboard = () => {
  return (
    <div className='adminDashboard'>
      <aside>
        <h2>Renova Architects</h2>
        <nav>
          <ul>
           
          <li>
              <Link to="/">
                < FontAwesomeIcon icon={faHome}/> Retour au site
              </Link>
            </li>
            <li>
              <Link to="/admin">
              <FontAwesomeIcon icon={faChartBar}/>
               Dashboard
              </Link>
            </li>
            <li>
              <Link to="/admin/contacts">
                <FontAwesomeIcon  icon={faAddressBook}/>
                Contacts
              </Link>
            </li>
            <li>
              <Link to="/admin/devis">
                <FontAwesomeIcon icon={faClipboardList}/>
                Devis
              </Link>
            </li>
            
          </ul>
        </nav>
      </aside>
      <main>
        <Outlet /> 
      </main>
    </div>
  );
};

export default AdminDashboard;
