import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import '../Components/myStyles.css'
import { useState } from 'react';
import { LoginUser } from '../Services/apiServices';
import { useDispatch, useSelector } from 'react-redux';
import { setUserToken } from '../redux/chatSlice'
import { useNavigate } from 'react-router-dom';
import { BounceLoader } from 'react-spinners';
import { toast } from 'react-toastify';
// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme({
  palette: {
    background: {
      default: 'white',
    },
  },
});

export default function SignIn() {

  const navigate=useNavigate();
 const dispatch=useDispatch();
  const [user,setUser]=useState({
    email:"",
    password:"" 
  
  });
  const [loading,setLoading]=useState(false);


  const handleSubmit = async(event) => {
    event.preventDefault();
    setLoading(true);
   
    try {
      // console.log(user)
      setUser({ email: '', password: '' });
      const response = await LoginUser(user);
      
      // console.log(response)
      if(response.status==200){
        setLoading(false);
      const token=response.data.jwttoken
      const id=response.data.user
      // console.log(token)

      toast.success("Login Successfully", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
   dispatch(setUserToken({token}));
   localStorage.setItem("token",JSON.stringify(token))
   localStorage.setItem("user",JSON.stringify(id));
    navigate('/app/welcome')}
    else{
      toast.error("Unable to Login", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }


      
    } catch (error) {
      console.log(error);
      
    }finally{
      setLoading(false)
    }
   
  };


  const handleDemo=async(e)=>{
    e.preventDefault();
    setLoading(true);

    try {

      const response = await LoginUser({email:"demouser@gmail.com",password:'1234567890'});
      if(response.status=200){



        setLoading(false);
      const token=response.data.jwttoken
      const id=response.data.user
      // console.log(token)

      toast.success("Login Successfully", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
   dispatch(setUserToken({token}));
   localStorage.setItem("token",JSON.stringify(token))
   localStorage.setItem("user",JSON.stringify(id));
    navigate('/app/welcome')

      }else{
        toast.error("Unable to Login", {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
   
    } catch (error) {
      console.log(error);
      
    }finally{
      setLoading(false)
    }

  }

  return (
    <>
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs" fixed={true}  className='login'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >

          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={user.email}
              onChange={(e)=>setUser({...user,[e.target.name]:e.target.value})}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={user.password}
              autoComplete="password"
              onChange={(e)=>setUser({...user,[e.target.name]: e.target.value })}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="click"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              
            >
              Sign In
            </Button>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleDemo}
            >
              Login as Demo user
            </Button>
            
            
            <Grid container>
              <Grid item xs>
                <Link href="/forget" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    {loading && (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', position: 'fixed', width: '100%', backgroundColor: 'rgba(255, 255, 255, 0.5)', zIndex: 9999 }}>
      <BounceLoader color="#36d7b7" loading={loading} size={200} />
    </Box>
  )}

    </>
  );
}