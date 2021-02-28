import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
    Avatar,
    Box,
    // Button,
    Card,
    // CardActions,
    CardHeader,
    colors,
    // Grid,
    Grow,
    IconButton,
    TextField,
    Typography,
    makeStyles,
} from '@material-ui/core';

import {
    Delete as DeleteIcon,
    Edit as EditIcon,
    MoreVert as MoreVertIcon,
} from '@material-ui/icons';

// import { PhotoConsumer } from 'react-photo-view';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        // backgroundColor: theme.palette.primary.main
    },
    header: {

    },
    avatar: {
        backgroundColor: colors.red[500],
    },
    content: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
    },
    patient: {

    },
    stage: {

    },
    date: {

    },
}));

const uploadInfoStyle = {
    float: 'right',
    backgroundColor: 'white',
    padding: '0 1ch 0 1ch',
    transform: 'translate(16px, -13px) scale(0.75)',
}

const CaseCard = ({
    _case, updateCases, handleClickRemove, handleClickEdit, ...rest
}) => {
    const classes = useStyles();

    const [moreShow, setMoreShow] = React.useState(false);

    const displayStage = (stage) => {
        if (stage === 'Tumor') {
            return 'Tumor 肿瘤'; 
        } else if (stage === 'Metastasis') {
            return 'Metastasis 转移';
        } else if (stage === 'Node') {
            return 'Node 淋巴结';
        } else if (stage === 'Dead') {
            return 'Dead 入土';
        } else {
            return '爬！';
        }
    }

    const handleClickMore = () => {
        setMoreShow(!moreShow);
    }

    return (
        <Card className={classes.root} variant="outlined">
            <CardHeader
                className={classes.header}

                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        寄
                    </Avatar>
                }

                action={
                    <>
                        <Box
                            display="inline"
                        >
                            <Grow
                                in={moreShow}
                            >
                                <IconButton
                                    aria-label="settings"
                                    color="secondary"
                                    onClick={handleClickRemove}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </Grow>
                            <Grow
                                in={moreShow}
                            >
                                <IconButton
                                    aria-label="settings"
                                    color="primary"
                                    onClick={handleClickEdit}
                                >
                                    <EditIcon />
                                </IconButton>
                            </Grow>
                        </Box>
                        <IconButton
                            aria-label="settings"
                            onClick={handleClickMore}
                        >
                            <MoreVertIcon />
                        </IconButton>
                    </>
                }

                title={
                    <Typography>
                        {_case.patient}
                    </Typography>
                }

                subheader={displayStage(_case.stage)}
            />
            <Box
                className={classes.content}
            >
                <TextField
                    InputProps={{ readOnly: true, }}
                    variant="outlined"
                    multiline
                    rows={4}
                    fullWidth
                    helperText={
                        <span
                            style={uploadInfoStyle}
                        >
                            {`on ${moment(_case.date).format('yyyy/MM/DD')}`}
                            {_case.doctor ? ` by ${_case.doctor}` : ''}
                        </span>
                    }
                    value={_case.detail}
                />
            </Box>
            {/* <CardActions>
                <Button size="small">Learn More</Button>
            </CardActions> */}
        </Card>
    );
};

CaseCard.propTypes = {
    _case: PropTypes.object.isRequired,
    updateCases: PropTypes.func.isRequired,
    handleClickRemove: PropTypes.func.isRequired,
    handleClickEdit: PropTypes.func.isRequired
};

export default CaseCard;
