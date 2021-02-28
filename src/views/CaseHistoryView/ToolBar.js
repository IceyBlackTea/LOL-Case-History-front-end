import React from 'react';
import PropTypes from 'prop-types';
import {
  AppBar,
  Button,
  fade,
  Grid,
  makeStyles,
  OutlinedInput,
  TablePagination
} from '@material-ui/core';

import {
  ArrowBack as BackIcon,
  AddToPhotos as AddIcon,
  Search as SearchIcon,
} from '@material-ui/icons';

import { useSnackbar } from 'notistack';

import AddDialog from './AddDialog';

import host from '../../utils/getHost';

const useStyles = makeStyles((theme) => ({
  root: {
    top: theme.spacing(8),
    padding: theme.spacing(2, 3),
    backgroundColor: "#f3f6f888",
  },
  addButton: {
    // marginRight: theme.spacing(1)
  },
  // search text filed, copied from material ui website
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.5),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.75),
    },
    marginRight: theme.spacing(2),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
    color: theme.palette.common.black
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 3
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
        backgroundColor: fade(theme.palette.common.white, 1),
      },
    },
  },
}));

const fetchAddCase = async (data) => {
  const response = await fetch(`${host}/api/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
}

const addCase = (doc) => {
  return fetchAddCase({ doc });
}

const Toolbar = ({
  updateCases, count, filter, handleFilterChange, page, handlePageChange, limit, handleLimitChange, ...rest
}) => {
  const classes = useStyles();

  const { enqueueSnackbar } = useSnackbar();

  const [addOpen, setAddOpen] = React.useState(false);

  const handleAddOpen = () => {
    setAddOpen(true);
  };


  const handleAddClose = (item) => {
    setAddOpen(false);

    if (item) {
      const handleThen = (data) => {
        if (data.ok === 1 && data.n !== 0) {
          enqueueSnackbar('新建病历成功!', { variant: 'success' });
        } else {
          throw new Error(data);
        }
      }

      const handleCatch = (error) => {
        console.log(error);
        enqueueSnackbar('新建病历失败!', { variant: 'error' });
      };

      addCase(item)
        .then(handleThen)
        .catch(handleCatch)
        .finally(updateCases);
    }
  };

  const handleClickReturn = () => {
    window.location.pathname = './';
  };

  const handleSearchKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleFilterChange({ patient: event.target.value });

      event.target.value = '';
    }
  }

  return (
    <AppBar
      className={classes.root}
      elevation={0}
    >
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Grid
          item
          xs={1}
        >
          <Button
          color="primary"
          variant="contained"
          onClick={handleClickReturn}
          startIcon={<BackIcon />}
        >
          首页
        </Button>
        </Grid>
        <Grid
          item
          xs={4}
        >
          <TablePagination
          component="div"
          count={count}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[12, 20, 56]}
          labelRowsPerPage={'每页显示'}
        />
        </Grid>
        <Grid
          item
          xs={3}
        >
          <Grid
            display="inline"
            container
            justify="flex-end"
            alignItems="center"
          >
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <OutlinedInput
                placeholder="搜索病人..."
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
                onKeyDown={handleSearchKeyDown}
              />
            </div>
            <Button
              className={classes.addButton}
              color="primary"
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAddOpen}
            >
              新增病历
          </Button>
          </Grid>
        </Grid>
      </Grid>
      <div>
        <AddDialog
          open={addOpen}
          onClose={handleAddClose}
        />
      </div>
    </AppBar>
  );
};

Toolbar.propTypes = {
  updateCases: PropTypes.func,
};

export default Toolbar;
