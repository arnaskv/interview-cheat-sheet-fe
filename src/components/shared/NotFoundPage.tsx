import React from 'react';
import { useNavigate } from 'react-router-dom';

import styledNotFoundPage from './NotFoundPage.module.css';

interface CategoryDetailsProps {
  missingComponent: 'category' | 'question';
  setMissingComponent: (id: number | null) => void;
}

const NotFoundPage: React.FC<CategoryDetailsProps> = ({ missingComponent, setMissingComponent }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    setMissingComponent(null);
    if (missingComponent === 'category') {
      navigate('/category');
    } else {
      navigate('/');
    }
  };

  return (
    <div className={styledNotFoundPage.notFound}>
      <main>
        <div className={styledNotFoundPage.outerWrap}>
          <div className={styledNotFoundPage.innerWrap}>
            <h1>404</h1>
            <h2>UH OH! You're lost.</h2>
            <p>
              The {missingComponent} you are looking for does not exist. How you got here is a mystery. But you can
              click the button below to go back to the homepage.
            </p>
            <button className={styledNotFoundPage.button} onClick={handleClick}>
              HOME
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NotFoundPage;
