import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const Header = () => {
  // Select only the pagename state from the Redux store
  const pagename = useSelector(state => state.pagename);

  return (
    <nav className="navbar bg-dark" data-bs-theme="dark" style={{ zIndex: '6' }}>
      <div className="container-fluid header-container">
        <Link className="navbar-brand">{pagename}</Link>
      </div>
    </nav>
  );
};


// import { bindActionCreators } from 'redux';
// import { actionCreators } from '../../state';

// const dispatch = useDispatch();
// const actions = bindActionCreators(actionCreators,dispatch);
//onclick={ ()=> { depositMoney(100)}  }
//onclick={ ()=> { dispatch(actionCreators.depositMoney(100)) }  }