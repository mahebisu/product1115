import { Container } from '@mui/material'
import React from 'react'
import ResponsiveAppBar from './ResponsiveAppBar'
import pic1 from "./top-main.jpg"

const Landing = () => {


    return (
        <div>
            {/* ResponsiveAppBarを挿入 */}
            <ResponsiveAppBar />
            <div style={{backgroundImage: `url(${pic1})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "100% auto",
                width:"100%",
                height:"57.4vw",
                display:"flex",
                justifyContent:"center",
                alignItems:"center"
            }}>
                <p style={{textAlign:"center"
                }}>
                    友達を売ろう 
                </p>
            </div>


            <Container style={{backgroundImage: `url(${pic1})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "100% auto",
                maxwidth:"md",
                height:"100%",
                display:"flex",
                justifyContent:"center",
                alignItems:"center"
            }}>
                <p style={{textAlign:"center"
                }}>
                    友達を売ろう 
                </p>
            </Container>
        </div>
    )
}

export default Landing
