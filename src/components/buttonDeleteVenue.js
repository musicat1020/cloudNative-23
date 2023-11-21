import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { useTranslation } from "react-i18next";
import { useState, useRef, useEffect } from "react";
import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteVenueModal from "./deleteVenueModal";
import DeleteVenueSessionModal from "./deleteVenueSessionModal";
import EnableVenueSessionModal from "./enableVenueSessionModal";


function ButtonDeleteVenue({ info }) {

  const { t } = useTranslation();

  const [openSubButtons, setOpenSubButtons] = useState(false);
  const [showDeleteVenueModal, setShowDeleteVenueModal] = useState(false);
  const [showDeleteSessionVenueModal, setShowDeleteSessionVenueModal] = useState(false);
  const [showEnableSessionVenueModal, setShowEnableSessionVenueModal] = useState(false);
  
  const anchorRef = useRef(null);

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
    if (event.key === "Tab") {
      event.preventDefault();
      setOpenSubButtons(false);
    } else if (event.key === "Escape") {
      setOpenSubButtons(false);
    }
  };

  const prevOpen = useRef(openSubButtons);
  useEffect(() => {
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
        aria-controls={openSubButtons ? "composition-menu" : undefined}
        aria-expanded={openSubButtons ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        endIcon={<ExpandMoreIcon />}
      >
        {t("上下架場地")}
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
                placement === "bottom-start" ? "left top" : "left bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleSubButtonsClose}>
                <MenuList
                  autoFocusItem={true}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                  onKeyDown={handleListKeyDown}
                >
                  <MenuItem onClick={() => setShowDeleteVenueModal(true)}>{t("刪除場地")}</MenuItem>
                  <MenuItem onClick={() => setShowDeleteSessionVenueModal(true)}>{t("下架特定時段場地")}</MenuItem>
                  <MenuItem onClick={() => setShowEnableSessionVenueModal(true)}>{t("上架特定時段場地")}</MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
      <DeleteVenueModal 
				show={showDeleteVenueModal}
				setShow = {setShowDeleteVenueModal}
				handleClose={() => setShowDeleteVenueModal(false)}
				title={t("刪除場地")}
        info={info}
      />
      <DeleteVenueSessionModal
        show={showDeleteSessionVenueModal}
				setShow = {setShowDeleteSessionVenueModal}
				handleClose={() => setShowDeleteSessionVenueModal(false)}
				title={t("下架特定時段場地")}
        info={info}
        />
      <EnableVenueSessionModal
        show={showEnableSessionVenueModal}
        setShow = {setShowEnableSessionVenueModal}
        handleClose={() => setShowEnableSessionVenueModal(false)}
        title={t("上架特定時段場地")}
        info={info}
        />
    </>    
  );
}

export default ButtonDeleteVenue;
