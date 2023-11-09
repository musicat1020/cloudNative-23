import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { useTranslation } from 'react-i18next';
import React from "react";
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


const ButtonDeleteVenue = () => {
  const { t } = useTranslation();
  const [openSubButtons, setOpenSubButtons] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpenSubButtons((prevOpen) => !prevOpen);
  };

  const handleSubButtonsClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpenSubButtons(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpenSubButtons(false);
    } else if (event.key === 'Escape') {
      setOpenSubButtons(false);
    }
  };

  const prevOpen = React.useRef(openSubButtons);
  React.useEffect(() => {
    if (prevOpen.current === true && openSubButtons === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = openSubButtons;
  }, [openSubButtons]);

  return (
    <>
      <Button
        ref={anchorRef}
        color='secondary'
        id="composition-button"
        aria-controls={openSubButtons ? 'composition-menu' : undefined}
        aria-expanded={openSubButtons ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        endIcon={<ExpandMoreIcon />}
      >
        {t('下架場地')}
      </Button>
      <Popper
        open={openSubButtons}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom-start' ? 'left top' : 'left bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleSubButtonsClose}>
                <MenuList
                  autoFocusItem={open}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                  onKeyDown={handleListKeyDown}
                >
                  <MenuItem onClick={handleSubButtonsClose}>{t('刪除場地')}</MenuItem>
                  <MenuItem onClick={handleSubButtonsClose}>{t('下架特定時段場地')}</MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>    
  );
}

export default ButtonDeleteVenue;
