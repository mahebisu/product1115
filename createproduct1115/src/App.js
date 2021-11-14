import './App.css';
import React, { useState, useEffect } from "react";
import { collection, query, onSnapshot, addDoc } from "firebase/firestore";
import { db, auth } from "./firebase";


function App() {

  // useStateをつかう  
    const [data, setData] = useState(
      [
        { 
          id: "",
          period: '',
          type: '',
          prefecture: '',
          municipality: '',
          district: "",
          period: '',
          price: '',
          area: '',
          tubotanka: '',
          floor: "",
          build: '',
          douro: '',
          breadth: '',
          cityplan: ''
        }
      ]
    );

    
  // useEffectをつかう
    useEffect(() => {
      // query=コレクション（firebaseの箱のこと）の指定をする
      const q = query(collection(db,"group"));

      const unsub = onSnapshot(q, (querySnapshot) => {
        setData(
          querySnapshot.docs.map((doc) => ({
            id: doc.data().id,
            period: doc.data().period,
            type: doc.data().type,
            prefecture: doc.data().prefecture,
            municipality: doc.data().municipality,
            district: doc.data().district,
            period: doc.data().period,
            price: doc.data().price,
            area: doc.data().area,
            tubotanka: doc.data().tubotanka,
            floor: doc.data().floor,
            build: doc.data().build,
            douro: doc.data().douro,
            breadth: doc.data().breadth,
            cityplan: doc.data().cityplan
          }))
        );
      });
    
      return () => unsub();

    }, [])

    // // newDataというonChangeのイベント関数を定義する
    //   const newData = (e) => {
    //     setTitleValue(e.target.value);
    //   };

    // // addDataというonClickのイベント関数を定義する
    //   const addData = async () => {
    //     alert(titleValue);

    //     // 登録の処理を記述
    //     await addDoc(collection(db, "group"), { title: titleValue });

    //     // 登録が終わったらinputのvalueを空にする
    //     setTitleValue("");
    //   };
    

    // CSSオブジェクトの定義
      const stylesection ={
        display: 'flex',
        justifyContent: 'space-between,center',
        width: '95%',
        margin: 'auto'
      };



  return (
    <div className="App">
      {/* 表示のロジックを書く */}
      <h1>データ表示</h1>

      <section style={stylesection}>
        {/* dataをmapで表示 */}
        {data.map((item,index) => (
          
          // 多要素は１つのdiv等で囲う
          <div key={index}>
            <div>{index}</div>
            <div>{item.id}</div>
            <div>{item.period}</div>
            <div>{item.type}</div>
            <div>{item.prefecture}</div>
            <div>{item.municipality}</div>
            <div>{item.district}</div>
            <div>{item.price}</div>
            <div>{item.area}</div>
            <div>{item.tubotanka}</div>
            <div>{item.floor}</div>
            <div>{item.build}</div>
            <div>{item.douro}</div>
            <div>{item.breadth}</div>
            <div>{item.cityplan}</div>
          </div>
        ))}
      </section>


    </div>
  );
}

export default App;
