import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    
    const navigate = useNavigate();
    var userName = localStorage.getItem('userName') ?? "";
    var isAdmin = localStorage.getItem('isAdmin') ?? "";

    function logOut() {

        localStorage.removeItem("userId")
        localStorage.removeItem("userName")
        localStorage.removeItem("isAdmin")

        navigate("/login");
    }
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>

                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Tasks
                    </Typography>

                    <p>{userName}</p>
                    {isAdmin == "true" ? <p>(ADMİN)</p> : ""}
                    <Button onClick={logOut} color="inherit">Logout</Button>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Header