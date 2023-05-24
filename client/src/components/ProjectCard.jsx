/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

const ProjectCard = ({ project }) => {
  return (
    <Card sx={{ maxWidth: 275 }}>
      <CardContent>
        {/* <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Word of the Day
        </Typography> */}
        <Typography variant="h6" component="div">
          {project.name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {project.status}
        </Typography>
        <Typography variant="body2">
          {project.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant="text" sx={{ mx: "2px" }}>
          <Link href={`/projects/${project.id}`} underline="none">
            View
          </Link>
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProjectCard;
