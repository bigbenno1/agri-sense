

export default function Header() {
    return (
        <>
        
        <div style={{
            backgroundColor: "#CDDECB", 
            borderStyle: "groove none none none", 
            boxShadow: "0px 1px 5px",
            padding:"0px", 
            width:"100%",
            height:"8vh",
            display:"flex",
            alignItems:"center",
            justifyContent:"center",
            position: "fixed"}}>

            {/* Font/icon links */}
            <link href="https://fonts.googleapis.com/css?family=Offside" rel="stylesheet"></link>
            <link href="https://fonts.googleapis.com/css?family=Inconsolata" rel="stylesheet"></link>
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"></link>
            
            <header>
                {/* Title */}
                <div style={{
                    fontFamily: 'Offside, sans-serif', 
                    textAlign: 'Center',
                    color:"#537E72",
                    textShadow:"0px 2.5px white,  -.5px 2.5px white, .5px 2.5px white, -.5px 0px white, .5px 0px white, 0px 0px 3px white",
                    paddingTop: "0px",
                    fontSize: "2.5vh"}}>
                    <h1>🌱Agri-Sense🌱</h1>
                    
                
                </div>
                
                
            </header>
        </div>
        </>
    )
}