import React, {useState, useEffect} from 'react'
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useSnackbar } from "notistack"
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'

function Copyright(props) {  
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="http://localhost:3000">
      Mindsumo
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function SignUp() {
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()
  const [firstname, setFirstName] = useState('')
  const [lastname, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [checkbox, setCheckbox] = useState(false)

  const handleSubmit = async(event) => {
    event.preventDefault();
    try{     
      if(!firstname || !lastname || !email || !password){
         return enqueueSnackbar("Please fill in the required fields!", {
          variant: "error"
        })
      }
    const data = {
      firstname, 
      lastname, 
      email, 
      password, 
      checkbox
    }
  
   await axios.post("http://localhost:4000/user", data)
    .then((response) => {  
      setFirstName("") 
      setLastName("")
      setEmail("") 
      setPassword("") 
      setCheckbox(false)
      enqueueSnackbar("Signed up successfully", {
        variant: "success"
      })
     navigate("/signin")    
 
    })
    .catch((error) => {
      enqueueSnackbar("There was an error when signing you in", {
        variant: "error"
      })
      navigate("/signup")
      console.log(error) 
    })
    }
    catch(error){
      enqueueSnackbar("An unexpected error occurred when signing you in", {
        variant: "error"
      })
     console.log(error)
    }

  };

  return (
    <ThemeProvider theme={defaultTheme} >
      <Container component="main" maxWidth="xs">
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
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  onChange={(e) => {setFirstName(e.target.value)}}
                  value={firstname}
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  value={lastname}
                  onChange={(e) => {setLastName(e.target.value)}}
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  value={email}
                  onChange={(e) => {setEmail(e.target.value)}}
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  onChange={(e) => {setPassword(e.target.value)}}
                  value={password}
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value={checkbox} onChange={() => {setCheckbox((prev) => !prev)}} color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signin" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}