import React from 'react';
import { Switch,Route } from 'react-router-dom';
import { Add } from '../pages';
import { First } from '../pages';
import { Second } from '../pages';
import { Third } from '../pages';
import { Main } from '../pages';
import {MemorialDay} from '../pages';
import { Talk } from '../pages';
import { Alert } from '../pages';
import { Album } from '../pages';
import { Mypage } from '../pages';
import { Calendar } from '../pages';





class App extends React.Component {
    render() {
        return (
                <Switch>>
                    <Route exact path="/" component={Add}/>
                    <Route path="/first" component={First}/>
                    <Route path="/second" component={Second}/>
                    <Route path="/third" component={Third}/>
                    <Route path="/main" component={Main}/>
                    <Route path="/memorialday" component={MemorialDay}/>
                    <Route path="/talk" component={Talk}/>
                    <Route path="/alert" component={Alert}/>
                    <Route path="/album" component={Album}/>
                    <Route path="/mypage" component={Mypage}/>
                    <Route path="/calendar" component={Calendar}/>
                </Switch>
            
        );
    }
}
export default App;
