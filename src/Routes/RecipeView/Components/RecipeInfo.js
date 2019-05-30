import { RecipeInfoSection } from "./RecipeInfoSection";
import React from "react";
import { DateTime } from "luxon";

export function RecipeInfo({ recipe, ...props }) {
  props.setOwnerBlurb(generateOwnerBlurb(recipe.ownerName, recipe.updateDate));

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

function generateOwnerBlurb(ownerName, updateDate) {
  const isoDateTime = DateTime.fromISO(updateDate);
  
  const formattedDate = isoDateTime.toFormat("DDDD");
  const formattedTime = isoDateTime.toFormat("t ZZZZ");

  const dateTimeString = `${formattedDate} at ${formattedTime}`;

  return `${ownerName} last updated this recipe on ${dateTimeString}`;
}
