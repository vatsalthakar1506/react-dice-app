import React  from "react";


const Header = ()=>{

    function handleMouseHover(){
        console.log("I was Hovered");
    }

    return (
        <div>   
            <header>
                <img onMouseOver = {handleMouseHover} src="https://e7.pngegg.com/pngimages/8/13/png-clipart-computer-icons-chef-chefs-thumbnail.png" width={100} alt="" />
                 <h1>Chef Claude</h1>
            </header>
        </div>
    );
}
export default React.memo(Header)