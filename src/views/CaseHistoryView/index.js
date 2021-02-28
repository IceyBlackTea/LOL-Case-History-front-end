import React from 'react';
import {
    Backdrop,
    CircularProgress,
    Container,
    makeStyles
} from '@material-ui/core';

import Page from '../../components/Page';

import ToolBar from './ToolBar';
import Result from './Result';

// import { useSnackbar } from 'notistack';

import host from '../../utils/getHost';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        minHeight: '100%',
        paddingBottom: theme.spacing(3),
        paddingTop: theme.spacing(3)
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

const fetchSearchCasesCount = async (data) => {
    const response = await fetch(`${host}/api/search/count`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return response.json();
};

const getSearchCasesCount = (filter) => {
    return fetchSearchCasesCount({ filter });
}

const fetchSearchCases = async (data) => {
    const response = await fetch(`${host}/api/search`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return response.json();
}

const getSearchCases = (filter, limit, page) => {
    return fetchSearchCases({ filter, limit , page});
}

const CaseHistoryView = () => {
    const classes = useStyles();

    const [count, setCount] = React.useState(0);

    const [cases, setCases] = React.useState([]);

    const [filter, setFilter] = React.useState({});
    const [page, setPage] = React.useState(0);
    const [limit, setLimit] = React.useState(20);

    const [backdropOpen, setBackdropOpen] = React.useState(false);

    const handleFilterChange = (filter) => {
        setFilter(filter);
        setPage(0);
        setReRender(reRender + 1);
    }

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
        setReRender(reRender + 1);
    }

    const handleLimitChange = (event) => {
        setPage(0);
        setLimit(event.target.value);
        setReRender(reRender + 1);
    }


    const updateDisplay = () => {
        setBackdropOpen(true);
        getSearchCasesCount(filter).then((count) => {
            setCount(count);
            getSearchCases(filter, limit, page).then((cases) => {
                setCases(cases);
                setBackdropOpen(false);
            });
        });
    };

    const [reRender, setReRender] = React.useState(0);

    React.useEffect(updateDisplay, [reRender]);

    return (
        <Page
            className={classes.root}
            title="病历"
        >
            <Backdrop className={classes.backdrop} open={backdropOpen}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <Container maxWidth={false}>
                <ToolBar
                    updateCases={updateDisplay}
                    count={count}
                    filter={filter}
                    handleFilterChange={handleFilterChange}
                    page={page}
                    handlePageChange={handlePageChange}
                    limit={limit}
                    handleLimitChange={handleLimitChange}
                />
                <Result
                    className={classes.result}
                    cases={cases}
                    updateCases={updateDisplay}
                />
            </Container>
        </Page>
    );
};

export default CaseHistoryView;
