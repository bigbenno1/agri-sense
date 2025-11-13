

export default function Footer() {




    return (
        <>
            <div style={{backgroundColor:"#537E72",
                borderStyle:"groove none groove none",
                width:"100%",
                color: 'white',
                textAlign: 'center',
                paddingTop: '1vh'
                }}>
                    <h1 style={{fontSize: "1.75rem",
                    fontWeight: "bold"
                    }}> About Us </h1>
                <div style={{
                    display:"flex",
                    justifyContent:"space-around",
                    paddingTop: "0vh"
                }}>
                   
                   {/* Project: Code section */}
                    <div style={{flexGrow: "1"}}>
                        <h3 style={{fontSize: "1.5rem", fontWeight:"bold"}}> Project: Code </h3>

                        <img src="/project-code-logo.png" 
                        alt="Project: Code logo" 
                        width="100"
                        style={{margin:"0 auto", paddingTop:"1vh", paddingBottom:"1vh"}}></img>

                        <p style={{color:"#CDDECB", fontWeight:"bold"}}> Website:</p>
                        <a href="https://projectcodeuiuc.org/" 
                        style={{textDecoration:"underline", 
                        color:"#CDDECB"}}> https://projectcodeuiuc.org/</a>

                        <p style={{color:"#CDDECB", fontWeight:"bold"}}> Email: </p>
                        <p style={{color:"#CDDECB"}}> project.code.uiuc@gmail.com </p>
                    </div>

                    {/* Agri-Sense section */}
                    <div style={{flexGrow: "3"}}>
                        <h3 style={{fontSize: "1.5rem", fontWeight: "bold"}}> &nbsp;&nbsp;&nbsp;&nbsp;Agri-Sense </h3>

                        <div style={{
                        display:"flex",
                        justifyContent:"space-around",
                        paddingTop: "0vh",
                        color: "#CDDECB",
                        lineHeight: "1.2"
                        }}>

                            <div>
                                <p style={{fontWeight: "bold"}}>Frontend Team</p>
                                <p> Sophie Liu </p>
                                <p> Ben Estacio </p>
                                <p> Ojun Kwon </p>
                                <p> Nirali Kumar </p>
                                <p> Manhitha Mamillapalli</p>
                                <p> Ovee Muley </p>
                                <p> Tyson Woerdehoff</p>
                            </div>

                            <div>
                                <img src="/agri-sense-logo.png" 
                                alt="Agri-Sense logo" 
                                width="100"
                                style={{margin:"0 auto", paddingTop:"1vh", paddingBottom:"1vh"}}></img>
                                <p style={{fontWeight: "bold"}}>Project Manager</p>
                                <p> James Kim </p>
                                <p> (yk41@illinois.edu) </p>
                            </div>

                            <div>
                                <p style={{fontWeight: "bold"}}>Backend Team</p>
                                <p> Scott Gilbert </p>
                                <p> Lakshya Agarwal </p>
                                <p> David Dai </p>
                                <p> Mehull Girdhar </p>
                                <p> Shrey Patel </p>
                                <p> Ishani Sahu </p>
                                <p> Blake Salbilla </p>
                                <p> Rohan Shah </p>
                                <p> Jason Xiao </p>
                                <p> Alan Xie </p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
