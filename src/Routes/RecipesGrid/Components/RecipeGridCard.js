import RecipeViewModal from "./RecipeViewModal";

import React, {
  useState
} from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  Typography
} from "@material-ui/core";

export function RecipeGridCard({ recipe }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleSeeMoreClick() {
    setIsModalOpen(true);
  }

  function handleModalClose() {
    setIsModalOpen(false);
  }

  const dateString = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: "true"
  }).format(new Date(recipe.updateDate));

  return (
    <React.Fragment>
      <Card>
        <CardHeader
          title={recipe.name}
          subheader={`${recipe.ownerName} - ${dateString}`} />
        <CardContent>
          <Typography variant="body1">
            {recipe.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary" onClick={handleSeeMoreClick}>
            See More
          </Button>
        </CardActions>
      </Card>
      <RecipeViewModal
        recipe={recipe}
        isModalOpen={isModalOpen}
        onCloseModal={handleModalClose} />
    </React.Fragment>
  );
}