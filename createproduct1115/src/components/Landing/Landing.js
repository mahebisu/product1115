import { Button, Container, Stack,Card,CardContent,CardMedia,Typography} from '@mui/material'
import React,{useEffect} from 'react'
import ResponsiveAppBarLanding from '../Appbar/ResponsiveAppBarLanding'
import { Link } from "react-router-dom";

// ログイン処理
    import { db, auth } from "../../firebase";
    import { onAuthStateChanged, signOut } from "firebase/auth";
    import { useNavigate } from "react-router-dom";


// 写真をインポート
import pic1 from "./topmain.jpg"
import pic2 from "./toppic2.jpg"
import pic3 from "./toppic3.jpg"
import pic4 from "./toppic4.jpg"

const Landing = () => {

    // navigateを宣言
        let navigate = useNavigate();

    return (
        
        <div style={{backgroundColor:"#e9fef7"}}>

            {/* ResponsiveAppBarを挿入 */}
            <ResponsiveAppBarLanding />


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
                    友達の不動産の相談を紹介しよう
                </h1>

                {/* 登録ボタン */}
                <Button variant="contained"
                    // successは緑っぽい色
                    color="success"
                    size="medium"
                    sx={{Width:300,
                        textAlign:"center"
                    }}
                >
                    <Link to="/UserReg"
                        style={{textDecoration:"none",
                        color:"#e9fef7",
                        fontSize:"2vw"
                    }}>
                        新規登録開始
                    </Link>
                </Button>
                
            </Stack>

        </div>

        <Stack spacing={2}>

            <h1 style={{textAlign:"center",
                fontSize:"2vw"
            }}>
                ナコフドサンはあなたの周りのご家族が所有している不動産の相談を
            </h1>

            <h1 style={{textAlign:"center",
                fontSize:"2vw"
            }}>
                不動産会社・建築業者に紹介して報酬をもらうサービスです 
            </h1>

            <h1 style={{textAlign:"center",
                fontSize:"2vw"
            }}>
                ～報酬は各企業からのオークション制～
            </h1>

            <h1 style={{textAlign:"center",
                fontSize:"2vw"
            }}>
                実績や報酬から最適な紹介先を選ぼう            
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
            marginBottom:"1000",
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
                        あなたの周りやお客さんの中に不動産を持っている人はいませんか　美容師、ネイリスト、パーソナルトレーナー、保険営業員、介護士、その他日々お客さんの幸せのために努力しているあなたが主人公です
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
                        不動産を売却する/建替える/リフォームする/貸出す/太陽光発電する、その他有効活用など紹介先はいろいろ
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
                        紹介料はオークションで決定　お客さんにぴったりの紹介先を選んだら、紹介しよう
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
                    <Link to="/UserReg"
                        style={{textDecoration:"none",
                        color:"#e9fef7",
                        fontSize:"2vw"
                    }}>
                        新規登録開始
                    </Link>
            </Button>

        </Stack>

        <footer style={{pt:10,textAlign:"center"}}>
            <p  sx={{pt:"5"}}>
                    <Link to="/LandingGyosha"
                        style={{textDecoration:"none",
                        color:"#002c1b",
                        fontSize:"1vw"
                    }}>
                        不動産会社・建設会社の方はこちら
                    </Link>
            </p>
        </footer>

    </div>

    )
}

export default Landing
