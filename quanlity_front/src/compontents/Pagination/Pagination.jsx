import React from 'react';
import './Pagination.css';
import Pagination from '@mui/material/Pagination';

const PaginationType = ({ func, numb, defaultPage }) => {
    return (
        <Pagination
            className="pagination"
            key={`slider-${defaultPage}`}
            count={numb}
            color="primary"
            defaultPage={defaultPage}
            // showFirstButton
            variant="outlined"
            shape="rounded"
            showLastButton
            onChange={func}
        />
    );
};

export default PaginationType;
