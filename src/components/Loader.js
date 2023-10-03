import React from 'react'
import { TypeAnimation } from 'react-type-animation'
import icon from "../assets/tullab-icon.jpg"

function Loader(props) {
    return (
        <div className="absolute flex-col flex items-center min-w-[320px]" style={{ left: "40%", top: "40%" }}>
            <img alt="" src={icon} style={{ width: '100px', height: '100px', display: 'flex', borderRadius: '10px' }} />
            <TypeAnimation
                sequence={['Tullab Al Haramayn', 120, 'Tullab', 120, 'Tullab Al Haramayn', 120]}
                style={{ fontSize: '2em', color: '#fff' }}
                repeat={Infinity}
            />
        </div>
    )
}

export default Loader