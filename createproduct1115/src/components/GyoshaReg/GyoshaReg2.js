import { Button, Container, Stack,Card,CardContent,CardMedia,Typography,TextField } from '@mui/material'
import React,{useState,useEffect} from 'react'
import ResponsiveAppBarGyosha from '../Appbar/ResponsiveAppBarGyosha'
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

// radioボタンをつくるために導入
    import Radio from '@mui/material/Radio';
    import RadioGroup from '@mui/material/RadioGroup';
    import FormControlLabel from '@mui/material/FormControlLabel';
    import FormControl from '@mui/material/FormControl';
    import FormLabel from '@mui/material/FormLabel';

// ログイン機能（講義からコピペ）
    import { auth } from "../../firebase";
    import {
        onAuthStateChanged,
        createUserWithEmailAndPassword,
        signInWithEmailAndPassword,
    } from "firebase/auth";

// firebaseのデータベース関連
    import { collection, query, onSnapshot, addDoc, setDoc, serverTimestamp,orderBy,doc } from "firebase/firestore";
    import { db} from "../../firebase";


const GyoshaReg2 = () => {

    const [IsLogin, setIsLogin] = useState(false);
    const [EmailGyosha, setEmailGyosha] = useState("");
    const [PassGyosha, setPassGyosha] = useState("");
    const [GyoshaId, setGyoshaId] = useState("");
    console.log("GyoshaId>",GyoshaId);
    console.log("EmailGyosha>",EmailGyosha);

    // useStateでfirebaseから読み込む、dataをデフォルトで定義  
        const [data, setData] = useState(
            [{
                EmailGyosha: "",
                PassGyosha: "",
                NameGyosha: "",
                AddressGyosha: "",
                PhoneGyosha: "",
                GyoshaBirthYear: "",
                GyoshaBirthMonth: "",
                GyoshaBirthDay: "",
                NameGyoshaCompany: "",
                AddressGyoshaCompany: "",
                Gyoshashurui:"Baishuu",
                RegTimestamp:"",
                UpdateTimestamp: ""
            }]
        );

    // useEffectを使ってデータを取得する
        useEffect(() => {

            // まずログインしているuserのメールアドレスを取得する
            //Firebase ver9 compliant (modular)
                const unSub1 = onAuthStateChanged(auth, (user) => {

                    console.log("user情報>",user.email);
                    // authにuser情報があれば、IsLoginをtrue
                    user.email && setEmailGyosha(user.email);

                });

            return () => {
                unSub1();
            };
        }, []);

        // useEffectを使ってデータを取得する
        useEffect(() => {

            // 次にデータを取得して、メールアドレスに対応するdoc.idを取得する
            //Firebase ver9 compliant (modular)
                const q = query(collection(db, "gyosha"), orderBy("RegTimestamp", "desc"));
                const unSub2 = onSnapshot(q, (snapshot) => {

                    setData(
                        snapshot.docs.map((doc,index) => {

                            console.log(index,doc.data().EmailGyosha,EmailGyosha);

                            if(doc.data().EmailGyosha === EmailGyosha){
                                setGyoshaId(doc.id);
                                console.log("ログイン中のidをGyoshaIdにsetした",doc.id);
                            };

                            return ({id: doc.id,
                                EmailGyosha: doc.data().EmailGyosha,
                                PassGyosha: doc.data().PassGyosha,
                                NameGyosha: doc.data().NameGyosha,
                                AddressGyosha: doc.data().AddressGyosha,
                                PhoneGyosha: doc.data().PhoneGyosha,
                                GyoshaBirthYear: doc.data().GyoshaBirthYear,
                                GyoshaBirthMonth: doc.data().GyoshaBirthMonth,
                                GyoshaBirthDay: doc.data().GyoshaBirthDay,
                                NameGyoshaCompany: doc.data().NameGyoshaCompany,
                                AddressGyoshaCompany: doc.data().AddressGyoshaCompany,
                                Gyoshashurui:doc.data().Gyoshashurui,                
                                RegTimestamp: doc.data().RegTimestamp,
                                UpdateTimestamp: doc.data().UpdateTimestamp
                            })
                        })
                    );

                });

            return () => {
                unSub2();
            };
        }, [EmailGyosha]);




    // navigateを宣言
    let navigate = useNavigate();

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
    const onSubmit = () => {
        // バリデーションチェックで行う処理⇒今後対応
            console.log("isDirty>",isDirty);
            console.log("isValid>",isValid);
            console.log(submitCount);
            console.log("メールとパスは>",EmailGyosha,PassGyosha);
        // errorsを表示させる
            console.log("errors>",errors);

        // formで入力した値をgetValuesで取得する
            let getValuetachi = getValues();
            console.log("getValuetachi>",getValuetachi);

        // User登録のfunctionを定義
            async function CreateGyoshaFunction() {
                try {

                    //Firebase ver9 compliant
                    // firebaseのログイン中のuserデータにデータ追加する
                        setDoc(
                            doc(collection(db, "gyosha"), GyoshaId),
                         {
                            NameGyosha: getValuetachi.NameGyosha,
                            AddressGyosha: getValuetachi.AddressGyosha,
                            PhoneGyosha: getValuetachi.PhoneGyosha,
                            GyoshaBirthYear: getValuetachi.GyoshaBirthYear,
                            GyoshaBirthMonth: getValuetachi.GyoshaBirthMonth,
                            GyoshaBirthDay: getValuetachi.GyoshaBirthDay,
                            NameGyoshaCompany: getValuetachi.NameGyoshaCompany,
                            AddressGyoshaCompany: getValuetachi.AddressGyoshaCompany,
                            Gyoshashurui: Gyoshashurui,             
                            UpdateTimestamp: serverTimestamp()
                        },
                        { merge: true }
                        );

                    navigate("/ProjectIchiran");




                } catch (error) {
                    alert(error.message);
                }
            }

            CreateGyoshaFunction();

    };

    
    const [Gyoshashurui, setGyoshashurui] = useState("Baishuu");
    // radioボタンの値を取得する関数の定義
        const radioChange = (event) => {
            setGyoshashurui(event.target.value);
            console.log(event.target.value)
        };




    return (
        <div>

            {/* ResponsiveAppBarを挿入 */}
            <ResponsiveAppBarGyosha />

            <form onSubmit={handleSubmit(onSubmit)}>

                <Container maxWidth="md" sx={{ pt: 5 }}>

                    
                    <Stack spacing={5}>

                        <Typography variant="h4" color="text.success"
                            sx={{textAlign:"center"}}
                        >
                            エージェントプロフィール登録
                        </Typography>

                        <Typography variant="h7" color="text.success"
                            sx={{textAlign:"center"}}
                        >
                            業者登録はエージェントごとにする必要があります
                        </Typography>

                        <TextField
                            label="あなたの氏名"
                            type="text"
                            {...register("NameGyosha", {
                            required: true,
                            message: "氏名を入力してください"
                            })}
                            error={"NameGyosha" in errors}
                        />

                        <TextField
                            label="あなたの住所"
                            type="text"
                            {...register("AddressGyosha", {
                            required: true,
                            message: "あなたの住所を入力してください"
                            })}
                            error={"AddressGyosha" in errors}
                        />

                        <TextField
                            label="あなたの電話番号"
                            type="number"
                            {...register("PhoneGyosha", {
                                required: true,
                                maxLength: 11,
                                minLength: 11,
                                message: "電話番号を11桁で入力してください"
                            })}
                            error={"PhoneGyosha" in errors}
                        />

                        <div>
                            <Typography variant="h7" color="text.success">
                                あなたの生年月日
                            </Typography>

                            <div>
                                <TextField
                                    label="西暦〇年"
                                    type="number"
                                    {...register("GyoshaBirthYear", {
                                        required: true,
                                        maxLength: 4,
                                        minLength: 4,
                                        min: 2021,
                                        message: "あなたの誕生年を西暦で入力してください"
                                })}
                                />

                                <TextField
                                    label="〇月"
                                    type="number"
                                    {...register("GyoshaBirthMonth", {
                                        required: true,
                                        maxLength: 2,
                                        minLength: 1,
                                        min: 1,
                                        max: 12,
                                        message: "あなたの誕生月を数字で入力してください"
                                })}
                                />

                                <TextField
                                    label="〇日"
                                    type="number"
                                    {...register("GyoshaBirthDay", {
                                        required: true,
                                        maxLength: 2,
                                        minLength: 1,
                                        min: 1,
                                        max: 31,
                                        message: "あなたの誕生日を数字で入力してください"
                                })}
                                />

                            </div>
                        </div>

                        <TextField
                            label="所属する会社名"
                            type="text"
                            {...register("NameGyoshaCompany", {
                            required: true,
                            message: "所属する会社名を入力してください"
                            })}
                            error={"NameGyoshaCompany" in errors}
                        />

                        <TextField
                            label="会社の住所"
                            type="text"
                            {...register("AddressGyoshaCompany", {
                            required: true,
                            message: "会社の住所を入力してください"
                            })}
                            error={"AddressGyoshaCompany" in errors}
                        />

                        {/* 物件の種類を選択するラジオボタンをつくる */}
                        <FormControl component="fieldset">
                            <FormLabel component="legend">業者の種類</FormLabel>
                            <RadioGroup 
                                row aria-label="Gyoshashurui"
                                name="row-radio-buttons-group"
                                value={Gyoshashurui}
                                onChange={radioChange}
                            >
                                <FormControlLabel value="Baishuu" control={<Radio />} label="不動産買収業者" />
                                <FormControlLabel value="Reform" control={<Radio />} label="建築業者（建替え・リフォーム）" />
                                <FormControlLabel value="Rent" control={<Radio />} label="賃貸あっせん" />
                                <FormControlLabel value="Sonota" control={<Radio />} label="その他有効活用" />

                            </RadioGroup>
                        </FormControl>

                        <hr/>

                        <Button
                            onClick={onSubmit}
                            color="success"
                            variant="contained"
                            size="large"
                            type="submit"
                            fullWidth
                            style={{margintop:500}}
                        >
                            エージェントプロフィール登録
                        </Button>

                    </Stack>
                    

                </Container>

            </form>

            <section style={{
                display: 'flex',
                justifyContent: 'space-between,center',
                width: '95%',
                margin: 'auto'
            }}>
                {/* dataをmapで表示 */}
                {data.map((item,index) => (
                    // 多要素は１つのdiv等で囲う
                    <div key={index}>
                        <div>{index}</div>
                        <div>{item.id}</div>
                        <div>{item.EmailGyosha}</div>
                        <div>{item.PassGyosha}</div>
                        <div>{item.NameGyosha}</div>
                        <div>{item.AddressGyosha}</div>
                        <div>{item.PhoneGyosha}</div>
                        <div>{item.GyoshaBirthYear}</div>
                        <div>{item.GyoshaBirthMonth}</div>
                        <div>{item.GyoshaBirthDay}</div>
                    </div>
                ))}
            </section>

        </div>

    )
}

export default GyoshaReg2
