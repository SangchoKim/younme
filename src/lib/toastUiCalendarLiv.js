import React, { PureComponent } from 'react';
import 'tui-calendar/dist/tui-calendar.css'
import Calendar from '@toast-ui/react-calendar'
// Render the Calendar
const today = new Date();

export const toastUiCalendarLiv = new Calendar('#calendar', {
    defaultView: 'week',
    useCreationPopup: true,
    useDetailPopup: true
  });
