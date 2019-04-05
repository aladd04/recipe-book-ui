import { RecipeInfoSection } from "./RecipeInfoSection";

import React from "react";

export function RecipeInfo({ recipe, ...props }) {
  const dateString = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long"
  }).format(new Date(recipe.updateDate));

  const timeString = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    hour: "numeric",
    minute: "numeric",
    hour12: "true"
  }).format(new Date(recipe.updateDate));

  const dateTimeString = `${dateString} at ${timeString}`;
  const ownerBlurb = 
    `${recipe.ownerName} last updated this recipe on ${dateTimeString}`;

  props.setOwnerBlurb(ownerBlurb);

  return (
    <React.Fragment>
      <RecipeInfoSection
        title="Description"
        body={recipe.description} />
      <RecipeInfoSection
        title="Ingredients"
        body={recipe.ingredients} />
      <RecipeInfoSection
        title="Instructions"
        body={recipe.instructions} />
    </React.Fragment>
  );
}