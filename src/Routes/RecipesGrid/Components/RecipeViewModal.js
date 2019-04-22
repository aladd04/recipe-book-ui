import { PageHeader } from "../../../Shared/PageHeader";
import { RouterLink } from "../../../Shared/RouterLink";
import { RecipeInfo } from "../../RecipeView/Components/RecipeInfo";
import React, {
  useState
} from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle
} from "@material-ui/core";
import withMobileDialog from "@material-ui/core/withMobileDialog";
import PropTypes from "prop-types";

function RecipeViewModal({ recipe, ...props }) {
  const [ownerBlurb, setOwnerBlurb] = useState("");

  return (
    <Dialog
        open={props.isModalOpen}
        onClose={props.onCloseModal}
        fullWidth={true}
        fullScreen={props.fullScreen}
        scroll="body">
      <DialogTitle disableTypography={true} style={{ paddingBottom: 0 }}>
        <PageHeader text={recipe.name} subText={ownerBlurb} />
      </DialogTitle>
      <DialogContent style={{ overflowY: "unset", paddingBottom: 0 }}>
        <RecipeInfo recipe={recipe} setOwnerBlurb={setOwnerBlurb} />
      </DialogContent>
      <DialogActions>
        <Button size="small" color="primary" onClick={props.onCloseModal}>
          Close
        </Button>
        <RouterLink to={`/recipe/${recipe.id}`} target="_blank">
          <Button size="small" color="primary">
            Open in new Tab
          </Button>
        </RouterLink>
      </DialogActions>
    </Dialog>
  );
}

RecipeViewModal.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
};

export default withMobileDialog({breakpoint: "sm"})(RecipeViewModal);
