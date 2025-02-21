import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Alert } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        setError('');
        try {
            const response = await axios.post('http://localhost:8000/api/token/', {
                email,
                password
            });

            if (response.data && response.data.access) {
                localStorage.setItem('access_token', response.data.access);
                localStorage.setItem('refresh_token', response.data.refresh);
                navigate('/event/');
            } else {
                setError('Erro ao autenticar. Tente novamente.');
            }
        } catch (err) {
            console.error('Erro no login:', err);
            setError('Credenciais inválidas. Tente novamente.');
        }
    };

    return (
        <Container maxWidth="xs">
            <Box sx={{ mt: 8, p: 3, border: '1px solid #ccc', borderRadius: 2, boxShadow: 3 }}>
                <Typography variant="h5" gutterBottom>Login</Typography>
                {error && <Alert severity="error">{error}</Alert>}
                <TextField
                    fullWidth
                    label="Email"
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    fullWidth
                    label="Senha"
                    type="password"
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button fullWidth variant="contained" color="primary" onClick={handleLogin} sx={{ mt: 2 }}>
                    Entrar
                </Button>
            </Box>
        </Container>
    );
};

export default Login;
