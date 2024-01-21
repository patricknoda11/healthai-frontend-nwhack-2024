

import React from 'react';
import { Card, CardContent, Avatar, Typography, Box } from '@mui/material';
import assistantPic from '../../assets/assistant1.jpg';
import catPic from '../../assets/cat.jpg';

interface MessageBoxProps {
    role: string;
    message: string;
}

export default function MessageBox({ role, message }: MessageBoxProps) {
    const avatar = role === 'user' ? catPic : assistantPic;
    const avatarPos = role === 'user' ? 'row-reverse' : 'row';
    return (
        <Box style={{display: 'flex', flexDirection: avatarPos, gap:"10px"}}>
            <Avatar src={avatar} alt={role} />
            <Card >
                <CardContent>
                    <Typography variant="body1" component="div" color="textSecondary">
                        {role}
                    </Typography>
                    <Typography variant="body2">
                        {message}
                    </Typography>
                </CardContent>
            </Card>
        </Box>
        
    );
}
