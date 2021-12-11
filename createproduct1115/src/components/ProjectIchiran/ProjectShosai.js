import React,{useState} from 'react'
import { Button, Container, Stack, TextField,Box,Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import ResponsiveAppBarGyosha from '../Appbar/ResponsiveAppBarGyosha'
import { Link } from "react-router-dom";
import pic2 from "./mappic2.png"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

// radioボタンをつくるために導入
    import Radio from '@mui/material/Radio';
    import RadioGroup from '@mui/material/RadioGroup';
    import FormControlLabel from '@mui/material/FormControlLabel';
    import FormControl from '@mui/material/FormControl';
    import FormLabel from '@mui/material/FormLabel';
import { width } from '@mui/system';

const ProjectShosai = () => {

    // useformはreact-hook-formのコンポーネント、分割代入してる
        const {
            register,
            handleSubmit,
            formState: { errors, isValid, isDirty, isSubmitting, touchedFields, submitCount },
            getValues,
            watch,
            reset
        } = useForm();

    // フォーム送信時の処理
    const onSubmit = (data) => {
        // バリデーションチェックOK！なときに行う処理を追加
        console.log("isDirty>",isDirty);
        console.log("isValid>",isValid);
        console.log(submitCount);

        // getValuesの値がエラーなく入れられているかのチェック、inValid?

        
        // getValuesの値をそれぞれfirebaseに送る工程



        // 次のページに遷移する



    };

    const [Bukkenshurui, setBukkenshurui] = useState("Tochi");
    // radioボタンの値を取得する関数の定義
        const radioChange = (event) => {
            setBukkenshurui(event.target.value);
            console.log(event.target.value)
        };

    // formで入力した値をgetValuesで取得する
        const getValuetachi = getValues();
        console.log(getValuetachi);

    // errorsを表示させる
        console.log("errors>",errors);

    const cardcontain = (
        <React.Fragment>
            <CardContent>
                <Typography variant="h7" color="text.secondary" gutterBottom>
                    {}
                </Typography>
                <Typography variant="h6" component="div">
                    {}
                </Typography>
            </CardContent>
        </React.Fragment>
    );

    return (

        <div>

            {/* ResponsiveAppBarを挿入 */}
            <ResponsiveAppBarGyosha />

            <h1 style={{textAlign:"center"}}>案件情報詳細</h1>

            {/* エラーチェックの表示 */}
            {/* {errors && <div>{errors}</div>} */}

            <form onSubmit={handleSubmit(onSubmit)}>

                <Container  sx={{ pt: 5,maxWidth:"100%"}}>

                    <Stack spacing={2}>

                        {/* ここには後でGooglemapsを入れる */}
                        <Box sx={{
                            backgroundImage: `url(${pic2})`,
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "100% auto",
                            width:"100%",
                            height:"500px"
                        }}/>

                        <Stack direction="row" spacing={5} sx={{justifyContent:"space-around"}}>

                            <Stack spacing={2}>
                                <Card variant="outlined" sx={{width:500}}>
                                    <CardContent>
                                        <Typography variant="h7" color="text.secondary" gutterBottom>
                                            物件の所在地
                                        </Typography>
                                        <Typography variant="h6" component="div">
                                            東京都文京区千石二丁目６－２２
                                        </Typography>
                                    </CardContent>
                                </Card>
                                <Card variant="outlined">
                                    <CardContent>
                                        <Typography variant="h7" color="text.secondary" gutterBottom>
                                            物件の種類
                                        </Typography>
                                        <Typography variant="h6" component="div">
                                            建物＋土地
                                        </Typography>
                                    </CardContent>
                                </Card>
                                <Card variant="outlined">
                                    <CardContent>
                                        <Typography variant="h7" color="text.secondary" gutterBottom>
                                            希望の有効活用
                                        </Typography>
                                        <Typography variant="h6" component="div">
                                            売却/貸出/その他有効活用
                                        </Typography>
                                    </CardContent>
                                </Card>
                                <Card variant="outlined">
                                    <CardContent>
                                        <Typography variant="h7" color="text.secondary" gutterBottom>
                                            被紹介者氏名
                                        </Typography>
                                        <Typography variant="h6" component="div">
                                            高橋花子
                                        </Typography>
                                    </CardContent>
                                </Card>
                                <Card variant="outlined">
                                    <CardContent>
                                        <Typography variant="h7" color="text.secondary" gutterBottom>
                                            紹介者氏名
                                        </Typography>
                                        <Typography variant="h6" component="div">
                                            山田花子
                                        </Typography>
                                    </CardContent>
                                </Card>

                            </Stack>

                            <Stack spacing={2}>
                                    {/* overflowWrap: "break-word"で文章を自動で折り返す */}
                                <Card variant="outlined" sx={{width:500,overflowWrap: "break-word"}}>
                                    <CardContent>
                                        <Typography variant="h7" color="text.secondary" gutterBottom>
                                            物件の大きさ/古さ/検討動機など知っていること
                                        </Typography>
                                        <Typography variant="h6" component="div">
                                            xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                                        </Typography>
                                    </CardContent>
                                </Card>
                                <Card variant="outlined">
                                    <CardContent>
                                        <Typography variant="h7" color="text.secondary" gutterBottom>
                                            希望の紹介料
                                        </Typography>
                                        <Typography variant="h6" component="div">
                                            40万円
                                        </Typography>
                                    </CardContent>
                                </Card>

                            </Stack>                   

                        </Stack>

                    </Stack>


                    
                    <hr/>

                    <Stack direction="row" spacing={2} sx={{justifyContent:"space-around"}}>
                        <Button
                            onClick={onSubmit}
                            color="warning"
                            variant="contained"
                            size="large"
                            type="submit"
                            fullWidth
                            style={{margintop:500,width:300}}
                        >
                            <Link to="/ProjectIchiran"
                                style={{textDecoration:"none",
                                color:"#e9fef7",
                                fontSize:"2vw"
                            }}>
                                質問する
                            </Link>
                        </Button>

                        <Button
                            onClick={onSubmit}
                            color="warning"
                            variant="contained"
                            size="large"
                            type="submit"
                            fullWidth
                            style={{margintop:500,width:300}}
                        >
                            <Link to="/ProjectIchiran"
                                style={{textDecoration:"none",
                                color:"#e9fef7",
                                fontSize:"2vw"
                            }}>
                                紹介料入札
                            </Link>
                        </Button>
                    </Stack>

                </Container>
            </form>

        </div>
    )
}

export default ProjectShosai
