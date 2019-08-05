import { combineReducers } from 'redux';
import MemorialDay from './MemorialDay';
import Alert from './Alert';
import Album from './Album';
import Talk from './Talk';
import Mypage from './Mypage';
import Calendar from './Calendar';
import Mheader from './M_header';


export default combineReducers({
    MemorialDay,
    Alert,
    Album,
    Talk,
    Mypage,
    Calendar,
    Mheader
});