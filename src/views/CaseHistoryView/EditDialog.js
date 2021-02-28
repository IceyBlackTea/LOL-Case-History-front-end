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
  Edit as EditIcon,
  ExpandMore as ExpandMoreIcon,
  Cancel as CancelIcon,
  CheckCircle as ConfirmIcon,
} from '@material-ui/icons';

import clsx from 'clsx';
import moment from 'moment';

import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';

import ConfirmDialog from './ConfirmDialog';

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

const EditDialog = ({
  open, onClose, getSelectedCase, ...rest
}) => {
  const classes = useStyles();

  const [_case, setCase] = React.useState({});

  const [patient, setPatient] = React.useState('');

  const [stage, setStage] = React.useState('');

  const [doctor, setDoctor] = React.useState('');

  const [date, setDate] = React.useState(new Date());

  const [detail, setDetail] = React.useState('');

  const [confirmOpened, setConfirmOpened] = React.useState(false);

  const [expanded, setExpanded] = React.useState(false);

  const reducer = () => {
    return (patient !== '' && stage !== '' && doctor !== '' && detail !== '') &&
        (patient !== _case.patient ||
          stage !== _case.stage ||
          doctor !== _case.doctor ||
          moment(date).format('YYYY/MM/DD') !== moment(_case.date).format('YYYY/MM/DD') ||
          detail !== _case.detail);
  }

  const [editable, setEditable] = React.useReducer(reducer, false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handlePatientChanged = (event) => {
    setPatient(event.target.value);
    setEditable();
  };

  const handleStageChanged = (event) => {
    setStage(event.target.value);
    setEditable();
  };

  const handleDoctorChanged = (event) => {
    setDoctor(event.target.value);
    setEditable();
  };

  const handleDateChanged = (selectedDate) => {
    setDate(selectedDate);
    setEditable();
  }

  const handleDetailChanged = (event) => {
    setDetail(event.target.value);
    setEditable();
  };

  const resetInput = (selectedCase) => {
    setPatient(selectedCase.patient || '');
    setStage(selectedCase.stage || '');
    setDoctor(selectedCase.doctor || '');
    setDate(selectedCase.date || new Date());
    setDetail(selectedCase.detail || '');
    setEditable();
  }

  const handleEnter = () => {
    const selectedCase = getSelectedCase();
    setCase(selectedCase);
    resetInput(selectedCase);
  }

  const handleCancel = () => {
    onClose();
  };

  const handleOK = () => {
    setConfirmOpened(true);
  };

  const handleCloseConfirm = (flag) => {
    setConfirmOpened(false);

    if (flag) {
      onClose({
        key: _case.key,
        patient,
        stage,
        doctor,
        date,
        detail,
      });
    }
  }

  return (
    <Dialog
      className={classes.root}
      open={open}
      onEnter={handleEnter}
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
              <EditIcon
                className={classes.statsIcon}
                color="primary"
              />
              <Typography
                color="textPrimary"
                variant="h3"
              >
                <b>修改病历</b>
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
              disabled={!editable}
              startIcon={<ConfirmIcon />}
              onClick={handleOK}
            >
              修改
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
              value={patient}
              onChange={handlePatientChanged}
            />
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel>
                Stage 癌症阶段
              </InputLabel>
              <Select
                label="Stage 癌症阶段"
                defaultValue=""
                value={stage}
                onChange={handleStageChanged}
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
              value={doctor}
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
            value={detail}
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
      <ConfirmDialog
        open={confirmOpened}
        onClose={handleCloseConfirm}
        labels={{
            title: '修改',
            content: '将要修改该病历，确认修改吗？',
            confirm: '修改',
            cancel: '取消'
        }}
      />
    </Dialog>
  );
};

EditDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  getSelectedCase: PropTypes.func,
};

export default EditDialog;
