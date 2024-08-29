import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import useAuth from '../../../hooks/useAuth';

const pages = [
    { name: 'Giới thiệu', link: '/introduction' },
    { name: 'Đặt lịch', link: '/tarot-reader-list' },
    { name: 'Liên hệ', link: '/contact' },
    { name: 'Cộng đồng', link: '/' },
];
const settings = ['Hồ sơ', 'Đăng xuất'];
function Header() {
    const { user } = useAuth();
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="sticky" sx={{ backgroundColor: '#ffd232' }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box
                        component="a"
                        href="/"
                        sx={{
                            display: { xs: 'none', md: 'flex' },
                            mr: 1,
                        }}
                    >
                        <img src="/image/logo.png" alt="Logo" style={{ height: '60px' }} />
                    </Box>
                    <Box
                        component="a"
                        href="/"
                        sx={{
                            display: { xs: 'flex', md: 'none' },
                            mr: 1,
                            flexGrow: 1,
                        }}
                    >
                        <img src="/image/logo.png" alt="Logo" style={{ height: '60px' }} />
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                key={page.name}
                                onClick={handleCloseNavMenu}
                                href={page.link}
                                sx={{ my: 2, color: 'black', display: 'block', mr: 4 }}
                            >
                                {page.name}
                            </Button>
                        ))}
                    </Box>

                    {(user?.roleName == "Tarot Reader"
                        || user?.roleName == "Customer"
                        || user?.roleName == "Administrator")
                        ? (
                            <Box sx={{ flexGrow: 0 }}>
                                <Tooltip title="Open settings">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        <Avatar alt="Remy Sharp" src={user.avatarLink} />
                                    </IconButton>
                                </Tooltip>
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
                                        <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                            <Typography textAlign="center">{setting}</Typography>
                                        </MenuItem>
                                    ))}
                                </Menu>
                                <CalendarMonthIcon className='mr-6 ml-6' />
                            </Box>
                        ) : (
                            <Box className="text-black">
                                <a href='/login' className='mr-8 underline'>Đăng nhập</a>
                                <a className='underline'>Đăng kí</a>
                            </Box>)}


                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default Header;