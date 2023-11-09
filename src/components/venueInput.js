import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { useTranslation } from 'react-i18next';
import React from "react";
import { useRef } from 'react';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Dialog from '@mui/material/Dialog';
import AddIcon from '@mui/icons-material/Add';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import Stack from '@mui/joy/Stack';
import { Button, Col, Row, Form } from 'react-bootstrap';

const VenueDetail = () => {
  const { t } = useTranslation();
  const [openAddModal, setOpenAddModal] = React.useState(false);
  const [courtList, setCourtList] = React.useState(["A桌", "B桌"]);
  const [weekDays, setWeekDays] = React.useState(() => ["mon", "tue", "wed", "thu", "fri"]);
  const newCourtRef = useRef(null);


  const handleWeekdays = (event, newWeekDays) => {
    setWeekDays(newWeekDays);
  };

  function handleListDelete(courtToDelete) {
    const updatedCourtList = courtList.filter((court) => court !== courtToDelete);
    setCourtList(updatedCourtList);
  }

  function handleAddCourt() {
    try {
      const newCourt = newCourtRef.current.value;
      if (newCourt.trim() !== '') {
        setCourtList([...courtList, newCourt]);
        setOpenAddModal(false);
      } else {
        // Handle the case where the input value is empty (optional)
        alert("Please enter a valid court name.");
      }
    } catch (error) {
      console.log(error);
      alert("Error: failed to add new court");
    }
  }

  const handleClose = () => {
    setOpenAddModal(false);
  };

  return (
    <>
      <Row style={{ padding: '20px' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tab label={t('場地資訊')} textColor='primary' />
        </Box>
      </Row>
      <Row style={{ padding: '20px' }}>
        <Form>
          <Form.Group as={Row} className="mb-3" controlId="address">
            <Form.Label column sm="2">
              {t('場館地址')}
            </Form.Label>
            <Col sm="10">
              <Form.Control type="address" placeholder={t('場館地址')} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="stadiumName">
            <Form.Label column sm="2">
              {t('場館名稱')}
            </Form.Label>
            <Col sm="10">
              <Form.Control type="stadium-name" placeholder={t('場館名稱')} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="courtType">
            <Form.Label column sm="2">
              {t('場地名稱')}
            </Form.Label>
            <Col sm="10">
              <Form.Control type="court-type" placeholder={t('場地名稱')} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="capacityPerCourt">
            <Form.Label column sm="2">
              {t('單一場地可容納人數')}
            </Form.Label>
            <Col sm="10" className='content-left'>
              <Form.Control type="capacity" style={{ width: '80px' }} />
              {/* <span>{t('人')}</span> */}
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="courtList">
            <Form.Label column sm="2">
              {t('場地列表')}
            </Form.Label>
            <Col sm="10">
              <Stack direction="row" spacing={1}>
                {courtList.map((court) => (
                  <Chip label={court} key={court} variant="outlined" color='secondary' onDelete={() => handleListDelete(court)} />
                ))}
                <Chip
                  variant="outlined" color='secondary'
                  key="addCourt"
                  label={t('新增')}
                  onClick={() => setOpenAddModal(true)}
                  onDelete={() => setOpenAddModal(true)}
                  deleteIcon={<AddIcon />} />
              </Stack>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="room">
            <Form.Label column sm="2">
              {t('場地面積')}
            </Form.Label>
            <Col sm="10">
              <Form.Control type="room" style={{ width: '80px' }} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="openTime">
            <Form.Label column sm="2">
              {t('開放時間')}
            </Form.Label>
            <Col sm="10" style={{ display: 'flex', alignItems: 'center' }} className='space-x-4'>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker 
                  // label="Controlled picker" 
                  views={['hours']} 
                  color='secondary' 
                  slotProps={{ textField: { size: 'small' } }}  />
                <span>{t('至')}</span>
                <TimePicker 
                  // label="Controlled picker" 
                  views={['hours']} 
                  color='secondary' 
                  slotProps={{ textField: { size: 'small' } }}  />
              </LocalizationProvider>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="openDay">
            <Form.Label column sm="2">
              {t('開放日')}
            </Form.Label>
            <Col sm="10">
              <ToggleButtonGroup
                value={weekDays}
                onChange={handleWeekdays}
                aria-label="open day setting"
                size="small"
              >
                <ToggleButton value="mon" aria-label="mon" >
                  {t('週一')}
                </ToggleButton>
                <ToggleButton value="tue" aria-label="tue">
                  {t('週二')}
                </ToggleButton>
                <ToggleButton value="wed" aria-label="wed">
                  {t('週三')}
                </ToggleButton>
                <ToggleButton value="thu" aria-label="thu">
                  {t('週四')}
                </ToggleButton>
                <ToggleButton value="fri" aria-label="fri">
                  {t('週五')}
                </ToggleButton>
                <ToggleButton value="sat" aria-label="sat">
                  {t('週六')}
                </ToggleButton>
                <ToggleButton value="sun" aria-label="sun">
                  {t('週日')}
                </ToggleButton>
              </ToggleButtonGroup>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="discription">
            <Form.Label column sm="2">
              {t('說明')}
            </Form.Label>
            <Col sm="10">
              <Form.Control type="discription" placeholder={t('說明')} />
            </Col>
          </Form.Group>
        </Form>
      </Row>

      <Dialog open={openAddModal} onClose={handleClose}>
        <DialogContent>
          <DialogContentText>
            {t('球場名稱')}
          </DialogContentText>
          <TextField
            inputRef={newCourtRef}
            margin="dense"
            id="name"
            label="court name"
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary" >{t('取消')}</Button>
          <Button onClick={handleAddCourt} color="secondary" >{t('新增')} </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default VenueDetail;