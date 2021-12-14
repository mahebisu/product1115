import React,{useState,useEffect} from 'react'
import { Button, Container, Stack,Card,CardContent,CardMedia,Typography,TextField } from '@mui/material'
import ResponsiveAppBar from '../Appbar/ResponsiveAppBar'
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

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

const UserReg2 = () => {

    const [IsLogin, setIsLogin] = useState(false);
    const [EmailNakoudo, setEmailNakoudo] = useState("");
    const [PassNakoudo, setPassNakoudo] = useState("");
    const [NakoudoId, setNakoudoId] = useState("");
    console.log("NakoudoId>",NakoudoId);
    console.log("EmailNakoudo>",EmailNakoudo);

    //   ここがログインできてるかどうか処理
        useEffect(() => {
            //Firebase ver9 compliant (modular)
            const unSub = onAuthStateChanged(auth, (user) => {
                console.log("user情報>",user.email);
                // authにuser情報があれば、IsLoginをtrue
                user.email && setEmailNakoudo(user.email);
                });
            return () => unSub();
        });


    // useStateでfirebaseから読み込む、dataをデフォルトで定義  
        const [data, setData] = useState(
            [{
                id:"",
                EmailNakoudo: "",
                PassNakoudo: "",
                NameNakoudo: "",
                AddressNakoudo: "",
                PhoneNakoudo: "",
                NakoudoBirthYear: "",
                NakoudoBirthMonth: "",
                NakoudoBirthDay: "",
                RegTimestamp:"",
                UpdateTimestamp: ""
            }]
        );

    // useEffectを使ってデータを取得する
        useEffect(() => {

            // まずログインしているuserのメールアドレスを取得する
            //Firebase ver9 compliant (modular)
                const unSub1 = onAuthStateChanged(auth, (user) => {

                    new Promise((resolve) => {//Promise型を返す

                        function procedure() {

                            console.log("user情報>",user.email);
                            // authにuser情報があれば、IsLoginをtrue
                            user.email && setEmailNakoudo(user.email);
                            resolve();
                            
                        }
                    
                        setTimeout(procedure, 1000);
                    
                    });

                });

            // 次にデータを取得して、メールアドレスに対応するdoc.idを取得する
            //Firebase ver9 compliant (modular)
                const q = query(collection(db, "user"), orderBy("RegTimestamp", "desc"));
                const unSub2 = onSnapshot(q, (snapshot) => {

                    setData(
                        snapshot.docs.map((doc,index) => {

                            console.log(index,doc.data().EmailNakoudo,EmailNakoudo);

                            if(doc.data().EmailNakoudo === EmailNakoudo){
                                setNakoudoId(doc.id);
                                console.log("ログイン中のidをNakoudoIdにsetした",doc.id);
                            };

                            return ({id: doc.id,
                                EmailNakoudo: doc.data().EmailNakoudo,
                                PassNakoudo: doc.data().PassNakoudo,
                                NameNakoudo: doc.data().NameNakoudo,
                                AddressNakoudo: doc.data().AddressNakoudo,
                                PhoneNakoudo: doc.data().PhoneNakoudo,
                                NakoudoBirthYear: doc.data().NakoudoBirthYear,
                                NakoudoBirthMonth: doc.data().NakoudoBirthMonth,
                                NakoudoBirthDay: doc.data().NakoudoBirthDay,
                                RegTimestamp: doc.data().RegTimestamp,
                            })
                        })
                    );

                });

                async function unSub3() {
                    await unSub1();
                    unSub2();
                }

            return () => {
                unSub3();
            };
        }, []);


    // useformはreact-hook-formのコンポーネント、分割代入してる
        const {
            register,
            handleSubmit,
            formState: { errors, isValid, isDirty, isSubmitting, touchedFields, submitCount },
            getValues,
            watch,
            reset
        } = useForm();

    // navigateを宣言
        let navigate = useNavigate();


    // フォーム送信時の処理
        const onSubmit = () => {
            // バリデーションチェックで行う処理⇒今後対応
                console.log("isDirty>",isDirty);
                console.log("isValid>",isValid);
                console.log(submitCount);
                console.log("メールとパスは>",EmailNakoudo,PassNakoudo);
            // errorsを表示させる
                console.log("errors>",errors);

            // formで入力した値をgetValuesで取得する
                let getValuetachi = getValues();
                console.log("getValuetachi>",getValuetachi);

            // User登録のfunctionを定義
                async function CreateUserFunction2() {
                    try {

                        //Firebase ver9 compliant
                        // firebaseのログイン中のuserデータにデータ追加する
                            setDoc(
                                doc(collection(db, "user"), NakoudoId),
                             {
                                NameNakoudo: getValuetachi.NameNakoudo,
                                AddressNakoudo: getValuetachi.AddressNakoudo,
                                PhoneNakoudo: getValuetachi.PhoneNakoudo,
                                NakoudoBirthYear: getValuetachi.NakoudoBirthYear,
                                NakoudoBirthMonth: getValuetachi.NakoudoBirthMonth,
                                NakoudoBirthDay: getValuetachi.NakoudoBirthDay,
                                UpdateTimestamp: serverTimestamp(),
                            },
                            { merge: true }
                            );

                        navigate("/NyusatsuIchiran");




                    } catch (error) {
                        alert(error.message);
                    }
                }

                CreateUserFunction2();

        };


    return (
        <div>

            {/* ResponsiveAppBarを挿入 */}
            <ResponsiveAppBar />

            <form onSubmit={handleSubmit(onSubmit)}>

                <Container maxWidth="md" sx={{ pt: 5 }}>

                    
                    <Stack spacing={5}>

                        <Typography variant="h4" color="text.success"
                            sx={{textAlign:"center"}}
                        >
                            ユーザープロフィール登録
                        </Typography>

                        <TextField
                            label="あなたの氏名"
                            type="text"
                            {...register("NameNakoudo", {
                            required: true,
                            message: "氏名を入力してください"
                            })}
                            error={"NameNakoudo" in errors}
                        />

                        <TextField
                            label="あなたの住所"
                            type="text"
                            {...register("AddressNakoudo", {
                            required: true,
                            message: "あなたの住所を入力してください"
                            })}
                            error={"AddressNakoudo" in errors}
                        />

                        <TextField
                            label="あなたの電話番号"
                            type="number"
                            {...register("PhoneNakoudo", {
                                required: true,
                                maxLength: 11,
                                minLength: 11,
                                message: "電話番号を11桁で入力してください"
                            })}
                            error={"PhoneNakoudo" in errors}
                        />

                        <div>
                            <Typography variant="h7" color="text.success">
                                あなたの生年月日
                            </Typography>

                            <div>
                                <TextField
                                    label="西暦〇年"
                                    type="number"
                                    {...register("NakoudoBirthYear", {
                                        required: true,
                                        maxLength: 4,
                                        minLength: 4,
                                        message: "あなたの誕生年を西暦で入力してください"
                                })}
                                />

                                <TextField
                                    label="〇月"
                                    type="number"
                                    {...register("NakoudoBirthMonth", {
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
                                    {...register("NakoudoBirthDay", {
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
                            <Link to="/BukkenTouroku"
                                style={{textDecoration:"none",
                                color:"#e9fef7",
                                fontSize:"2vw"
                            }}>
                                プロフィール登録
                            </Link>

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
                        <div>{item.EmailNakoudo}</div>
                        <div>{item.PassNakoudo}</div>
                        <div>{item.NameNakoudo}</div>
                        <div>{item.AddressNakoudo}</div>
                        <div>{item.PhoneNakoudo}</div>
                        <div>{item.NakoudoBirthYear}</div>
                        <div>{item.NakoudoBirthMonth}</div>
                        <div>{item.NakoudoBirthDay}</div>
                    </div>
                ))}
            </section>


        </div>

    )
}

export default UserReg2
