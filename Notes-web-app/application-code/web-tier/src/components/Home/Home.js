
    import React, {Component} from 'react';
    import welcome from '../../assets/note-taking.png'
    class Home extends Component {
        render () {
        return (
            <div>
            <h1 style={{color:"white"}}>Welcome to our simple Notes App</h1>
            <img src={welcome} alt="Notes App" style={{height:400,width:825}} />
          </div>
        );
      }
    }

    export default Home;