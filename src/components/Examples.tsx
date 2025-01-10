import { Grid, Paper, Typography, Box, Button } from "@mui/material";
import { BarChart } from "@mui/x-charts";
import { Star } from "@mui/icons-material";

export default function Examples({ shades }) {
  const shadeKeys = Object.keys(shades);
  const chartData = [4500, 3500, 6000, 8000, 5500, 7500];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

  return (
    <Box sx={{ mt: 8 }}>
      <Typography variant="h5" gutterBottom>
        Examples
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 3,
              bgcolor: shades[shadeKeys[8]],
              color: shades[shadeKeys[1]],
            }}
          >
            <Typography variant="overline" sx={{ fontWeight: 600 }}>
              Customers
            </Typography>
            <Typography variant="h3" sx={{ my: 2 }}>
              1,553
            </Typography>
            <Typography variant="body2">
              New customers in past 30 days
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 3,
              bgcolor: shades[shadeKeys[9]],
              color: shades[shadeKeys[2]],
            }}
          >
            <Typography variant="overline">Revenue</Typography>
            <Typography variant="h5" sx={{ mb: 2 }}>
              $35,000
            </Typography>
            <BarChart
              series={[{ data: chartData, color: shades[shadeKeys[4]] }]}
              height={200}
              xAxis={[{ data: months, scaleType: "band" }]}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 3,
              bgcolor: shades[shadeKeys[3]],
              color: shades[shadeKeys[9]],
            }}
          >
            <Typography variant="overline">Today</Typography>
            <Box sx={{ mt: 2 }}>
              {[
                { time: "9 - 10 AM", title: "Design system meeting" },
                { time: "1 - 2 PM", title: "Lunch" },
                { time: "3 - 4 PM", title: "Design review" },
              ].map((event, index) => (
                <Box
                  key={index}
                  sx={{
                    p: 2,
                    mb: 1,
                    bgcolor: shades[shadeKeys[5]],
                    color: shades[shadeKeys[1]],
                    borderRadius: 1,
                  }}
                >
                  <Typography variant="subtitle2">{event.title}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {event.time}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 3,
              bgcolor: shades[shadeKeys[4]],
              color: shades[shadeKeys[10]],
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
              }}
            >
              <Typography variant="h6">Premium Plan</Typography>
              <Star sx={{ color: "primary.50" }} />
            </Box>
            <Typography variant="h3" sx={{ mb: 2 }}>
              $29
              <Typography component="span" variant="body1">
                /month
              </Typography>
            </Typography>
            <Button
              variant="contained"
              sx={{
                bgcolor: shades[shadeKeys[8]],
                color: shades[shadeKeys[2]],
                width: "100%",
              }}
            >
              Upgrade Now
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
