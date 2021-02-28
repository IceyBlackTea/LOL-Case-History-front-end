import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import {
  Box,
  Button,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  // DialogContentText,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@material-ui/core';

import {
  AddCircleOutline as AddIcon,
  ExpandMore as ExpandMoreIcon,
  Cancel as CancelIcon,
  CheckCircle as ConfirmIcon,
} from '@material-ui/icons';

import clsx from 'clsx';

import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';

// import checkInvalidChar from '../../../utils/checkInvalidChar';

const CHARACTER_LIMIT = 10;

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiDialog-paperWidthSm': {
      maxWidth: '480px',
    },
  },
  topButton: {
    marginRight: theme.spacing(1),
  },
  bottomButton: {
    marginRight: theme.spacing(1),
  },
  content: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  detail: {
    margin: theme.spacing(1),
    width: '52ch',
  },
  statsIcon: {
    marginRight: theme.spacing(1)
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: '25ch',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}));

const AddDialog = ({
  open, onClose, ...rest
}) => {
  const classes = useStyles();

  const [patient, setPatient] = React.useState('');

  const [stage, setStage] = React.useState('');

  const [doctor, setDoctor] = React.useState('');

  const [date, setDate] = React.useState(new Date());

  const [detail, setDetail] = React.useState('');

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const inputClear = () => {
    setPatient('');
    setStage('');
    setDoctor('');
    setDate(new Date());
    setDetail('');

    setExpanded(false);
  };

  const handlePatientChanged = (event) => {
    setPatient(event.target.value);
  };

  const handleStageChanged = (event) => {
    setStage(event.target.value);
  };

  const handleDoctorChanged = (event) => {
    setDoctor(event.target.value);
  };
  
  const handleDateChanged = (selectedDate) => {
    setDate(selectedDate);
  }

  const handleDetailChanged = (event) => {
    setDetail(event.target.value);
  };

  const handleCancel = () => {
    onClose(false);
  };

  const handleOK = () => {
    onClose({
      patient,
      stage,
      doctor,
      date,
      detail,
    });

    inputClear();
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
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Box>
            <Grid
              container
              justify="flex-start"
              alignItems="center"
            >
              <AddIcon
                className={classes.statsIcon}
                color="primary"
              />
              <Typography
                color="textPrimary"
                variant="h3"
              >
                <b>新增病历</b>
              </Typography>
            </Grid>
          </Box>
          <Box>
            <Button
              className={classes.topButton}
              color="primary"
              startIcon={<CancelIcon />}
              onClick={handleCancel}
            >
              取消
            </Button>
            <Button
              className={classes.topButton}
              variant="contained"
              color="primary"
              disabled={!(patient !== '' && stage !== '' && doctor !== '' && detail !== '')}
              startIcon={<ConfirmIcon />}
              onClick={handleOK}
            >
              添加
            </Button>
          </Box>
        </Grid>
      </DialogTitle>
      <DialogContent>
        <form noValidate>
          <div className={classes.content}>
            <TextField
              label="Patient 病人名称"
              variant="outlined"
              autoComplete="off"
              // value={patient}
              onChange={handlePatientChanged}
            />
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel>
                Stage 癌症阶段
              </InputLabel>
              <Select
                label="Stage 癌症阶段"
                defaultValue=""
                onChange={handleStageChanged}
                //value={stage}
              >
                <MenuItem value="Tumor">
                  <em>Tumor 肿瘤</em>
                </MenuItem>
                <MenuItem value="Node">
                  <em>Node 淋巴结</em>
                </MenuItem>
                <MenuItem value="Metastasis">
                  <em>Metastasis 转移</em>
                </MenuItem>
                <MenuItem value="Dead">
                  <em>Dead 入土</em>
                </MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Doctor 主治医师"
              variant="outlined"
              inputProps={{
                maxLength: CHARACTER_LIMIT
              }}
              onChange={handleDoctorChanged}
            />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                autoOk
                variant="inline"
                inputVariant="outlined"
                label="Date 发病日期"
                format="yyyy/MM/dd"
                value={date}
                InputAdornmentProps={{ position: "end" }}
                onChange={selectedDate => handleDateChanged(selectedDate)}
              />
            </MuiPickersUtilsProvider>
          </div>
          <TextField
            className={classes.detail}
            label="Detail 病状描述"
            multiline
            rows={4}
            variant="outlined"
            fullWidth
            // value={detail}
            onChange={handleDetailChanged}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <IconButton
          className={clsx(classes.bottomButton, classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </DialogActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
          Not Yet!
      </Collapse>
    </Dialog>
  );
};

AddDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AddDialog;
