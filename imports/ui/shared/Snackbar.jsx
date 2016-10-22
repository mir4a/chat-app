import React from 'react';
import Snackbar from 'material-ui/Snackbar';

const SnackbarWrapper = (props) => {
  return (
    <div>
      <Snackbar
        open
        message={props.message}
      />
    </div>
  );
};

export default SnackbarWrapper;
