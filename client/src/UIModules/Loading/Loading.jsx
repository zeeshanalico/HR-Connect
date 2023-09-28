
import React from 'react'
import './style.css'

const Loading = () => {

    return (

        <div className='spinner-wrapper'>

            {/* <div className="spinner">
                <div className="bounce1"></div>
                <div className="bounce2"></div>
                <div className="bounce3"></div>
            </div> */}
           {/* <div className="lds-ring"><div></div><div></div><div></div><div></div></div> */}
           <div class="sbl-circ-path"></div>
        </div>

    );

}

export default Loading;
