import React from 'react';
// import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
    Box,
    Grid,
    makeStyles,
} from '@material-ui/core';

import { useSnackbar } from 'notistack';

// import { PhotoProvider } from 'react-photo-view';
// import 'react-photo-view/dist/index.css';

import CaseCard from './CaseCard';
import ConfirmDialog from './ConfirmDialog';
import EditDialog from './EditDialog';

import host from '../../utils/getHost';

const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: theme.spacing(4)
    },
}));

const fetchRemoveCase = async (data) => {
    const response = await fetch(`${host}/api/remove`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return response.json();
}

const removeCase = (filter) => {
    return fetchRemoveCase({ filter });
}

const fetchEditCase = async (data) => {
    const response = await fetch(`${host}/api/edit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return response.json();
}

const editCase = (filter, update) => {
    return fetchEditCase({ filter, update: { '$set': update } });
}

const Results = ({
    className, cases, updateCases
}) => {
    const classes = useStyles();

    const { enqueueSnackbar } = useSnackbar();

    const [openConfirmDialog, setOpenConfirmDialog] = React.useState(false);
    const [openEditDialog, setOpenEditDialog] = React.useState(false);

    const [_case, setCase] = React.useState({});

    const getSelectedCase = () => {
        return _case;
    }

    const handleClickRemove = (item) => {
        setCase(item);
        setOpenConfirmDialog(true);
    }

    const handleClickEdit = (item) => {
        setCase(item);
        setOpenEditDialog(true);
    };

    const handleCloseConfirm = (flag) => {
        setOpenConfirmDialog(false);

        if (flag) {
            const selectedCase = {
                patient: _case.patient,
                stage: _case.stage,
                doctor: _case.doctor,
                date: _case.date,
                detail: _case.detail,
            }

            const handleThen = (data) => {
                if (data.ok === 1 && data.n !== 0) {
                    enqueueSnackbar('删除病历成功!', { variant: 'success' });
                } else {
                    throw new Error(data);
                }
            }

            const handleCatch = (error) => {
                console.log(error);
                enqueueSnackbar('删除病历失败!', { variant: 'error' });
            };

            removeCase(selectedCase)
                .then(handleThen)
                .catch(handleCatch)
                .finally(updateCases);
        }
    };

    const handleCloseEdit = (item) => {
        setOpenEditDialog(false);

        if (item) {
            const selectedCase = {
                patient: _case.patient,
                stage: _case.stage,
                doctor: _case.doctor,
                date: _case.date,
                detail: _case.detail,
            }

            const editedCase = item;

            const handleThen = (data) => {
                if (data.ok === 1 && data.n !== 0) {
                    enqueueSnackbar('修改病历成功!', { variant: 'success' });
                } else {
                    throw new Error(data);
                }
            }

            const handleCatch = (error) => {
                console.log(error);
                enqueueSnackbar('修改病历失败!', { variant: 'error' });
            };

            editCase(selectedCase, editedCase)
                .then(handleThen)
                .catch(handleCatch)
                .finally(updateCases);
        }
    };

    return (
        <div
            className={classes.root}
        >
            <Box
                mt={3}
            >
                <Grid
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="center"
                    spacing={3}
                >
                    {/* Array.isArray(Cases) && Cases.length !== 0 */}
                    {/* <PhotoProvider> */}
                    {cases.map((item, index) => (
                        <Grid
                            item
                            lg={3}
                            md={6}
                            xs={12}
                            key={index.toString()}
                        >
                            <CaseCard
                                _case={item}
                                updateCases={updateCases}
                                handleClickRemove={() => handleClickRemove(item)}
                                handleClickEdit={() => handleClickEdit(item)}
                            />
                        </Grid>
                    ))}
                    {/* </PhotoProvider> */}
                </Grid>
            </Box>
            <ConfirmDialog
                open={openConfirmDialog}
                onClose={handleCloseConfirm}
                // getSelectedCase={getSelectedCase}
                labels={{
                    title: '删除',
                    content: '将要删除该病历，确认删除吗？',
                    confirm: '删除',
                    cancel: '取消'
                }}
            />
            <EditDialog
                open={openEditDialog}
                onClose={handleCloseEdit}
                getSelectedCase={getSelectedCase}
            />
        </div>
    );
};

Results.propTypes = {
    cases: PropTypes.array.isRequired,
    updateCases: PropTypes.func.isRequired,
};

export default Results;
