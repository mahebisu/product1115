import * as React from 'react';
import {useState,useEffect} from 'react'

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import { Link } from "react-router-dom";

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import logoyokogyosha from './logoyokogyosha.png';

// ⇒@mui/icons-materialインストールした
  import MenuIcon from '@mui/icons-material/Menu';
  import Container from '@mui/material/Container';
  import Avatar from '@mui/material/Avatar';
  import Button from '@mui/material/Button';
  import Tooltip from '@mui/material/Tooltip';
  import MenuItem from '@mui/material/MenuItem';

// signoutのためにimport
  import { onAuthStateChanged, signOut } from "firebase/auth";
  import { useNavigate } from "react-router-dom";
  import { db, auth } from "../../firebase";


  // firebaseのデータベース関連
import { collection, query, onSnapshot, addDoc, setDoc, serverTimestamp,orderBy,doc,where } from "firebase/firestore";


const pages = ['メッセージ', '募集中'];
const settings = ['Profile(工事中)', 'Account(工事中)', 'Dashboard(工事中)', 'Logout'];

const pageslink = [
  `/NyusatsuIchiranGyosha`,
  `/ProjectIchiran`
];


const ResponsiveAppBar = () => {

  // IsLoginを宣言する
  const [IsLogin, setIsLogin] = useState(false);
  const [EmailGyosha, setEmailGyosha] = useState("");
  console.log("EmailGyosha>",EmailGyosha);
  
  //   ここがログインできてるかどうか処理
    useEffect(() => {
      //Firebase ver9 compliant (modular)
      const unSub = onAuthStateChanged(auth, (user) => {
          console.log(user, "user情報");
          // authにuser情報があれば、IsLoginをtrue
          user && setIsLogin(true);
          // authにuser情報があれば、IsLoginをtrue
          user.email && setEmailGyosha(user.email);

          !user && navigate("/LandingGyosha");
          });
      return () => unSub();
    },[]);

    //ログインしたuserがuserならLandingへ
    useEffect(() => {

      const q = query(collection(db, "gyosha"), where("EmailGyosha", "==", EmailGyosha ));
      const unSub3 = onSnapshot(q, (snapshot) => {

        // console.log("snapshot.docs>",snapshot.docs);

        if(snapshot.docs.length == 1){

          snapshot.docs.map((doc, index) => {

            // console.log("doc.data()>",doc.data());
          })


        } else {

          snapshot.docs.map((doc, index) => {

            // console.log("doc.data()>",doc.data());
          })

          console.log("user情報なし、gyoshaです");
          SignOutImportInside("/");

        }
        
      });

      return () => {
          unSub3();
          console.log("unSub3を実行しました");
      };
      
    },[EmailGyosha]);
    



  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  // navigateを宣言
    let navigate = useNavigate();

    //サインアウト関数を定義
    const SignOutImportInside = async (navigationto) =>{

      try {
          await signOut(auth);
          alert("ログアウトしました");//アラートだしてわかりやすく
          navigate(navigationto);
          window.location.reload();//ログインがきちんと表示されるように
        } catch (error) {
  
          alert(error.message);
  
      };

    }


  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (event) => {

    // console.log("navmenuを押してevent>",event.target.textContent);

    // logoutボタンを押したら、logoutする
    if (event.target.textContent == settings[3]){

      SignOutImportInside("/LandingGyosha");

    }

    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const navigateLogin = () => {
    navigate("/LoginGyosha")
  };

  return (
    <AppBar position="static"
      // appbarの色を指定する
      sx={{backgroundColor:"#002c1b"}}
    >
    
      <Container maxWidth="xl"
      >

        <Toolbar disableGutters
        >

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            <Link to={`/LandingGyosha`}
              style={{textDecoration:"none",
              color:"#002c1b",
              fontSize:"1.5vw"
            }}>
              <div>
                <img src={logoyokogyosha} alt="logoyokogyosha" style={{width:"280px"}}/>
              </div>
            </Link>

          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >

              {pages.map((page,index) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <Link to={pageslink[index]}
                      style={{textDecoration:"none",
                      color:"#e9fef7",
                      // fontSize:"1.5vw"
                    }}>
                      {page}
                  </Link>
                  </Typography>
                </MenuItem>
              ))}

            </Menu>

          </Box>

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            <Link to={`/ProjectIchiran`}
              style={{textDecoration:"none",
              color:"#e9fef7",
              fontSize:"1.5vw"
            }}>
              <div>
                <img src={logoyokogyosha} alt="logoyokogyosha" style={{width:"280px"}}/>
              </div>
            </Link>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page,index) => (

              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
              <Link to={pageslink[index]}
                style={{textDecoration:"none",
                color:"#e9fef7",
                // fontSize:"1.5vw"
              }}>
                {page}
              </Link>
              </Button>

            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>

              { IsLogin
                ? 
                  (
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar src={AccountCircleIcon} sx={{ bgcolor: "#00c899" }} />
                    </IconButton>
                  </Tooltip>
                  )
                :
                (<Button onClick={navigateLogin} variant="contained" color="success" >
                  ログイン
                </Button>)
              }

            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >

              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseNavMenu} value={setting}>
                  <Typography textAlign="center" value={setting}>{setting}</Typography>
                </MenuItem>
              ))}

            </Menu>

          </Box>

        </Toolbar>

      </Container>

    </AppBar>
  );
};
export default ResponsiveAppBar;