import { AppBar, Button, Toolbar, Typography } from "@mui/material"
import Link from "next/link"

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Instagram Clone
        </Typography>
        <Button color="inherit" component={Link} href="/" passHref>
          Home
        </Button>
        <Button color="inherit" component={Link} href="/upload" passHref>
          Upload
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar