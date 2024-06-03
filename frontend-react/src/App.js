import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavigationPaneComponent from './components/NavigationPaneComponent';
import BrowseMoviesComponent from './components/BrowseMoviesComponent';
import BrowseActorsComponent from './components/BrowseActorsComponent';
import MovieDetailsComponent from './components/MovieDetailsComponent';
import ActorDetailsComponent from './components/ActorDetailsComponent';

function App() {
    return (
        <Router>
            <div>
                <NavigationPaneComponent />
                <Switch>
                    <Route exact path="/" component={BrowseMoviesComponent} />
                    //Some redundancy, but intended
                    <Route path="/browse/movies" component={BrowseMoviesComponent} />
                    <Route path="/browse-actors" component={BrowseActorsComponent} />
                    <Route path="/movie/:id" component={MovieDetailsComponent} />
                    <Route path="/actor/:id" component={ActorDetailsComponent} />
                    <Route path="*" component={() => <div>404 Not Found</div>} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
