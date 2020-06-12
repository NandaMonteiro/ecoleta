import React from 'react';
import {Link} from 'react-router-dom';
import {FiCheckCircle } from 'react-icons/fi'

import './styles.css'


const Success = () =>{
    return(
        <div id="page-success">
            <main>
            <Link to="/">
                <span>
                    <FiCheckCircle className="icon"/>
                </span>
            </Link>

            <div>
                <h1 className="text">Ponto de coleta cadastrado!</h1>
            </div>
            </main>
        </div>
    );
};

export default Success;