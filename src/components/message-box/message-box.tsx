

import React from 'react';
import { Card, CardContent, Avatar, Typography, Box } from '@mui/material';

interface MessageBoxProps {
    role: string;
    message: string;
}

export default function MessageBox({ role, message }: MessageBoxProps) {
    const avatar = role === 'user' ? 'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png' : 'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png';
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
