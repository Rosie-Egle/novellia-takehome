import { Button, Typography, Box } from "@mui/material";

export default function Home() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gap={2}
      marginTop={4}
    >
      <Typography variant="h2" fontWeight="bold" marginBottom={3}>
        Welcome to Pet Records!
      </Typography>
      <Box display="flex" flexDirection="row" gap={2} width={500}>
        <Button
          variant="contained"
          color="primary"
          href="/pets/new"
          fullWidth
          sx={{
            borderRadius: "8px",
            marginTop: 4,
            marginBottom: 2,
            padding: "8px 16px",
            textTransform: "none",
            width: "100%",
          }}
        >
          <Typography variant="h5"> Add Pet</Typography>
        </Button>
        <Button
          variant="contained"
          color="primary"
          href="/pets"
          fullWidth
          sx={{
            borderRadius: "8px",
            marginTop: 4,
            marginBottom: 2,
            padding: "8px 16px",
            textTransform: "none",
            width: "100%",
          }}
        >
          <Typography variant="h5">View All Pets</Typography>
        </Button>
      </Box>
    </Box>
  );
}
