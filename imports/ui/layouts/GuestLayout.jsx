// React Dependencies
import React from 'react';

// Material-UI
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

export default function GuestLayout ({content}) {
  return (
    <MuiThemeProvider>
      <div>
        <AppBar
          title="Awesome Chat App"

          iconElementRight={
            <IconMenu
              iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
              targetOrigin={{horizontal: 'right', vertical: 'top'}}
              anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            >
              <MenuItem primaryText="Login" />
              <MenuItem primaryText="Sign up" />
              <MenuItem primaryText="Help" />
            </IconMenu>
          }
        />
        <div>{content}</div>
      </div>
    </MuiThemeProvider>
  );
}
