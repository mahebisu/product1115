import { Button, Container, Stack,Card,CardContent,CardMedia,Typography} from '@mui/material'
import React from 'react'
import ResponsiveAppBarGyosha from '../Appbar/ResponsiveAppBarGyosha'
import { Link } from "react-router-dom";
// 写真をインポート
import pic1 from "./topmain.jpg"
import pic2 from "./toppic2.jpg"
import pic3 from "./toppic3.jpg"
import pic4 from "./toppic4.jpg"

const LandingGyosha = () => {


    return (
        
        <div style={{backgroundColor:"#00c899"}}>

            {/* ResponsiveAppBarを挿入 */}
            <ResponsiveAppBarGyosha />

            <div style={{backgroundImage: `url(${pic1})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "100% auto",
                width:"100%",
                height:"46.5vw",
                display:"flex",
                justifyContent:"center",
                alignItems:"center"
            }}>

            <Stack spacing={0}
                sx={{justifyContent:"center",
                alignItems: "center"
            }}
            >

                <h1 style={{textAlign:"center",
                    color:"#00c899",
                    fontSize:"4vw"
                }}>
                    地主のお客様を自分だけに紹介してもらおう 
                </h1>

                {/* 登録ボタン */}
                <Button variant="contained"
                    // successは緑っぽい色
                    color="success"
                    size="large"
                    sx={{Width:300,
                        textAlign:"center"
                    }}
                >
                    <Link to="/GyoshaReg"
                        style={{textDecoration:"none",
                        color:"#e9fef7",
                        fontSize:"2vw"
                    }}>
                        業者登録開始
                    </Link>
                </Button>
                
            </Stack>

        </div>

        <Stack spacing={2}>

            <h1 style={{textAlign:"center",
                fontSize:"2vw"
            }}>
                ナコフドサンは地主家族の不動産の相談を受けている人から 
            </h1>

            <h1 style={{textAlign:"center",
                fontSize:"2vw"
            }}>
                お客様を紹介してもらえるサービスです
            </h1>

            <h1 style={{textAlign:"center",
                fontSize:"2vw"
            }}>
                ～買取・建替え・リフォーム・賃貸、提案はいろいろ～
            </h1>

            <h1 style={{textAlign:"center",
                fontSize:"2vw"
            }}>
                市場に出回らない見込客を誰よりも早く検討しよう            
            </h1>

            <h1 style={{textAlign:"center",
                fontSize:"1.5vw",
                paddingBottom:50

            }}>
                現在サービス事前登録募集中            
            </h1>


        </Stack>

        <Stack spacing={2}
            sx={{display:"flex",
            justifyContent:"center",
            alignItems:"center",
            marginBottom:"1000"
            }}
        >

            <Card sx={{ maxWidth: "50vw" }}>
                <CardMedia
                    component="img"
                    height="66.7%"
                    image={pic2}
                    alt="pic2"
                />
                <CardContent>
                    <Typography sx={{fontSize:"2vw"}} color="text.secondary">
                        美容師、ネイリスト、パーソナルトレーナー、保険営業員、介護士、その他日々お客さんとの接点の多い「仲人」からお客さんを紹介してもらおう
                    </Typography>
                </CardContent>
            </Card>

            <Card sx={{ maxWidth: "50vw" }}>
                <CardMedia
                    component="img"
                    height="66.7%"
                    image={pic3}
                    alt="pic3"
                />
                <CardContent>
                    <Typography sx={{fontSize:"2vw"}} color="text.secondary">
                        不動産を売却する/建替える/リフォームする/貸出す/太陽光発電する、その他有効活用などお客様の検討候補はいろいろ
                    </Typography>
                </CardContent>
            </Card>

            <Card sx={{ maxWidth: "50vw" }}>
                <CardMedia
                    component="img"
                    height="66.7%"
                    image={pic4}
                    alt="pic4"
                />
                <CardContent>
                    <Typography sx={{fontSize:"2vw"}} color="text.secondary">
                        自分の欲しい案件をみつけたら、紹介してもらえるように紹介料を入札しよう
                    </Typography>
                </CardContent>
            </Card>

            <Button variant="contained"
                // successは緑っぽい色
                color="success"
                size="large"
                sx={{margin:"0 auto 1000",
                    maxWidth:"300",
                }}
            >
                    <Link to="/GyoshaReg"
                        style={{textDecoration:"none",
                        color:"#e9fef7",
                        fontSize:"2vw"
                    }}>
                        業者登録開始
                    </Link>
            </Button>

        </Stack>

        <footer style={{pt:10,textAlign:"center"}}>
            <p  sx={{pt:"5"}}>
                    <Link to="/"
                        style={{textDecoration:"none",
                        color:"#002c1b",
                        fontSize:"1vw"
                    }}>
                        お友達を紹介していただける方はこちら
                    </Link>
            </p>
        </footer>

    </div>

    )
}

export default LandingGyosha
