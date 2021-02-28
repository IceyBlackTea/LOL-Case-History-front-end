import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import {
  // Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Typography,
} from '@material-ui/core';

import {
  AssignmentTurnedIn as ConfirmIcon
} from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiDialog-paperWidthSm': {
      maxWidth: '500px',
    },
  },
  content: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  statsIcon: {
    marginRight: theme.spacing(1)
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: '25ch',
  },
}));

const ConfirmDialog = ({
  open, onClose, labels, ...rest
}) => {
  const classes = useStyles();

  const handleCancel = () => {
    onClose(false);
  };

  const handleOK = () => {
    onClose(true);
  };

  return (
    <Dialog
      className={classes.root}
      open={open}
      {...rest}
    >
      <DialogTitle>
        <Grid
          container
          justify="flex-start"
          alignItems="center"
        >
          <ConfirmIcon
            className={classes.statsIcon}
          />
          <Typography
            color="textPrimary"
            variant="h4"
          >
            <b>{labels === undefined ? 'title' : labels.title}</b>
          </Typography>
        </Grid>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {labels === undefined ? 'content' : labels.content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          color="primary"
          variant="outlined"
          onClick={handleCancel}
          autoFocus
        >
          {labels === undefined ? 'cancel' : labels.cancel}
        </Button>
        <Button
          color="secondary"
          variant="contained"
          onClick={handleOK}
        >
          {labels === undefined ? 'confirm' : labels.confirm}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ConfirmDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  labels: PropTypes.object.isRequired
};

export default ConfirmDialog;
