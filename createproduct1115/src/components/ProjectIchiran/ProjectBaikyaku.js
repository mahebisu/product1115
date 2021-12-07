import React from 'react'
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import { CardActionArea } from '@mui/material';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";




const cardcontain = (
    <React.Fragment>
        <CardActionArea>
            <CardContent>
                <Stack spacing={1} style={{minWidth:375,maxWidth:800}}>
                        <Typography variant="h7" color="text.success">建物＋土地</Typography>
                        <Typography variant="h6" color="text.success">東京都文京区</Typography>
                        <Typography variant="h7" color="text.success">千石二丁目</Typography>

                        <Stack direction="row" spacing={1} sx={{justifyContent:"space-between"}}>
                            <Typography variant="h7" color="text.success">希望の紹介料</Typography>
                            <Typography variant="h6" color="text.success">40万円</Typography>
                        </Stack>

                        <Stack direction="row" spacing={1} sx={{justifyContent:"space-between"}}>

                            <Typography variant="h7" color="text.success">2021年2月17日</Typography>

                            <Button variant="contained"
                                // successは緑っぽい色
                                color="success"
                                sx={{width:170,
                                    margin:"auto"
                                }}
                            >
                                <Link to="/ProjectShosai"
                                    style={{textDecoration:"none",
                                    color:"#e9fef7",
                                    fontSize:"1vw"
                                }}>
                                    詳細確認(有料)＋
                                </Link>
                            </Button>
                        </Stack>

                </Stack>
            </CardContent>
        </CardActionArea>
    </React.Fragment>
); 



const Nyusatsuchu = (props) => {

    let navigate = useNavigate();

    const onClickCard = (props) =>{
        console.log("クリックしたよ");
        navigate("/ProjectShosai")
    };
    

    return (
        <div>
            <Stack spacing={2} sx={{alignItems:"center"}}>
                <Card variant="outlined" sx={{maxWidth:"375"}} onClick={onClickCard}>
                   {cardcontain}
                </Card>
                <Card variant="outlined" sx={{maxWidth:"375"}} onClick={onClickCard}>
                   {cardcontain}
                </Card>
                <Card variant="outlined" sx={{maxWidth:"375"}} onClick={onClickCard}>
                   {cardcontain}
                </Card>
                <Card variant="outlined" sx={{maxWidth:"375"}} onClick={onClickCard}>
                   {cardcontain}
                </Card>
            </Stack>
        </div>
    )
}

export default Nyusatsuchu
