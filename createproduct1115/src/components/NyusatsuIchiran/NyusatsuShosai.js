import React from 'react'
import { Button, Container, Stack, TextField,Typography } from "@mui/material";
import ResponsiveAppBar from '../Appbar/ResponsiveAppBar'
import { Link } from "react-router-dom";
import Nyusatsuchu from './Nyusatsuchu';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import { CardActionArea } from '@mui/material';
import { useNavigate } from "react-router-dom";
import Divider from '@mui/material/Divider';

const NyusatsuShosai = () => {






    

    const cardcontain1 = (
        <React.Fragment>
            <CardActionArea>
                <CardContent>
                    <Stack spacing={1}>
                        <Typography variant="h6" color="text.success">2月17日 12:00</Typography>
                        <Typography variant="h6" color="text.success">
                            xx不動産の山田春子と申します。この度は情報をご提供いただく機会をいただきまして、ありがとうございます。

                            本案件に関しては40万円をご提案させていただきます。どうぞよろしくお願いします。
                        </Typography>
                    </Stack>
                </CardContent>
            </CardActionArea>
        </React.Fragment>
    ); 

    const cardcontain2 = (
        <React.Fragment>
            <CardActionArea>
                <CardContent>
                    <Stack direction="row" spacing={1} divider={<Divider orientation="vertical" flexItem />} sx={{justifyContent:"space-between"}}>
                        <Typography variant="h6" color="text.success">紹介料入札額</Typography>
                        <Typography variant="h6" color="text.success">40万円</Typography>
                    </Stack>
                </CardContent>
            </CardActionArea>
        </React.Fragment>
    ); 

    

    return (

        <div>

            {/* ResponsiveAppBarを挿入 */}
            <ResponsiveAppBar />

            <Stack spacing={3} sx={{alignItems:"center",pt:3,margin:"0 auto"}} >

                <Stack  spacing={1}>
                    <Typography variant="h6" color="text.success">山田春子</Typography>
                    <Typography variant="h6" color="text.success">株式会社XXXX不動産</Typography>
                </Stack>

                <Card variant="outlined" sx={{width:375}}>
                   {cardcontain1}
                </Card>
                <Card variant="outlined" sx={{width:375}}>
                   {cardcontain2}
                </Card>

                <Stack  direction="row" spacing={3}>
                    <Button variant="contained"
                        // successは緑っぽい色
                        color="success"
                        size="large"
                        sx={{margin:"0 auto 1000",
                            maxWidth:"300",
                        }}
                    >
                        <Link to="/NyusatsuIchiran"
                            style={{textDecoration:"none",
                            color:"#e9fef7",
                            fontSize:"1vw"
                        }}>
                            入札一覧に戻る
                        </Link>
                    </Button>

                    <Button variant="contained"
                        // successは緑っぽい色
                        color="success"
                        size="large"
                        sx={{margin:"0 auto 1000",
                            maxWidth:"300",
                        }}
                    >
                        <Link to="/NyusatsuIchiran"
                            style={{textDecoration:"none",
                            color:"#e9fef7",
                            fontSize:"1vw"
                        }}>
                            紹介する
                        </Link>
                    </Button>


                </Stack>


                
            </Stack>



            <Typography variant="h4" color="text.success"
                sx={{textAlign:"center",pt:20}}
            >
                入札詳細画面
            </Typography>



        </div>
    )
}

export default NyusatsuShosai
