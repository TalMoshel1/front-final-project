

// https://www.instagram.com/stories/campus.dora.arts/2927812705440679670/ 
//

import { ListStyle } from "./ListStyle";

export function Navbar() { // everystory gets different id in params 
    return <nav style={{position: 'fixed' ,top: '0px',width: '100%',display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', margin: 'auto', backgroundColor: 'white'}}>
        <a href='feed' style={{textDecoration: 'none'}}>INSTAGRAM</a>
        <input type='text' placeholder="search" style={{'borderRadius':'5px'}}/>
        <ul style={{listStyleType: 'none', display: 'flex', justifyContent:'space-between', gap: '3em'}}>
            <li>
                bla
            </li>
            <li>
                bla
            </li>
            <li>
                bla
            </li>
            <li>
                bla
            </li>
            <li>
                bla
            </li>
        </ul>
    </nav>
}

