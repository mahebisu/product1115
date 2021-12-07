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
                <div style={{display:"flex",justifyContent:"space-between"}}>
                    <div>
                            
                    </div>
                    <div>
                        <Stack spacing={1}>
                            <Stack direction="row" spacing={1}>
                                <Typography variant="h6" color="text.success">山田春子</Typography>
                                <Typography variant="h6" color="text.success">/</Typography>
                                <Typography variant="h6" color="text.success">株式会社XXXX不動産</Typography>
                            </Stack>
                            <div>
                                <Typography variant="h6" color="text.success">先日はどうもありがとうございました・・・・・</Typography>
                            </div>

                        </Stack>

                    </div>
                    <div>
                        <Stack spacing={1}>
                            <div>
                                <Chip label="売却" />
                                <Chip label="40万円" variant="outlined" />
                            </div>
                            <div>
                                    <Typography variant="h7" color="text.success">２月１７日</Typography>
                            </div>
                        </Stack>
                    </div>
                </div>
            </CardContent>
        </CardActionArea>
    </React.Fragment>
); 



const Nyusatsuchu = (props) => {

    let navigate = useNavigate();

    const onClickCard = (props) =>{
        console.log("クリックしたよ");
        navigate("/NyusatsuShosai")
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
