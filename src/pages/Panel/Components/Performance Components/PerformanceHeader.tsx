import { AppBar, Toolbar, Typography, Box } from "@mui/material"
import React from "react"

const PerformanceHeader = () => {
    return(
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" color='inherit'>
                    <Toolbar>
                        <Typography>
                            Query Logs
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Box>
        </div>
    )
}

export default PerformanceHeader
