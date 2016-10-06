import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import renderer from 'react-test-renderer';
import App from '../index.jsx';
import React from 'react';


it('CheckboxWithLabel changes the text after click', () => {
    // Render a checkbox with label in the document
    const checkbox = TestUtils.renderIntoDocument(
      <App/>
    );
  });
